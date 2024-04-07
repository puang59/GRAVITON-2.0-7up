'use client';
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { productinfo } from "../utils/productinfo";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { outofstockproduct } from "../utils/outofstockproduct";
import { instockproduct } from "../utils/instockproduct";
import WarningIcon from '@mui/icons-material/Warning';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';
import {Chart} from "chart.js/auto";

export default function Dashboard() {
    const [productCount, setProductCount] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);
    const [inStock, setInStock] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const data = await productinfo();
            if (data) {
                setProductCount(data.length);
            }
        }
        fetchData();

        async function fetchOutofstock(){
            const data = await outofstockproduct();
            if (data) {
                setOutOfStock(data.length);
            }
        }
        fetchOutofstock();
        async function fetchInStock(){
            const data = await instockproduct();
            if (data) {
                setInStock(data.length);
            }
        }
        fetchInStock();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
    
            const context = chartRef.current.getContext("2d");
    
            const newChart = new Chart(context, {
                type: "line",
                data: {
                    labels: ["December", "January", "February", "March", "April"],
                    datasets: [
                        {
                            label: "Info",
                            data: [10000,15000,3000,7000,11000],
                            backgroundColor: "#210637",
                            borderColor:"#422C54"
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
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col my-10  flex-grow ml-64">
                <div className="mx-20">
                    <h1 className="text-5xl bold">Dashboard</h1>
                    <div className="flex flex-row justify-between mt-5 gap-5">
                        <div className="border-4 border-[#422C54] p-5 rounded-xl flex flex-row gap-5 flex-1 justify-between ">
                            <div className="flex flex-col">
                                <h1 className="text-3xl">{productCount}</h1>
                                <p className="text-2xl">Products</p>
                            </div>
                            <QrCodeScannerIcon 
                            fontSize="large"/>
                            
                        </div>
                        <div className="border-4 border-[#b12930] p-5 rounded-xl flex flex-row gap-5 flex-1 justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-3xl">{outOfStock}</h1>
                                <p className="text-2xl">Out of Stock</p>
                            </div>
                            <WarningIcon 
                            fontSize="large"/>
                            
                        </div>
                        <div className="border-4 border-[#22bb34] p-5 rounded-xl flex flex-row gap-5 flex-1 justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-3xl">{inStock}</h1>
                                <p className="text-2xl">In Stock</p>
                            </div>
                            <DoneIcon 
                            fontSize="large"/>
                            
                        </div>
                        <div className="border-4 border-[#d1d721] p-5 rounded-xl flex flex-row gap-5 flex-1 justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-3xl">{productCount}</h1>
                                <p className="text-2xl">Action Needed</p>
                            </div>
                            <DangerousIcon 
                            fontSize="large"/>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="mt-20 ml-20 text-3xl">Revenue</h3>
                    <canvas ref={chartRef} className="ml-20 h-[40%] max-w-screen-lg max-h-[45vh] text-white"/>
                </div>
            </div>
        </div> 
    );
}
