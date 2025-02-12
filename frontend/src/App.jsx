import "./App.css";
import "./i18n"; // i18n konfigürasyonunu import et

import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

import NotFoundPage from "./components/notfound/NotFoundPage";
import { ProtectedRoutes } from "./path/ProtectedRoutes";
import UserPost from "./components/profile/UserPost";
import AccountPrivacy from "./pages/AccountPrivacy";
import Notifications from "./pages/Notifications";
import Conservations from "./pages/Conversations";
import BlockedUsers from "./pages/BlockedUsers";
import YourAccount from "./pages/YourAccount";
import MainLayout from "./layouts/MainLayout";
import EditProfile from "./pages/EditProfile";
import Settings from "./layouts/Settings";
import userAtom from "./atoms/userAtom";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";


// i18n konfigürasyonunu import et


function App() {
  const user = useRecoilState(userAtom)[0];
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sayfa yüklendiğinde kaydedilmiş dil tercihini kontrol et
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <Routes>
      <Route element={<ProtectedRoutes condition={user} routes={"/auth"} />}>
        <Route path="" element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/post/:postId" element={<UserPost />} />
          <Route path="profile/:query" element={<Profile />} />
          <Route path="profile/edit/:username" element={<EditProfile />} />
          <Route path="/message" element={<Conservations />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} >
            <Route path="" element={<YourAccount />} />
            <Route path="blocked_accounts" element={<BlockedUsers />} />
            <Route path="account_privacy" element={<AccountPrivacy />} />
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedRoutes condition={!user} routes="/" />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route path="" element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage text={"Not found page!"} />} />
      </Route>
    </Routes>
  );
}

export default App;
