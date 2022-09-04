import { NavigationContainer } from "@react-navigation/native";
import { Provider as UserProvider } from "./src/dataStore/userAccessContext";
import { setNavigator } from "./src/utils/NavigationRef";
import { RootSiblingParent } from "react-native-root-siblings";

import MainStack from "./src/navigation/MainStack";

export default () => {
  return (
    <RootSiblingParent>
      <UserProvider>
        <NavigationContainer
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        >
          <MainStack />
        </NavigationContainer>
      </UserProvider>
    </RootSiblingParent>
  );
};
