from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

from ml import predict_orders, top_location

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
    
@app.get("/predict/{product_name}") 
def predict_sales(product_name: str):
    predictions = predict_orders(product_name)
    rounded_values = []
    for i in predictions:
        rounded_values.append(round(i))
    return {"predictions": rounded_values}  

@app.get("/location")
def predict_location():
    return top_location() 
