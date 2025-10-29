# Core–Bucket Data Bridge

A complete backend + dashboard system that synchronizes module data from Core (local system) to Bucket (central API) with InsightFlow monitoring and N8N automation.

## 🌟 Features

- **FastAPI Backend**: RESTful API for data synchronization
- **Streamlit Dashboard**: Real-time monitoring of sync activities
- **N8N Automation**: Scheduled workflows for data synchronization
- **Comprehensive Logging**: Detailed logs for debugging and monitoring
- **Full Test Coverage**: Pytest suite for API validation
- **Modular Design**: Easily extensible and replaceable components

## 🏗️ System Architecture

```
┌─────────────┐    ┌────────────────────┐    ┌──────────────┐
│   Core      │───▶│  Core-Bucket API   │───▶│    Bucket    │
│  Modules    │    │   (FastAPI)        │    │   (Central)  │
└─────────────┘    └────────────────────┘    └──────────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ InsightFlow Logger │
                   └────────────────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │   Streamlit Dash   │
                   │   (Monitoring)     │
                   └────────────────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │     N8N Workflow   │
                   │   (Automation)     │
                   └────────────────────┘
```

## 📁 Project Structure

```
├─ core_bucket_bridge.py    # FastAPI backend application
├─ mock_modules.py          # Mock modules for testing (education, finance, creative)
├─ requirements.txt         # Python dependencies
├─ README.md                # This file
├─ handover_core_bridge.md  # Detailed documentation and setup guide
├─ logs/
│   └─ core_sync.log        # Core synchronization logs
├─ insight/
│   ├─ flow.log             # InsightFlow monitoring logs
│   └─ dashboard/
│       └─ app.py           # Streamlit dashboard application
├─ automation/
│   ├─ n8n_workflow.json    # N8N automation workflow
│   └─ reports/             # Automation reports
└─ .gitignore               # Git ignore file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the Backend Server

```bash
python core_bucket_bridge.py
```

The server will start on `http://localhost:8000` with two endpoints:
- `POST /core/update` - Receives data from Core modules
- `GET /bucket/status` - Returns current sync summary

### 3. Start the InsightFlow Dashboard

```bash
streamlit run insight/dashboard/app.py
```

The dashboard will be available at `http://localhost:8501`

### 4. Run Mock Modules (for testing)

```bash
python mock_modules.py
```

This will send sample data every 30 seconds to test the system.

## 🛠 API Endpoints

### POST /core/update

Receives data from Core modules.

**Request Body**:
```json
{
  "module": "string",
  "data": {},
  "session_id": "string (optional)"
}
```

**Response**:
```json
{
  "status": "success",
  "timestamp": "2025-10-16T10:20:00Z",
  "session_id": "uuid-string",
  "message": "Data received and logged for module education"
}
```

### GET /bucket/status

Returns current sync summary.

**Response**:
```json
{
  "last_sync_time": "2025-10-16T10:20:00Z",
  "total_sync_count": 5,
  "module_sync_counts": {
    "education": 2,
    "finance": 2,
    "creative": 1
  }
}
```

## 📊 Dashboard Features

The InsightFlow dashboard provides real-time monitoring of the synchronization process:

- **Sync Events Table**: Shows all synchronization events
- **Average Latency**: Displays average processing time
- **Last Sync Time**: Shows the last synchronization time for each module
- **Auto-refresh**: Updates automatically every 10 seconds

## ⚙️ N8N Automation

The project includes an N8N workflow that:

1. Runs every 2 hours
2. Sends test data to the Core endpoint
3. Retrieves Bucket status
4. Saves results to `automation/reports/`

To use the workflow:
1. Install N8N: `npm install n8n -g`
2. Start N8N: `n8n`
3. Import `automation/n8n_workflow.json` through the N8N UI

## 🧪 Testing

Run the test suite:
```bash
pytest test_core_bucket_api.py -v
```

## 📖 Documentation

See [handover_core_bridge.md](handover_core_bridge.md) for detailed documentation including:
- Complete setup instructions
- API usage examples
- Testing procedures
- Troubleshooting guide
- Demo recording guide

## 🎥 Demo

For a quick 2-3 minute demo:
1. Run `python core_bucket_bridge.py`
2. Run `streamlit run insight/dashboard/app.py`
3. Run `python mock_modules.py` in another terminal
4. Watch the dashboard update in real-time

## 🔧 Modular Design

The system is designed to be modular:
- N8N workflow can be replaced with LangGraph or other orchestration systems
- New Core modules can be easily added
- API endpoints can be extended following the existing pattern

## 📞 Support

For issues or questions about the Core–Bucket Data Bridge system, please refer to the documentation or contact the development team.