import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { Context as UserContext } from "../dataStore/userAccessContext";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

function trimDate(date) {
  let dateToLocalUTC = new Date(date);
  let hourInterval = dateToLocalUTC.toISOString().slice(0, 10);
  return hourInterval;
}

const NotificationScreen = ({ route, navigation }) => {
  const { onAppointmentConfirm } = useContext(UserContext);

  const { notifications } = route.params;

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [item, setItem] = useState({});

  const returnPeople = (item) => {
    var views = [];
    for (let i = 0; i < item?.invitedPeople?.length; i++) {
      if (item?.invitedPeople[i]?.confirmed == "Pending") {
        views.push(
          <Text style={{ color: "#06447E" }} key={i}>
            {item?.invitedPeople[i]?.participant?.firstname +
              " " +
              item?.invitedPeople[i]?.participant?.lastname}
          </Text>
        );
      } else {
        views.push(
          <Text
            style={{
              color:
                item?.invitedPeople[i]?.confirmed == "Yes" ? "green" : "red",
            }}
            key={i}
          >
            {item?.invitedPeople[i]?.participant?.firstname +
              " " +
              item?.invitedPeople[i]?.participant?.lastname}
          </Text>
        );
      }
    }
    return views;
  };

  const renderItem = (id, item) => {
    {
      if (item.title.length > 12) {
        var itemtitle = item.title.substring(0, 12);
        itemtitle = itemtitle + "...";
      }
      if (item.description.length > 12) {
        var itemdescription = item.title.substring(0, 12);
        itemdescription = itemdescription + "...";
      }

      let dateToLocalUTC = new Date(item.startDate);
      var startInterval = dateToLocalUTC.toISOString().slice(11, 16);
      var eventDate = dateToLocalUTC.toISOString().slice(0, 10);
      dateToLocalUTC = new Date(item.endDate);
      var endInterval = dateToLocalUTC.toISOString().slice(11, 16);
    }
    return (
      <TouchableOpacity
        key={id}
        onPress={() => {
          setItem(item);
          setDetailsModalVisible(true);
        }}
      >
        <View>
          <View style={styles.rowItemView}>
            <View style={{ color: "#ccffff" }}>
              <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
                {startInterval}
              </Text>
              <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
                {endInterval}
              </Text>
              <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
                {eventDate}
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 20, marginRight: 10 }}>
                {itemtitle ? itemtitle : item.title}
              </Text>
              <Text style={{ fontSize: 20, marginRight: 10 }}>
                {itemdescription ? itemdescription : item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 5, color: "grey" }}>
                  {item.createdBy.firstname + " " + item.createdBy.lastname}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  marginRight: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "red",
                  borderRadius: 15,
                  height: 40,
                }}
                onPress={() => {
                  onAppointmentConfirm(id, "No");
                  navigation.navigate("Home");
                }}
              >
                <Feather name="x-circle" size={26} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  marginRight: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "green",
                  borderRadius: 15,
                  height: 40,
                }}
                onPress={() => {
                  onAppointmentConfirm(id, "Yes");
                  navigation.navigate("Home");
                }}
              >
                <MaterialIcons
                  name="check-circle-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ marginBottom: 65 }}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={detailsModalVisible}
        onRequestClose={() => {
          setDetailsModalVisible(!detailsModalVisible);
        }}
        useNativeDriver={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 22 }}>{item.title}</Text>
            <Text style={{ fontSize: 16, color: "grey" }}>Eveniment</Text>
            <Text style={{ fontSize: 16, color: "grey" }}>
              {item.locationType}
            </Text>
            <Text style={{ fontSize: 16, color: "grey" }}>
              {item.createdBy?.firstname + " " + item.createdBy?.lastname}
            </Text>
            <Text style={{ fontSize: 16 }}>{item.description}</Text>
            {/* <Text style={{ fontSize: 16 }}>
              {trimHourInterval(item.startDate) +
                "-" +
                trimHourInterval(item.endDate)}
            </Text> */}
            {/* <Text style={{ fontSize: 16 }}>{trimDate(item.startDate)}</Text> */}
            <Text style={{ fontSize: 16 }}>{"Locatie: " + item.location}</Text>
            {item.id && <Text style={{ fontSize: 18 }}>Invitati:</Text>}
            {returnPeople(item)}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              {item.locationType == "Online" ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setDetailsModalVisible(!detailsModalVisible);
                    Linking.openURL(item.location);
                  }}
                >
                  <Text style={styles.textStyle}>Alaturati-va intalnirii</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={[styles.button, styles.buttoncancel]}
                onPress={() => {
                  setDetailsModalVisible(!detailsModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Inchide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.title}>Notificari</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView>
        {notifications.map((item) => {
          if (item !== null) {
            return renderItem(item._id, item);
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  rowItemView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    width: "90%",
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 15,
  },
  subtitle: {
    width: "90%",
    marginBottom: 10,
    fontSize: 17,
    marginLeft: 15,
    color: "grey",
  },
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#06447E",
    width: 120,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default NotificationScreen;
