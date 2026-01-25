import { useState } from "react";
import Header from "../../component/home/header";
import MenuUser from "../../component/home/menuuser";
import HomeUS from "../../component/home/homeuser";

export default function HomeUser({children}){
     const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
        <Header onToggleMenu={()=>setOpenMenu(!openMenu)} />
        <MenuUser isOpen={openMenu}/>
        <main className="main-content">{children}</main>
        <HomeUS />
        </>
    )
}