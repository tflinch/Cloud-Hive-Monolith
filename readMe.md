### Hive LIDAR Media Control System CMS

This project integrates sensor input, a Flask backend, and VLC media player to automatically play different video files based on real-time sensor readings. A frontend client and local Node.js server support file uploads that are consumed by the backend.

## 📌 Project Overview

Goal: Automate video/audio playback based on sensor activity.

Frontend Client: Upload .mp4 or .mp3 files via a browser.

Node.js Server: Acts as middleware between frontend and backend.

Flask Backend: Stores uploaded files and communicates with VLC.

VLC Integration: Plays the correct video when triggered.

Sensor Script: Detects patterns in sensor data and tells VLC what to play.

### ⚙️ System Components

1. Frontend Client

Simple UI for uploading media.

Files are validated and then sent to the Node.js server.

2. Local Node.js Server

Accepts uploads via POST /api/upload.

Forwards uploaded files to the Flask backend.

Provides test endpoints for debugging.

3. Flask Backend

Runs on port 5001.

Saves media files into /uploads/.

Makes files accessible for VLC.

4. VLC (Video Player)

Runs in Remote Control (RC) mode using a Unix socket.

Commands are sent directly to VLC (e.g., play, pause, add file).

5. Sensor Script

Reads numbers from sensor hardware.

Detects sequences:

3 highs in a row → play video1.mp4

3 lows in a row → play video2.mp4

## 🚀 How the System Works

User uploads a file in the frontend client.

File is sent to the Node.js server.

Node.js forwards it to the Flask backend.

Flask stores the file in /uploads/.

Sensor detects input and runs logic in script.py.

VLC receives commands and plays the matching video.

## 🛠️ Setup Instructions

1. Flask Backend
   cd ~/LIDAR
   pip install flask flask-cors
   python3 flask_server.py

2. Node.js Server
   cd backend
   npm install
   npm start # Runs on http://localhost:5000

3. Frontend Client
   cd client
   npm install
   npm run dev # Runs on http://localhost:5173

4. Start VLC in RC Mode
   cvlc -R -f --no-osd -I oldrc --rc-unix /tmp/vlc-control

## 🐛 Troubleshooting

VLC unable to open MRL → Check the file path and permissions.

pause: not found → Remove old Windows-style pause commands from scripts.

Invalid number received → Ensure sensor outputs numbers (not text).

404 from Node.js → Confirm you’re sending requests to /api/upload.
