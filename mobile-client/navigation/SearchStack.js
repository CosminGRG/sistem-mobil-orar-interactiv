import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";

const Stack = createStackNavigator();

const SearchStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Cautare",
        }}
      />
      <Stack.Screen
        name="SearchDetails"
        component={SearchDetailsScreen}
        options={{
          title: "Detalii",
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
