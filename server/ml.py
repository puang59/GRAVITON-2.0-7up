import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

df1 = pd.read_csv("Data/df1.csv")
df2 = pd.read_csv("Data/df2.csv")
df3 = pd.read_csv("Data/df3.csv")
df4 = pd.read_csv("Data/df4.csv")
df5 = pd.read_csv("Data/df5.csv")

df = pd.concat([df1, df2, df3, df4, df5], axis=0, ignore_index=True)

df = df.sample(frac=1, ignore_index=True)

product_list = list(df['product_name'].unique())
type_list = list(df['product_type'].unique())

def name_replace(obj):
    return product_list.index(obj)

df['product_name'] = df['product_name'].apply(name_replace)

def type_replace(obj):
    return type_list.index(obj)

df['product_type'] = df['product_type'].apply(type_replace)

df.drop(columns='location', inplace=True)

col_list = list(df.columns)[2:]
day_data = []
for i in col_list:
    day_data.append(df.loc[:, ['product_name', 'product_type', i]])

model_list = [LinearRegression() for _ in range(5)]

train_list = []
test_list = []
for i in day_data:
    x = i.iloc[:, :-1]
    y = i.iloc[:, -1]
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)
    train_list.append((x_train, y_train))
    test_list.append((x_test, y_test))

pred_list = []
for i in range(5):
    model = model_list[i]
    x_train = np.array(train_list[i][0])
    y_train = np.array(train_list[i][1])
    x_test = np.array(test_list[i][0])
    y_test = np.array(test_list[i][1])

    model.fit(x_train, y_train)
    y_pred = model.predict(x_test)
    pred_list.append((y_test, y_pred))

def predict_orders(product_name):
    product_index = product_list.index(product_name)
    
    input_data = pd.DataFrame({'product_name': [product_index]*5,
                               'product_type': [df.loc[df['product_name'] == product_index, 'product_type'].iloc[0]]*5})
    
    predictions = []
    
    for i in range(5):
        model = model_list[i]
        prediction = model.predict(input_data)
        predictions.append(prediction[0])
    
    return predictions
