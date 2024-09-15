import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoutes = ({ condition, routes = "/" }) => {
  return (
    <div>
      {condition ? (
        <Outlet />
      ) : (
        <Navigate replace:true to={`${routes ? routes : "/"}`} />
      )}
    </div>
  );
};

ProtectedRoutes.propTypes = {
  condition: PropTypes.bool.isRequired,
  routes: PropTypes.string,
};
