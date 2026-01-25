import HeaderAD from "../../component/home/heaaderad";
import Menu from "../../component/home/menu";
import { useState } from "react";
import Home from "../../component/admin/homeadmin" ;

export default function HomePage({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
       <Home />
    </>
  );
}
