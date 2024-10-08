import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoutes } from "./path/ProtectedRoutes";
import userAtom from "./atoms/userAtom";
import { useRecoilState } from "recoil";
import NotFoundPage from "./components/NotFoundPage";
import UserPost from "./components/UserPost";
import "./App.css";
import Conservations from "./pages/Conservations";
import BlockedUsers from "./pages/BlockedUsers";

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
