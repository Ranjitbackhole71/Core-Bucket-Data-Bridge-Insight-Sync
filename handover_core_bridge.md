# Core–Bucket Data Bridge — Full Integration and Validation

## Project Overview

This document provides complete documentation for the Core–Bucket Data Bridge system, a complete working project with InsightFlow dashboard, automated N8N testing, and full demo readiness.

## 📁 Project Folder Structure

```
├─ core_bucket_bridge.py (FastAPI backend)
├─ mock_modules.py (Test data generator)
├─ requirements.txt (Dependencies)
├─ logs/
│   └─ core_sync.log (Core synchronization logs)
├─ insight/
│   ├─ flow.log (InsightFlow monitoring logs)
│   └─ dashboard/
│       └─ app.py (Streamlit dashboard)
├─ automation/
│   ├─ n8n_workflow.json (N8N automation workflow)
│   └─ reports/
│       └─ report_example.json (Example output)
└─ handover_core_bridge.md (This document)
```

## 🛠 Setup Instructions

### Environment Setup

1. **Python Installation**: Ensure Python 3.8+ is installed
2. **Virtual Environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### How to Run Backend Server

```bash
python core_bucket_bridge.py
```

The server will start on `http://localhost:8000` with the following endpoints:
- `POST /core/update` - Receives data from Core modules
- `GET /bucket/status` - Returns current sync summary

### How to Run InsightFlow Dashboard

```bash
streamlit run insight/dashboard/app.py
```

The dashboard will be available at `http://localhost:8501`

### How to Load and Run the N8N Workflow Locally

1. **Install N8N**:
   ```bash
   npm install n8n -g
   ```

2. **Start N8N**:
   ```bash
   n8n
   ```

3. **Import Workflow**:
   - Open N8N UI at `http://localhost:5678`
   - Go to "Workflows" > "Import"
   - Upload the `automation/n8n_workflow.json` file

## 🧪 Testing Steps

### 1. Send Test Payloads

Use the mock modules to send test data:
```bash
python mock_modules.py
```

Or send manual requests:
```bash
curl -X POST http://localhost:8000/core/update \
     -H "Content-Type: application/json" \
     -d '{"module": "test", "data": {"message": "Hello World"}}'
```

### 2. Verify Bucket Status

```bash
curl http://localhost:8000/bucket/status
```

### 3. Check Logs and Dashboard

- Core sync logs: `logs/core_sync.log`
- InsightFlow logs: `insight/flow.log`
- Dashboard: `http://localhost:8501`

### 4. Run N8N Automation

In N8N UI:
1. Open the imported workflow
2. Click "Execute Workflow" to run manually
3. Or wait for the 2-hour scheduled trigger

## 🔧 Modular Design for Future Extensions

The system is designed to be modular and can be extended:

- **N8N → LangGraph**: The automation workflow can be replaced with LangGraph by implementing the same interface (sending data to `/core/update` and calling `/bucket/status`)
- **New Modules**: Add new module definitions to the `MOCK_MODULES` dictionary in `mock_modules.py`
- **Extended API**: Add new endpoints to `core_bucket_bridge.py` following the existing pattern

## 📹 Demo Recording Guide

Follow these steps to record a complete demo:

### 1. Start FastAPI Backend
```bash
python core_bucket_bridge.py
```
Show the terminal output confirming the server is running on port 8000.

### 2. Show Mock Modules Sending Data
```bash
python mock_modules.py
```
Show the terminal output with successful data transmission messages.

### 3. Open InsightFlow Dashboard
```bash
streamlit run insight/dashboard/app.py
```
Demonstrate:
- Real-time updates in the sync events table
- Average latency calculations
- Last sync time per module
- Auto-refresh functionality

### 4. Run N8N Workflow
- Open N8N UI at `http://localhost:5678`
- Execute the workflow manually
- Show the execution flow through all nodes

### 5. Show Report Generation
```bash
ls automation/reports/
```
Show the newly created report file with timestamp.

### 6. Final Confirmation
Display the message: "Core–Bucket Bridge Fully Operational ✅"

## 📋 Expected Output & Verification Checklist

✅ **InsightFlow Dashboard**:
- Table of sync events
- Average latency per module
- Last sync time per module
- Auto-refresh functionality

✅ **N8N Automation**:
- Workflow executes every 2 hours
- Test data sent to Core endpoint
- Bucket status retrieved
- Reports saved in `/automation/reports/`

✅ **Documentation**:
- Complete setup instructions
- Testing procedures
- Project structure overview

✅ **Demo Script**:
- Clear steps for recording
- All components demonstrated
- Verification checkpoints

✅ **Backend Integration**:
- Logs updating in real-time
- API endpoints responding correctly
- Data persistence working

## 🚀 Additional Features

- **Real-time Monitoring**: Dashboard updates automatically every 10 seconds
- **Comprehensive Logging**: Detailed logs for debugging and monitoring
- **Modular Architecture**: Easy to extend and maintain
- **Cross-platform Compatibility**: Works on Windows, macOS, and Linux
- **Scalable Design**: Can handle multiple modules and high-frequency data

## 📞 Support

For issues or questions about the Core–Bucket Data Bridge system, please refer to this documentation or contact the development team.