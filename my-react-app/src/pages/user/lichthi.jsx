import Header from "../../component/home/header" ;
import MenuUser from "../../component/home/menuuser";
import LichThiGiangVien from "../../component/user/lichthiuser";
import { useState } from 'react';

export default function LichThi({children}){
      const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
        <Header onToggleMenu={()=>setOpenMenu(!openMenu)}/>
        <MenuUser isOpen={openMenu} />
           <main className="main-content">{children}</main>
        <LichThiGiangVien />
        </>
    )
}