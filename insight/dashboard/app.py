import streamlit as st
import json
import pandas as pd
from datetime import datetime
import os
import time

# Page configuration
st.set_page_config(
    page_title="InsightFlow Dashboard",
    page_icon="📊",
    layout="wide"
)

# Title
st.title("📊 InsightFlow Dashboard")
st.markdown("Real-time monitoring of Core-Bucket data synchronization")

# Create columns for metrics
col1, col2, col3 = st.columns(3)

# Function to read flow log
def read_flow_log():
    flow_data = []
    if os.path.exists("insight/flow.log"):
        with open("insight/flow.log", "r") as f:
            for line in f:
                if line.strip():
                    try:
                        flow_data.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
    return flow_data

# Function to calculate metrics
def calculate_metrics(flow_data):
    if not flow_data:
        return 0, {}, ""
    
    # Calculate average latency
    latencies = [entry.get("latency_ms", 0) for entry in flow_data if "latency_ms" in entry]
    avg_latency = sum(latencies) / len(latencies) if latencies else 0
    
    # Last sync time per module
    last_sync_times = {}
    for entry in flow_data:
        module = entry.get("module", "unknown")
        timestamp = entry.get("timestamp", "")
        if module not in last_sync_times or timestamp > last_sync_times[module]:
            last_sync_times[module] = timestamp
    
    # Overall last sync time
    overall_last_sync = max([entry.get("timestamp", "") for entry in flow_data]) if flow_data else ""
    
    return avg_latency, last_sync_times, overall_last_sync

# Auto-refresh functionality
if "refresh_counter" not in st.session_state:
    st.session_state.refresh_counter = 0

# Refresh button
if st.button("🔄 Refresh Data"):
    st.session_state.refresh_counter += 1

# Auto-refresh checkbox
auto_refresh = st.checkbox("Auto-refresh every 10 seconds", value=True)

# Read flow data
flow_data = read_flow_log()

# Calculate metrics
avg_latency, last_sync_times, overall_last_sync = calculate_metrics(flow_data)

# Display metrics
with col1:
    st.metric("Average Latency", f"{avg_latency:.2f} ms")

with col2:
    st.metric("Last Sync Time", overall_last_sync if overall_last_sync else "No sync yet")

with col3:
    st.metric("Total Sync Events", len(flow_data))

# Last sync time per module
st.subheader("Last Sync Time by Module")
if last_sync_times:
    module_times_df = pd.DataFrame(list(last_sync_times.items()))
    module_times_df.columns = ["Module", "Last Sync Time"]
    st.table(module_times_df)
else:
    st.info("No sync events recorded yet.")

# Sync events table
st.subheader("Sync Events History")
if flow_data:
    # Convert to DataFrame for better display
    df = pd.DataFrame(flow_data)
    # Sort by timestamp (newest first)
    df['timestamp'] = pd.to_datetime(df['timestamp'], format='ISO8601')
    df = df.sort_values('timestamp', ascending=False)
    
    # Display table
    st.dataframe(df, width='stretch')
else:
    st.info("No sync events recorded yet. Waiting for data...")

# Auto-refresh logic
if auto_refresh:
    time.sleep(10)
    st.rerun()