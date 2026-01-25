import ListGV from '../../component/admin/dsgv';
import HeaderAD from '../../component/home/heaaderad';
import Menu from '../../component/home/menu';
import { useState } from 'react';

export default function DSGV({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
    <ListGV />
    </>
  );
}
