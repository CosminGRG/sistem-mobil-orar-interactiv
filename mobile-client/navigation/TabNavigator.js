import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreenContainer from "../screens/ProfileScreenContainer";
import HomeScreenContainer from "../screens/HomeScreenContainer";

import Ionicons from "react-native-vector-icons/Ionicons";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#06447E",
        },
        tabBarInactiveTintColor: "#bbbdbf",
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="HomeScreenContainer"
        component={HomeScreenContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          title: "Orar",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          title: "Cautare",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          title: "Profil",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
