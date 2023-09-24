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
import Profile from './screens/Profile';
import Transaction_history from './screens/Transaction_history';
import Verify from './screens/Verify';
import Editprofile from './screens/Editprofile';
import Addtoken from './screens/Addtoken';
import Test from './screens/Test';

import Login_M from './screens/Login_M';
import Register_M from './screens/Register_M';
import CreateAccount from './screens/CreateAccount';
import BuyCoin from './screens/BuyCoin';
import SettingProfile from './screens/SettingProfile';
import SettingCoin from './screens/SettingCoin';
import TestPage from './screens/TestPage';
import ForgetPassword from './screens/ForgetPassword';
import NewPassword from './screens/NewPassword';
import AdminManagement from './screens/AdminManagement';
import UserProfile from './screens/UserProfile';
import HomePage from './screens/HomePage';
import FirstPage from './screens/FirstPage';
import CmsDetail from './screens/CmsDetail';
// import ChatBox from './screens/Chatbox';
import ChatBox from './screens/ChatBox';
import ChatBoxUI from './screens/Old_ChatBox';
import Dashboard from './screens/SettingDashboard';
// import ArtistManagement from './screens/ArtistManagement';



import 'bootstrap/dist/css/bootstrap.min.css';
import ArtistManagement from './screens/ArtistManagement';
import ArtworkDetail from './screens/ArtworkDetail';

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
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/transaction" element={<Transaction_history />} />
      <Route path="/addtoken" element={<Addtoken />} />
      <Route path="/test" element={<Test />} />

      {/* ของข้อย */}
      <Route path="/login_M" element={<Login_M />} />
      <Route path="/register_M" element={<Register_M />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/buyCoin" element={<BuyCoin />} />
      <Route path="/setting-profile" element={<SettingProfile />} />
      <Route path="/setting-coin" element={<SettingCoin />} />
      <Route path="/testpage" element={<TestPage />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route path="/adminmanagement" element={<AdminManagement />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/homepage/:submenu" element={<HomePage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/firstpage" element={<FirstPage />} />


      {/*------มาใหม่---- */}
      <Route path="/cmsdetail" element={<CmsDetail />} />
      <Route path="/chatbox" element={<ChatBox />} />
      <Route path="/chatboxui" element={<ChatBoxUI />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/artistmanagement/:menu" element={<ArtistManagement />} />
      <Route path="/artworkdetail" element={<ArtworkDetail />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
