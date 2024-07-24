import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoutes } from "./path/ProtectedRoutes";
import userAtom from "./atoms/userAtom";
import "./App.css";
import { useRecoilState } from "recoil";
import NotFoundPage from "./components/NotFoundPage";
import Post from "./components/Post";
import UserPost from "./components/UserPost";

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
        </Route>
      </Route>
      <Route element={<ProtectedRoutes condition={!user} routes="/" />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route path="" element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
