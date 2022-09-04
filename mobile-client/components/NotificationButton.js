import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Context as UserContext } from "../dataStore/userAccessContext";

const NotificationButton = ({ navigation }) => {
  const { state, onGetAppointments } = useContext(UserContext);
  const { appointments, id } = state;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, [appointments]);

  const loadNotifications = () => {
    if (appointments == null) return;
    var notifications = [];
    var timeNow = new Date();
    var timeNowCompare = timeNow.getTime();
    appointments.forEach((appointment) => {
      var appointmentStartTime = new Date(appointment.startDate);
      var appointmentStartTimeCompare = appointmentStartTime.getTime();
      if (appointmentStartTimeCompare >= timeNowCompare) {
        var invitedUser = appointment.invitedPeople.find(
          (item) => item.participant._id === id
        );
        if (invitedUser?.confirmed == "Pending") {
          notifications.push(appointment);
        }
      }
    });

    setNotifications(notifications);
  };

  return (
    <TouchableOpacity
      style={{
        marginRight: 25,
        alignItems: "center",
      }}
      onPress={() => {
        navigation.navigate("Notification", { notifications: notifications });
      }}
    >
      <View>
        <Ionicons name="notifications-outline" size={30} color="#06447E" />
        {notifications.length > 0 ? (
          <View style={styles.circle}>
            <Text style={{ color: "white" }}>{notifications.length}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationButton;

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    right: -1,
    top: -4,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
  },
});
