import React, { useContext } from "react";

import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./LoginScreen";
import FadeInView from "../components/FadeInView";

import { Context as UserContext } from "../dataStore/userAccessContext";

const ProfileScreenContainer = () => {
  const { state } = useContext(UserContext);
  const { token } = state;

  return token ? (
    <ProfileScreen />
  ) : (
    <FadeInView>
      <LoginScreen />
    </FadeInView>
  );
};

export default ProfileScreenContainer;
