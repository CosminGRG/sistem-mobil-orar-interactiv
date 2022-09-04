import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "../utils/NavigationRef";

const WelcomeScreen = ({ navigation }) => {
  const storeWelcomeSeen = async () => {
    try {
      await AsyncStorage.setItem("@isWelcomeSeen", "true");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            height={300}
            width={300}
            source={require("../assets/images/misc/logo_ucv2.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "500",
            color: "#333",
            marginTop: 70,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Bun venit
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginTop: 30,
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          Bine ai venit pe aplicatia de orar, vizualizeaza orarele grupelor,
          studentilor sau profesorilor.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          Conecteaza-te folosind contul de student sau continua ca vizitator.
        </Text>
        <TouchableOpacity
          onPress={() => {
            //storeWelcomeSeen();
            navigate("Login");
          }}
          style={{
            backgroundColor: "#06447E",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Mergi la login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "#666" }}>Sau, continua ca vizitator </Text>
          <TouchableOpacity
            onPress={() => {
              storeWelcomeSeen();
              navigate("TabNavigator", { screen: "Search" });
            }}
          >
            <Text style={{ color: "#06447E", fontWeight: "700" }}>aici.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
    fontSize: 35,
  },
});
