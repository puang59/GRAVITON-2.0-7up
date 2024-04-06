'use client'
import Sidebar from "../components/Sidebar";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import '../qr-code.css'
import { productchecker } from "../utils/productchecker";
import GetForm from "../components/GetForm";

export default function ProductInfo() {
    const [scanResult, setScanResult] = useState(null);
    const [productData, setProductData] = useState(null); // State to hold product data

    const [showReader, setShowReader] = useState(false);
    const handleButtonClick = () => {
        setShowReader(true);
    };

    useEffect(() => {
        if (showReader) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 10
            });
            scanner.render(success, error);
            
            async function success(result) {
                scanner.clear();
                setScanResult(result);
                const data = await productchecker(result);
                console.log(data);
                
                setProductData(data[0]); // Set product data
                setShowReader(false); // Hide reader after scanning
                console.log(productData);
            };

            function error(err) {
                console.warn(err);
            }
        }
    }, [showReader]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col justify-center items-center flex-grow ml-64 text-black bg-[#100f0f] ">
                <div className="max-h-screen text-center items-center m-auto">
                    {
                        showReader ? (
                            <div id="reader" className="text-white"></div>
                        ) : (
                            scanResult ? (
                                        <GetForm id={productData.id} name={productData.name} type={productData.type} origin={productData.origin} popularity={productData.popularity} availability={productData.availability}/>
                            ) : (
                                <button className="p-10 bg-[#210637] rounded text-white" onClick={handleButtonClick}>
                                    Scan Product
                                </button>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
