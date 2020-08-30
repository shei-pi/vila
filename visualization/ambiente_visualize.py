import matplotlib
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import pandas as pd
import requests
import datetime
from pprint import pprint as pp

results = []
max_pages=15
for i in range(max_pages-5,max_pages):
    response = requests.get('http://192.168.1.44:8000/ambiente/device_data/?page={}'.format(i))
    if response.status_code==404:
        break
    response_json = response.json()
    results=results+response_json.get('results')
print('All ', len(results))
df = pd.DataFrame(results)

df = df[(df.device_id=='31416')]
df['timestamp_dt']=pd.to_datetime(df['timestamp'],
                                    format='%Y-%m-%dT%H:%M:%S.%fZ')

df.set_index('timestamp_dt', inplace=True)
ax = df['humidity'].plot()
df['moisture'].plot()
df['temperature'].plot()
ticklabels = df.index.strftime('%H:%M:%S')
ax.xaxis.set_major_formatter(ticker.FixedFormatter(ticklabels))
plt.show()
