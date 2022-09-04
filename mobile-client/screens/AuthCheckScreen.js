import React, { useEffect, useContext } from "react";
import { Context as UserContext } from "../dataStore/userAccessContext";

const AuthCheckScreen = () => {
  const { onCheckLogin } = useContext(UserContext);

  useEffect(() => {
    onCheckLogin();
  }, []);

  return null;
};

export default AuthCheckScreen;
