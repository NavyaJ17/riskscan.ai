import pandas as pd
import numpy as np

def engineer_features(df):
    
    alert_names = df.groupby(['endpoint', 'method'])['alertname'].apply(lambda x: list(set(x))).reset_index()
    descs = df.groupby(['endpoint', 'method'])['desc'].apply(lambda x: list(set(x))).reset_index()
    solutions = df.groupby(['endpoint', 'method'])['solution'].apply(lambda x: list(set(x))).reset_index()

    agg = df.groupby(['endpoint', 'method']).agg({
        'riskcode': ['sum', 'max', 'count'],
        'pluginid': 'nunique'
    })
    agg.columns = ['total_risk', 'max_risk', 'total_alerts', 'unique_plugins']
    agg.reset_index(inplace=True)

    weighted = df.groupby(['endpoint', 'method'])['weighted_risk'].sum().reset_index()
    agg = agg.merge(weighted, on=['endpoint', 'method'])

    agg = agg.merge(alert_names, on=['endpoint', 'method'], how='left')
    agg = agg.merge(descs, on=['endpoint', 'method'], how='left')
    agg = agg.merge(solutions, on=['endpoint', 'method'], how='left')

    riskcode_counts = df.pivot_table(index=['endpoint', 'method'], columns='riskcode',
                                     values='pluginid', aggfunc='count', fill_value=0)
    riskcode_counts.columns = [f"riskcode_{col}_count" for col in riskcode_counts.columns]
    riskcode_counts.reset_index(inplace=True)

    agg = agg.merge(riskcode_counts, on=['endpoint', 'method'], how='left')

    for col in ['riskcode_0_count', 'riskcode_1_count', 'riskcode_2_count', 'riskcode_3_count']:
        if col not in agg.columns:
            agg[col] = 0

    return agg
