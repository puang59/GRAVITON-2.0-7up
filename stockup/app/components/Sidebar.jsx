'use client'
import Logo from '../images/StockUpLogo_removebg.png';
import Image from 'next/image';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import FeedIcon from '@mui/icons-material/Feed';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function Sidebar() {
    const sidebarItems = [
        { icon: <PieChartIcon />, text: 'Dashboard', name:"dashboard"},
        { icon: <FeedIcon />, text: 'Product Info',name:"product-info"},
        { icon: <TimelineIcon />, text: 'Stock Predition',name:"stock-prediction" },
        { icon: <PieChartIcon />, text: 'Top Locations',name:'top-location'}
    ];
    
    const router = useRouter();
    const pathname = usePathname()
    return (
        <div>
            <div className={'fixed left-0 top-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#210637]">
                    <div className={'flex flex-col justify-center'}>
                        <div className="flex flex-col gap-0 justify-center mt-5">
                            <Image src={Logo} className={'max-w-[50%] align-center text-center m-auto'} />
                            <h2 className={'text-3xl text-center font-bold'}>stockUp</h2>
                            <p className='text-center'>Entangling Efficiency</p>
                        </div>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-white-700 w-[80%] mx-auto" />
                        <ul className='flex flex-col ml-2 gap-2'>
                            {sidebarItems.map(({ icon, text,name }, index) => (
                                <li key={index} 
                                    className={`flex items-center space-x-2 text-xl px-5 py-2 transition-all ease-in-out rounded hover:cursor-pointer hover:bg-[#422C54] ${pathname === `/${name}` ? 'bg-[#422C54]' : ''}`} 
                                    onClick={()=>router.push(`/${name}`)}>
                                    {icon}
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}