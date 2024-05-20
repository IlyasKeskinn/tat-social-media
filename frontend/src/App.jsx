import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route path="/" element={<Feed />} />
      </Route>
    </Routes>
  );
}

export default App;
