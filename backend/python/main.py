import os
import shutil
import subprocess
import json
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify
from utils.predict import predict
import platform

app = Flask(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'risk_model.pkl')
SCALER_PATH = os.path.join(os.path.dirname(__file__), 'models', 'risk_scaler.pkl')
BAT_PATH = os.path.join(os.path.dirname(__file__), "scripts", "run_zap_scan.bat")
SH_PATH = os.path.join(os.path.dirname(__file__), "scripts", "run_zap_scan.sh")
STATS_PATH = os.path.join(os.path.dirname(__file__), 'models', 'train_weighted_risk_minmax.json')
REPORT_PATH = os.path.join(os.path.dirname(__file__), "zap_reports")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

@app.route('/predict', methods=['POST'])
def predict_vulnerability():
    data = request.get_json()
    api_url = data.get('api_url')

    if platform.system() == "Windows":
        subprocess.run([BAT_PATH, api_url], encoding="utf-8", shell=True, check=True)
    else:
        subprocess.run(["bash", SH_PATH, api_url], encoding="utf-8", check=True)

    result=predict(model, scaler, STATS_PATH, REPORT_PATH)

    shutil.rmtree("zap_reports")

    if not result:
        return jsonify({"message": "No vulnerabilities detected by ZAP."})

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)