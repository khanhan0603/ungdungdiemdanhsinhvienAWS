import {  createBrowserRouter } from "react-router-dom";
import DSSV from "../pages/admin/dssv";
import DSGV from "../pages/admin/dsgv";
import GVupdate from "../pages/admin/updategv";
import UserLogin from "../component/user/loginuser";
import AdminLogin from "../component/admin/loginadmin"
import HomePage from "../pages/admin/home";
import SVupdate from "../pages/admin/updatesv";
import HomeUser from "../pages/user/homeuser";
import QMK from "../pages/other/formqmk";
import DSLT from "../pages/admin/dslthi";
import LTUpdate from "../pages/admin/updatelt";
import AccountUser from "../pages/account";

import LichThi from "../pages/user/lichthi";
import DiemDanh from "../component/diemdanh/diemdanh";
import Account from "../pages/account/accountad";
import MaCode from "../pages/other/formmacode";
import DMK from "../pages/other/formđmk";
import ListsDiemDanh from "../pages/diemdanh/kthucdiemdanh";
import QuenMatKhau from "../pages/user/formqmk";
import NhapMaCode from "../pages/user/formmacode";
import DoiMatKhau from "../pages/user/formdmk";

import CTDD from "../pages/diemdanh/chitietdiemdanh";
import ThongKe from "../pages/admin/thongke";
import MultiUpload from "../component/admin/uploadimage";
import UploadImages from "../pages/admin/uploadimages";

export const router=createBrowserRouter([
    {
        path:"/homepage",
        element:<HomePage />,
    },
    {
        path:"/",
        element:<AdminLogin />,
    },
    {
        path:"/dssv",
        element:<DSSV />
    },
    {
        path:"/dsgv",
        element:<DSGV />
    },
    {
        path:"/updategv/:magv",
        element:<GVupdate />
    }
    ,
    {
        path:"/loginuser",
        element:<UserLogin />
    }
    ,
   {
    path: "/homeuser",
    element: <HomeUser />
},

   {
    path:"/updatesv/:masv",
    element:<SVupdate />
   }
    ,
    {
        path:"/formqmk",
        element:<QMK />
    }
    ,{
        path:"/formmacode",
        element:<MaCode />
    }
    ,
    {
        path:"/formdmk",
        element:<DMK />
    }
    ,
    {
        path:"/dslichthi",
        element:<DSLT />
    },
    {
        path:"/updatelt/:malichthi",
        element:<LTUpdate />
    }
    ,{
        path:"/account",
        element:<AccountUser />
    }
    ,{
        path:"/accountad",
        element:<Account />
    }
   ,
   {
    path:"/lichthi",
    element:<LichThi />
   }
   
  ,{
 path:"/diemdanh/:madiemdanh" ,
 element:<DiemDanh />

  }
  ,{
    path:"/kthucdiemdanh/:email",
    element:<ListsDiemDanh />
  }
  ,{
    path:"/quenmatkhau",
    element:<QuenMatKhau/>
  },
  {
    path:"/nhapmacode",
    element:<NhapMaCode/>
  },
  {
    path:"/doimatkhau",
    element:<DoiMatKhau/>
  },
 {
    path:"/thongke/:email",
    element: <ThongKe />
 }
 ,
 {
    path:"/kthucdiemdanh/:email/:madiemdanh/:malop",
    element:<CTDD />
 },
 {
    path:"/uploadimages",
    element:<UploadImages />
 }
])