import json
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from .zap_parser import parse_zap_report
from .feature_engineer import engineer_features


def predict(model, scaler, STATS_PATH, REPORT_PATH):
    with open(STATS_PATH) as f:
        stats_data = json.load(f)

    new_df = parse_zap_report(REPORT_PATH)
    agg_new = engineer_features(new_df)

    X_new = agg_new[['total_risk', 'max_risk', 'total_alerts', 'unique_plugins',
                     'riskcode_0_count', 'riskcode_1_count', 'riskcode_2_count', 'riskcode_3_count']]

    pred_log = model.predict(X_new)
    pred_actual = np.expm1(pred_log)

    pred_scaled_10 = scaler.transform(pred_actual.reshape(-1, 1))
    agg_new['predicted_risk_score'] = pred_scaled_10

    bins = [0, 3, 7, 10]
    labels = ['Low', 'Medium', 'High']
    agg_new['risk_category'] = pd.cut(agg_new['predicted_risk_score'], bins=bins, labels=labels)

    result = agg_new[['endpoint', 'method','predicted_risk_score', 'risk_category', 'alertname', 'desc', 'solution']]

    total_endpoints = len(result)
    mean_risk_score = result['predicted_risk_score'].mean()
    average_risk_category = pd.cut([mean_risk_score], bins=bins, labels=labels)[0]

    stats = {
        'total_endpoints': total_endpoints,
        'mean_risk_score': mean_risk_score,
        'average_risk_category': str(average_risk_category)
    }

    result['predicted_risk_score'] = result['predicted_risk_score'].astype(float)
    stats['mean_risk_score'] = stats['mean_risk_score'].astype(float)

    return {
        'stats': stats,
        'prediction': result.to_dict(orient='records')
    }
