'use client'
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function TopLocation() {
    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/location");
                if (response.ok) {
                    const data = await response.json();
                    setLocationData(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col mt-20 flex-grow ml-64 gap-7">
                <h1 className="text-4xl text-center">Top Cities (in terms of revenue)</h1>
                <ul>
                    {locationData.map((city, index) => (
                        <li key={index} className="text-xl text-center mb-5">{city}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
