import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

const SearchDetailsScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const { itemType } = route.params;
  const { itemdata } = route.params;

  function getHourInterval(date) {
    let dateToLocalUTC = new Date(date);
    var offsetInHours = -(new Date().getTimezoneOffset() / 60);
    dateToLocalUTC.setHours(dateToLocalUTC.getHours() + offsetInHours);
    let hourInterval = dateToLocalUTC.toISOString().slice(11, 16);
    return hourInterval;
  }

  const renderziitem = (id, item, name) => {
    return (
      <View key={id}>
        <View style={styles.rowItemView}>
          <View style={{ color: "#ccffff" }}>
            <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
              {getHourInterval(item.startDate)}
            </Text>
            <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
              {getHourInterval(item.endDate)}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>{item.name}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, marginLeft: 5, color: "grey" }}>
                {item.location}
              </Text>
              <Text style={{ fontSize: 20, marginRight: 5, color: "grey" }}>
                {name ? name : " "}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  const renderItem = (id, ziname, ziitems) => {
    return (
      <View style={styles.container} key={id}>
        <View>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 15,
              marginBottom: 15,
              marginTop: 15,
            }}
          >
            {ziname}
          </Text>
        </View>
        {ziitems.map((item) => {
          var profname = " ";
          if (
            item?.professor?.firstname != null &&
            item?.professor?.lastname != null
          ) {
            profname = item.professor.firstname + " " + item.professor.lastname;
          }
          if (item == null) {
            return null;
          }
          return renderziitem(item._id, item, profname);
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginBottom: 65 }}>
      <View>
        <Text style={styles.title}>{name} - Orar</Text>
        <Text style={styles.subtitle}>{itemType}</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView>
        {itemdata.zile.map((item) => {
          // This will render a row for each data element.
          if (item !== null) {
            return renderItem(item._id, item.name, item.orarItems);
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
});

export default SearchDetailsScreen;
