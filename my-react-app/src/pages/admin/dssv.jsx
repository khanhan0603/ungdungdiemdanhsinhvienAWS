import Menu from '../../component/home/menu';
import ListSV from '../../component/admin/dssv';
import HeaderAD from '../../component/home/heaaderad';
import { useState } from 'react';

export default function DSSV({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
      <ListSV  />
      
    </>
  );
}
