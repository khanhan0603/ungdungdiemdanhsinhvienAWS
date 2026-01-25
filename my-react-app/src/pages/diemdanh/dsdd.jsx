import KetThuc from "../../component/diemdanh/kthucdiemdanh";
import Header from "../../component/home/header";
import MenuUser from "../../component/home/menuuser";
import { useState } from 'react';

export default function ListsDiemDanh({children}){
      const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
        <Header onToggleMenu={()=>setOpenMenu(!openMenu)}/>
        <MenuUser isOpen={openMenu} />
           <main className="main-content">{children}</main>
        <KetThuc />
          </>
    );
  
}