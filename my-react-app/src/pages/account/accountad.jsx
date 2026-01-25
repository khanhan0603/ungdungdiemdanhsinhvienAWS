import AccountAD from "../../component/account/indexad";
import HeaderAD from "../../component/home/heaaderad";
import Menu from "../../component/home/menu";

import { useState } from "react";

export default function Account({children}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <HeaderAD onToggleMenu={()=>setOpenMenu(!openMenu)}/>
      <Menu isOpen={openMenu}/>
       <main className="main-content">{children}</main>
        <AccountAD />
        </>
    )
}