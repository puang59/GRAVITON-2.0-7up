'use client';
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function StockPrediction(){
    const [productName,setProductName] = useState("")
    const handleInputChange=(event)=>{
        setProductName(event.target.value)
    }

    const handleSubmit=async()=>{
        try{
            const response = await fetch(`http://127.0.0.1:8000/predict/${productName}`);
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                setProductData(data);
                console.log(data)
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return(
        <div className="flex h-screen">
            <Sidebar/>
            <div className="flex flex-col mt-20 flex-grow ml-64 gap-7">
                <h1 className="text-4xl bold text-center">Stock Prediction</h1>
                <div className="flex flex-row justify-center gap-5">
                    <input type="text" placeholder="Product Name" className="w-[40%] p-4 rounded bg-[#210637]" onChange={handleInputChange}/>
                    <button className="p-4 bg-[#692d72] rounded" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}