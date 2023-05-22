import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Index from './screens/Index';
import Profile from './yunscreens/Profile';
import TransactionHistory from './screens/TransactionHistory';
import Verify from './secondary_screens/Verify';
import Editprofile from './yunscreens/Editprofile';
import Buytoken from './yunscreens/Buytoken';
import PackageToken from './yunscreens/PackageToken';
import ForgotPassword from './secondary_screens/ForgotPassword';
import ResetPassword from './secondary_screens/ResetPassword';
import VerifyMail_ResetPassword from './yunscreens/VerifyMail_ResetPassword';
import AllUser from './yunscreens/AllUser';
import ViewProfile from './yunscreens/ViewProfile';
import AdminPage from './yunscreens/AdminPage';

import Test from './yunscreens/Test';
import 'bootstrap/dist/css/bootstrap.min.css';

// mint
import EditCoin from './screens/EditCoin';
import UserProfile from './screens/UserProfile';
import BuyCoin from './screens/BuyCoin';
import AdminManagement from './screens/AdminManagement';
import SettingProfile from './screens/SettingProfile';
import SettingCoin from './screens/SettingCoin';
import NewPassword from './yunscreens/NewPassword';
import Chat from './screens/Chat';

//test
import ChatContainertest from './yunscreens/ChatContainertest';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/test" element={<App />} /> */}
      <Route path="/" element={<Index />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/buytoken" element={<Buytoken/>} />
      <Route path="/packagetoken" element={<PackageToken/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/chat" element={<Chat/>} />
      {/* <Route path="/verify-resetPassword" element={<VerifyMail_ResetPassword/>} /> */}
      <Route path="/alluser" element={<AllUser />} />

      <Route path="/admin" element={<AdminPage/>} />
      
      <Route path="/test" element={<Test/>} />

      {/* mint */}
      <Route path="/editcoin" element={<EditCoin />} />
      <Route path="/buycoin" element={<BuyCoin />} />
      <Route path="/setting-profile" element={<SettingProfile />} />
      <Route path="/newpassword" element={<NewPassword />} />

      {/*admin*/}
      <Route path="/setting-coin" element={<SettingCoin />} />
      <Route path="/admin/alluser" element={<AdminManagement />} />
      <Route path="/admin/transaction" element={<TransactionHistory />} />

    {/* test */}
      <Route path="/testchat" element={<ChatContainertest />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
