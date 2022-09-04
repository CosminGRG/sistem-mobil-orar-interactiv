import React, { useContext } from "react";

import HomeStack from "../navigation/HomeStack";
import LoginScreen from "./LoginScreen";
import FadeInView from "../components/FadeInView";

import { Context as UserContext } from "../dataStore/userAccessContext";

const HomeScreenContainer = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const { token } = state;

  return token ? (
    <HomeStack navigation={navigation} />
  ) : (
    <FadeInView>
      <LoginScreen />
    </FadeInView>
  );
};

export default HomeScreenContainer;
