import React, { useContext, useEffect } from "react";

import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Context as UserContext } from "../dataStore/userAccessContext";

const ProfileScreen = () => {
  const { state, onLogout, onGetProfile } = useContext(UserContext);
  const { profile } = state;

  useEffect(() => {
    onGetProfile();
  }, []);

  return (
    <SafeAreaView style={styles.containerMain}>
      <View>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../assets/images/misc/background.png")}
        />
        <View style={styles.containerProfile}>
          <Image
            style={styles.imageProfile}
            source={require("../assets/images/misc/logo_ace.png")}
          />
          <Text style={styles.nameProfile}>
            {profile?.professor ? "Prof. " : " "}
            {profile !== undefined &&
              [profile.firstname, " ", profile.lastname].join("")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onLogout();
          }}
          style={{
            backgroundColor: "#06447E",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            width: "30%",
            alignSelf: "center",
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
            Logout
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.rowItemView}>
          <View style={styles.subrowItemView}>
            <MaterialCommunityIcons
              name="office-building-outline"
              size={26}
              color="black"
            />
            <Text style={{ fontSize: 20, marginLeft: 5 }}>Facultate</Text>
          </View>
          <Text style={{ fontSize: 20, marginRight: 10 }}>
            {profile !== undefined && profile.faculty}
          </Text>
        </View>

        <View style={styles.rowItemView}>
          <View style={styles.subrowItemView}>
            <FontAwesome5 name="building" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 5 }}>Departament</Text>
          </View>
          <Text style={{ fontSize: 20, marginRight: 10 }}>
            {profile !== undefined && profile.department}
          </Text>
        </View>

        {profile?.professor ? (
          <View></View>
        ) : (
          <View style={styles.rowItemView}>
            <View style={styles.subrowItemView}>
              <MaterialIcons name="date-range" size={26} color="black" />
              <Text style={{ fontSize: 20, marginLeft: 5 }}>An</Text>
            </View>
            <Text style={{ fontSize: 20, marginRight: 10 }}>
              {profile !== undefined && profile.uniyear}
            </Text>
          </View>
        )}

        {profile?.professor ? (
          <View></View>
        ) : (
          <View style={styles.rowItemView}>
            <View style={styles.subrowItemView}>
              <MaterialIcons name="groups" size={24} color="black" />
              <Text style={{ fontSize: 20, marginLeft: 5 }}>Grupa</Text>
            </View>
            <Text style={{ fontSize: 20, marginRight: 10 }}>
              {profile?.group ? profile.group.name : ""}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: "space-evenly",
  },
  imageBackground: {
    width: "100%",
    height: 170,
  },
  containerProfile: {
    alignItems: "center",
    marginTop: -65,
  },
  imageProfile: {
    height: 120,
    width: 120,
  },
  nameProfile: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10,
  },
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    marginBottom: 15,
    marginTop: 15,
    margin: 30,
  },
  rowItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  subrowItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
