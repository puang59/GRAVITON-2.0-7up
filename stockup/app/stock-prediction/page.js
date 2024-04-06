    'use client';
    import { useEffect, useRef, useState } from "react";
    import Sidebar from "../components/Sidebar";
    import {Chart} from "chart.js/auto";

    export default function StockPrediction(){
        const [productName,setProductName] = useState("")
        const [productData,setProductData] = useState(null)
        const handleInputChange=(event)=>{
            setProductName(event.target.value)
        }

        const chartRef = useRef(null);

        useEffect(() => {
            if (chartRef.current && productData) {
                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }
        
                const context = chartRef.current.getContext("2d");
        
                const newChart = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        datasets: [
                            {
                                label: "Info",
                                data: productData,
                                backgroundColor: "#210637",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                type: "category",
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
                chartRef.current.chart = newChart;
            }
        }, [productData]);
        

        const handleSubmit=async()=>{
            try{
                const response = await fetch(`http://127.0.0.1:8000/predict/${productName}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductData(data['predictions']);
                    console.log(productData)
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
                    {
                            productData&&(
                                <canvas ref={chartRef}/>
                            )
                        }
                </div>
            </div>
        )
    }