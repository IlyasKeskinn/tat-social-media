import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import "./App.css";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route path="/" element={<Feed />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="profile/edit/:username" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
