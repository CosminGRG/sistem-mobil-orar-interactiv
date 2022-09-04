import { NavigationActions } from "@react-navigation/native";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  //navigator.dispatch(NavigationActions.navigate({ routeName, params }));
  navigator.navigate(routeName, params);
};

export const replace = (routeName, params) => {
  navigator.replace(routeName, params);
};

export const reset = (params) => {
  navigator.reset(params);
};
