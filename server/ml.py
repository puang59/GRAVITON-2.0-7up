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
    print(predictions)
    return predictions

def top_location():
    # Create a DataFrame to store the total demand for each product in each location 
    demand_df = df.groupby(['product_name', 'location']).size().reset_index(name='demand')
    
    # Sort the DataFrame by demand in descending order
    sorted_demand_df = demand_df.sort_values(by='demand', ascending=False)
    
    # Get the top 5 demanded products
    top_products = sorted_demand_df['product_name'].unique()[:5]
    
    # Initialize a set to store unique locations
    unique_locations = set()
    
    # Iterate over the top demanded products
    for product in top_products:
        # Find the location with the highest demand for the current product
        top_location = sorted_demand_df[sorted_demand_df['product_name'] == product].iloc[0]['location']
        
        # Add the top location to the set
        unique_locations.add(top_location)
    
    # Convert the set to a list and return
    unique_locations_list = list(unique_locations)
    print(unique_locations_list)
    return unique_locations_list
