import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";

import NotFoundPage from "./components/notfound/NotFoundPage";
import { ProtectedRoutes } from "./path/ProtectedRoutes";
import UserPost from "./components/profile/UserPost";
import Conservations from "./pages/Conservations";
import BlockedUsers from "./pages/BlockedUsers";
import MainLayout from "./layouts/MainLayout";
import EditProfile from "./pages/EditProfile";
import userAtom from "./atoms/userAtom";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";


function App() {
  const user = useRecoilState(userAtom)[0];
  return (
    <Routes>
      <Route element={<ProtectedRoutes condition={user} routes={"/auth"} />}>
        <Route path="" element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/post/:postId" element={<UserPost />} />
          <Route path="profile/:query" element={<Profile />} />
          <Route path="profile/edit/:username" element={<EditProfile />} />
          <Route path="/settings" element={<BlockedUsers />} />
          <Route path="/message" element={<Conservations />} />
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
