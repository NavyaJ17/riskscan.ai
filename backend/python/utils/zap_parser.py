import os
import json
import pandas as pd

def parse_zap_report(report_dir):
    rows = []
    for fname in os.listdir(report_dir):
        if fname.endswith(".json"):
            with open(os.path.join(report_dir, fname), "r", encoding="utf-8") as file:
                data = json.load(file)
            for site in data['site']:
                for alert in site['alerts']:
                    for inst in alert['instances']:
                        rows.append({
                            'endpoint': inst['uri'],
                            'method': inst['method'],
                            'pluginid': alert['pluginid'],
                            'riskcode': int(alert['riskcode']),
                            'confidence': int(alert['confidence']),
                            'count': int(alert['count']),
                            'cweid': int(alert['cweid']),
                            'wascid': int(alert['wascid']),
                            'alertname': alert['alert'],
                            'desc': alert['desc'],
                            'solution': alert['solution']
                        })
                    
    df = pd.DataFrame(rows)
    df['weighted_risk'] = df['riskcode'] * df['confidence'] * df['count']
    return df