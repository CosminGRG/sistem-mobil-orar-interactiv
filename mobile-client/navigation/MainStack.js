import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TabNavigator from "../navigation/TabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthCheckScreen from "../screens/AuthCheckScreen";

const MainStackNav = createNativeStackNavigator();

const MainStack = ({ navigation }) => {
  const [isWelcomeSeen, setWelcomeSeen] = useState("");

  useEffect(() => {
    removeWelcomeSeen();
  }, []);

  const checkifWelcomeIsSeen = async () => {
    try {
      const value = await AsyncStorage.getItem("@isWelcomeSeen");
      if (value !== null) {
        setWelcomeSeen(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeWelcomeSeen = async () => {
    try {
      await AsyncStorage.setItem("@isWelcomeSeen", "true");
    } catch (error) {
      console.log(error);
    }
  };

  const removeWelcomeSeen = async () => {
    try {
      await AsyncStorage.removeItem("@isWelcomeSeen");
    } catch (error) {
      console.log(error);
    }
  };

  return isWelcomeSeen ? (
    <MainStackNav.Navigator initialRouteName="AuthCheckScreen">
      <MainStackNav.Screen
        name={"AuthCheckScreen"}
        component={AuthCheckScreen}
        options={{ headerShown: false }}
      />
      <MainStackNav.Screen
        name={"TabNavigator"}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </MainStackNav.Navigator>
  ) : (
    <MainStackNav.Navigator>
      <MainStackNav.Screen
        name={"AuthCheckScreen"}
        component={AuthCheckScreen}
        options={{ headerShown: false }}
      />
      <MainStackNav.Screen name="Welcome" component={WelcomeScreen} />
      <MainStackNav.Screen name="Login" component={LoginScreen} />
      <MainStackNav.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
