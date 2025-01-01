import { useRecoilValue } from "recoil";

import ForgotPassword from "../components/auth/ForgotPassword";
import SignUP from "../components/auth/SignUP";
import authScreenAtom from "../atoms/authAtom";
import Login from "../components/auth/Login";


const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  if (authScreenState === "login") {
    return <Login />;
  }
  if (authScreenState === "signup") {
    return <SignUP />;
  }
  if (authScreenState === "forgotpassword") {
    return <ForgotPassword />;
  }

  return <SignUP />;
};

export default AuthPage;
