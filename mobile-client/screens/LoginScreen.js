import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Context as UserContext } from "../dataStore/userAccessContext";

import LoadingOverlay from "../components/LoadingOverlay";
import { navigate } from "../utils/NavigationRef";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  const { state, onSignin } = useContext(UserContext);
  const { message } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [message]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <LoadingOverlay isShow={isLoading} />
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
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginTop: 90,
            marginBottom: 30,
          }}
        >
          Login
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5, paddingTop: 5 }}
          />
          <TextInput
            placeholder="Email"
            style={{ flex: 1, paddingVertical: 0 }}
            autoCapitalize={"none"}
            autoCorrect={false}
            keyboardType="email-address"
            selectionColor={"#06447E"}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5, paddingTop: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="default"
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={true}
            selectionColor={"#06447E"}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#06447E", fontWeight: "700" }}>
              Ai uitat?
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "red", textAlign: "center", marginBottom: 5 }}>
          {message}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setIsLoading(true);
            onSignin({ email, password });
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
            Login
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

export default LoginScreen;
