'use client';
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { productinfo } from "../utils/productinfo";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { outofstockproduct } from "../utils/outofstockproduct";
import { instockproduct } from "../utils/instockproduct";
import WarningIcon from '@mui/icons-material/Warning';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';

export default function Dashboard() {
    const [productCount, setProductCount] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);
    const [inStock, setInStock] = useState(0);

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
            </div>
        </div> 
    );
}
