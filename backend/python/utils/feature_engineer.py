import pandas as pd
import numpy as np

def engineer_features(df):
    idx = df.groupby(['endpoint', 'method'])['riskcode'].idxmax()

    max_risk_alerts = df.loc[idx, ['endpoint', 'method', 'riskcode', 'alertname', 'desc', 'solution']]
    max_risk_alerts.reset_index(drop=True, inplace=True)

    agg = df.groupby(['endpoint', 'method']).agg({
        'riskcode': ['sum', 'max', 'count'],
        'pluginid': 'nunique'
    })
    agg.columns = ['total_risk', 'max_risk', 'total_alerts', 'unique_plugins']
    agg.reset_index(inplace=True)

    weighted = df.groupby(['endpoint', 'method'])['weighted_risk'].sum().reset_index()
    agg = agg.merge(weighted, on=['endpoint', 'method'])

    agg = agg.merge(max_risk_alerts, on=['endpoint', 'method'], how='left')

    riskcode_counts = df.pivot_table(index=['endpoint', 'method'], columns='riskcode',
                                     values='pluginid', aggfunc='count', fill_value=0)
    riskcode_counts.columns = [f"riskcode_{col}_count" for col in riskcode_counts.columns]
    riskcode_counts.reset_index(inplace=True)

    agg = agg.merge(riskcode_counts, on=['endpoint', 'method'], how='left')

    for col in ['riskcode_0_count', 'riskcode_1_count', 'riskcode_2_count', 'riskcode_3_count']:
        if col not in agg.columns:
            agg[col] = 0

    return agg
