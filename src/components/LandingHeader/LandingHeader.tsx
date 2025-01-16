import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ConnectButton from './ConnectButton'
import { useData } from "@/contexts/showSideBarContext";
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation'
export default function LandingHeader() {
    const { showSideBar, setShowSideBar } = useData();
    const pathname = usePathname()
    const [pathName, setPathName] = React.useState('');
    
}
