
import Header from '../../component/home/header';
import MenuUser from '../../component/home/menuuser';
import DSSV from '../../component/admin/dssv';
import { useState } from 'react';

export default function ListSV({children}){
      const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
        <Header onToggleMenu={()=>setOpenMenu(!openMenu)}/>
        <MenuUser isOpen={openMenu} />
           <main className="main-content">{children}</main>

      {/*-----MAIN---------*/}
      <DSSV />
      
    </>
  );
}
