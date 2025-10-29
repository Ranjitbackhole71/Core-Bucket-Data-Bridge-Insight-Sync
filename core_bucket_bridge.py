from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json
import os
from datetime import datetime
import uuid
import logging
from logging.handlers import RotatingFileHandler

# Initialize FastAPI app
app = FastAPI(title="Core-Bucket Data Bridge", 
              description="API for synchronizing module data from Core to Bucket with InsightFlow monitoring")

# Create logs directory if it doesn't exist
os.makedirs("logs", exist_ok=True)

# Set up logging for sync activities
sync_logger = logging.getLogger("sync_logger")
sync_logger.setLevel(logging.INFO)
sync_handler = RotatingFileHandler("logs/core_sync.log", maxBytes=1000000, backupCount=5)
sync_formatter = logging.Formatter('%(asctime)s - %(message)s')
sync_handler.setFormatter(sync_formatter)
sync_logger.addHandler(sync_handler)

# In-memory storage for sync summary (in production, use a database)
sync_summary = {
    "last_sync_time": None,
    "total_sync_count": 0,
    "module_sync_counts": {}
}

# Pydantic model for the data payload
class CoreUpdatePayload(BaseModel):
    module: str
    data: Dict[str, Any]
    session_id: Optional[str] = None

# Pydantic model for the response
class CoreUpdateResponse(BaseModel):
    status: str
    timestamp: str
    session_id: str
    message: str

class BucketStatusResponse(BaseModel):
    last_sync_time: str
    total_sync_count: int
    module_sync_counts: Dict[str, int]

@app.post("/core/update", response_model=CoreUpdateResponse)
async def core_update(payload: CoreUpdatePayload):
    """
    Receives JSON data from Core and logs it with timestamp, session_id, and module name.
    """
    try:
        # Generate session ID if not provided
        session_id = payload.session_id or str(uuid.uuid4())
        
        # Get current timestamp
        timestamp = datetime.utcnow().isoformat() + "Z"
        
        # Log the data
        log_entry = {
            "module": payload.module,
            "session_id": session_id,
            "timestamp": timestamp,
            "data": payload.data
        }
        
        sync_logger.info(json.dumps(log_entry))
        
        # Update sync summary
        sync_summary["last_sync_time"] = timestamp
        sync_summary["total_sync_count"] += 1
        
        if payload.module in sync_summary["module_sync_counts"]:
            sync_summary["module_sync_counts"][payload.module] += 1
        else:
            sync_summary["module_sync_counts"][payload.module] = 1
            
        # Also log to insight flow
        insight_entry = {
            "module": payload.module,
            "status": "synced",
            "timestamp": timestamp,
            "latency_ms": 50  # Mock latency
        }
        
        # Create insight directory if it doesn't exist
        os.makedirs("insight", exist_ok=True)
        
        # Write to insight flow log
        with open("insight/flow.log", "a") as f:
            f.write(json.dumps(insight_entry) + "\n")
        
        return CoreUpdateResponse(
            status="success",
            timestamp=timestamp,
            session_id=session_id,
            message=f"Data received and logged for module {payload.module}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing update: {str(e)}")

@app.get("/bucket/status", response_model=BucketStatusResponse)
async def bucket_status():
    """
    Returns current sync summary (last sync time, total sync count).
    """
    return BucketStatusResponse(
        last_sync_time=sync_summary["last_sync_time"] or "",
        total_sync_count=sync_summary["total_sync_count"],
        module_sync_counts=sync_summary["module_sync_counts"]
    )

# Create insight directory if it doesn't exist
os.makedirs("insight", exist_ok=True)

# Create initial empty flow.log if it doesn't exist
flow_log_path = "insight/flow.log"
if not os.path.exists(flow_log_path):
    with open(flow_log_path, "w") as f:
        pass  # Create empty file

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)