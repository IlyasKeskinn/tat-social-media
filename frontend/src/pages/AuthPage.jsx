import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import SignUP from "../components/SignUP";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

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
