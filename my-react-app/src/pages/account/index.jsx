import Account from "../../component/account/index";
import Header from "../../component/home/header";
import MenuUser from "../../component/home/menuuser";
import { useState } from 'react';

export default function AccountUser({children}){
      const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
        <Header onToggleMenu={()=>setOpenMenu(!openMenu)}/>
        <MenuUser isOpen={openMenu} />
           <main className="main-content">{children}</main>
        <Account />
        </>
    )
}