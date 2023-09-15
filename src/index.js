import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


//important screens
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Index from './screens/Index';
import EditCoin from './screens/EditCoin';
import Profile from './screens/Profile';
import BuyCoin from './yunscreens/BuyCoin';
import TransactionHistory from './yunscreens/TransactionHistory';
import AdminManageUser from './screens/admin/AdminManageUser';
import AdminManageAdmin from './screens/admin/AdminManageAdmin';
import AdminManageCms from './screens/admin/AdminManageCms';
import AdminManageCmsProblem from './screens/admin/AdminManageCmsProblem';
import AdminManageFAQ from './screens/admin/AdminManageFAQ';
import SettingProfile from './screens/SettingProfile';
import SettingCoin from './screens/SettingCoin';
import NewPassword from './yunscreens/NewPassword';
import ViewProfile from './screens/ViewProfile';
import AdminPage from './screens/admin/AdminPage';
import ManageCommission from "./screens/ManageCommission";
import ChatBox from "./screens/Chatbox";
import CmsDetail from "./screens/CmsDetail";

//important screens two
import ForgotPassword from './secondary_screens/ForgotPassword';
import ResetPassword from './secondary_screens/ResetPassword';
import Verify from './secondary_screens/Verify';

//screens test
import ChatContainertest from './yunscreens/ChatContainertest';
import Chat from './yunscreens/Chat';
import ProfileTest from './yunscreens/ProfileTest';
import VerifyMail_ResetPassword from './yunscreens/VerifyMail_ResetPassword';
import AllUser from './yunscreens/AllUser';
import Test from './yunscreens/Test';
import Editprofile from './yunscreens/Editprofile';
import Buytoken from './yunscreens/Buytoken';
import PackageToken from './yunscreens/PackageToken';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/buytoken" element={<Buytoken/>} />
      <Route path="/packagetoken" element={<PackageToken/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/manage-commission" element={<ManageCommission/>}/>
      <Route path="/editcoin" element={<EditCoin />} />
      <Route path="/buycoin" element={<BuyCoin />} />
      <Route path="/setting-profile" element={<SettingProfile />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route path="/chatbox" element={<ChatBox />} />
      <Route path="/cmsdetail" element={<CmsDetail />} />

      {/*admin*/}
      <Route path="/admin" element={<AdminPage/>} />
      <Route path="/setting-coin" element={<SettingCoin />} />
      <Route path="/admin/alluser" element={<AdminManageUser />} />
      <Route path="/admin/alladmin" element={<AdminManageAdmin/>} />
      <Route path="/admin/transaction" element={<TransactionHistory />} />
      <Route path="/admin/commission" element={<AdminManageCms />} />
      <Route path="/admin/commission/problem/:id" element={<AdminManageCmsProblem />} />
      <Route path="/admin/allfaq" element={<AdminManageFAQ />} />



      {/* test */}
      {/* <Route path="/test" element={<App />} /> */}
      <Route path="/test" element={<Test/>} />
      <Route path="/testchat" element={<ChatContainertest />} />
      <Route path="/profileTest" element={<ProfileTest />} />
      <Route path="/alluser" element={<AllUser />} />
      <Route path="/verify-resetPassword" element={<VerifyMail_ResetPassword/>} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
