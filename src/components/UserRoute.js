import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <LoadingToRedirect />;
};

export default UserRoute;