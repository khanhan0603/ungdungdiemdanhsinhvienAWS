import HeaderAD from "../../component/home/heaaderad";
import Menu from "../../component/home/menu";
import UpdateSV from "../../component/update/updatesv";
import { useState } from "react";

export default function SVupdate({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
        <UpdateSV />
        </>
    )
}