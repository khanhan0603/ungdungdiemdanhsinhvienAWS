import HeaderAD from "../../component/home/heaaderad";
import Menu from "../../component/home/menu";
import UpdateGV from "../../component/update/updategv";
import { useState } from "react";

export default function GVupdate({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
        <UpdateGV />
        </>
    )
}