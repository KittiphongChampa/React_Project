import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminManage from "./screens/admin/AdminManage";

//important screens
import Register from "./screens/Register";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";
import Index from "./screens/Index";
import Profile from "./screens/Profile";
import AdminManageUser from "./screens/admin/AdminManageUser";
import AdminManageAdmin from "./screens/admin/AdminManageAdmin";
import AdminManageCms from "./screens/admin/AdminManageCms";
import AdminManageCmsProblem from "./screens/admin/AdminManageCmsProblem";
import AdminManageFAQ from "./screens/admin/AdminManageFAQ";
import SettingProfile from "./screens/SettingProfile";
import ViewProfile from "./screens/ViewProfile";
import AdminPage from "./screens/admin/AdminPage";
import ManageCommission from "./screens/ManageCommission";
import ManageArtwork from "./screens/ManageArtwork";
import ChatBox from "./screens/Chatbox";
import CmsDetail from "./screens/CmsDetail";
import Dashboard from "./screens/Dashboard";
import ArtworkDetail from "./screens/ArtworkDetail";
import ArtistManagement from "./screens/ArtistManagement";

//important screens two
import ForgotPassword from "./secondary_screens/ForgotPassword";
import ResetPassword from "./secondary_screens/ResetPassword";
import Verify from "./secondary_screens/Verify";

//screens test
import TransactionHistory from "./yunscreens/TransactionHistory";
import Qrpromptpay from "./yunscreens/qrpromptpay";
import AdminNoti from "./yunscreens/adminNoti";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:submenu" element={<Index />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/manage-commission" element={<ManageCommission />} />
      <Route path="/manage-artwork" element={<ManageArtwork />} />
      <Route path="/setting-profile" element={<SettingProfile />} />
      <Route path="/chatbox" element={<ChatBox />} />
      <Route path="/cmsdetail/:id" element={<CmsDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/artworkdetail/:id" element={<ArtworkDetail />} />
      <Route path="/artistmanagement/:menu" element={<ArtistManagement />} />
      <Route path="/admin/adminmanage/:menu/:reportid" element={<AdminManage />} />
      {/*admin*/}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/alluser" element={<AdminManageUser />} />
      <Route path="/admin/alladmin" element={<AdminManageAdmin />} />

      <Route path="/admin/commission" element={<AdminManageCms />} />
      <Route path="/admin/adminmanage/cms-problem/:id" element={<AdminManageCmsProblem />}/>
      <Route path="/admin/allfaq" element={<AdminManageFAQ />} />
      <Route path="/admin/adminmanage/:menu" element={<AdminManage />} />

      {/* test */}
      <Route path="/admin/transaction" element={<TransactionHistory />} />
      <Route path="/qrpromptpay" element={<Qrpromptpay />} />
      <Route path="/admin/noti" element={<AdminNoti />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
