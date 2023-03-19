import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './yunscreens/Welcome';
import Index from './yunscreens/Index';
import Profile from './yunscreens/Profile';
import TransactionHistory from './yunscreens/TransactionHistory';
import Verify from './secondary_screens.js/Verify';
import Editprofile from './yunscreens/Editprofile';
import Buytoken from './yunscreens/Buytoken';
import PackageToken from './yunscreens/PackageToken';
import ForgotPassword from './secondary_screens.js/ForgotPassword';
import ResetPassword from './secondary_screens.js/ResetPassword';
import VerifyMail_ResetPassword from './secondary_screens.js/VerifyMail_ResetPassword';
import AllUser from './yunscreens/AllUser';
import ViewProfile from './yunscreens/ViewProfile';
import AdminPage from './yunscreens/AdminPage';

import Test from './secondary_screens.js/Test';

import 'bootstrap/dist/css/bootstrap.min.css';

// mint
import EditCoin from './screens/EditCoin';
import UserProfile from './screens/UserProfile';
import BuyCoin from './screens/BuyCoin';

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
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/transaction" element={<TransactionHistory />} />
      <Route path="/buytoken" element={<Buytoken/>} />
      <Route path="/packagetoken" element={<PackageToken/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/verify-resetPassword" element={<VerifyMail_ResetPassword/>} />
      <Route path="/alluser" element={<AllUser />} />

      <Route path="/admin" element={<AdminPage/>} />
      
      <Route path="/test" element={<Test/>} />

      {/* mint */}
      <Route path="/editcoin" element={<EditCoin />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/buycoin" element={<BuyCoin />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
