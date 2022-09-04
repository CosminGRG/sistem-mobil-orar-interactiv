import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ id, name, itemType, navigation, itemdata }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate("SearchDetails", {
        name: name,
        itemType: itemType,
        itemdata: itemdata,
      });
    }}
  >
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.itemType}>{itemType}</Text>
    </View>
  </TouchableOpacity>
);

// the filter
const List = ({ searchPhrase, setClicked, data, navigation }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (item.firstname !== undefined) {
      if (searchPhrase === "") {
        return (
          <Item
            id={item._id}
            name={item.firstname + " " + item.lastname}
            itemType={item.professor ? "Profesor" : "Student"}
            navigation={navigation}
            itemdata={item?.group?.orar ? item.group.orar : item.orar}
          />
        );
      }
      // filter of the name
      if (
        item.firstname
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ) {
        return (
          <Item
            id={item._id}
            name={item.firstname + " " + item.lastname}
            itemType={item.professor ? "Profesor" : "Student"}
            navigation={navigation}
            itemdata={item?.group?.orar ? item.group.orar : item.orar}
          />
        );
      }
      // filter of the description
      if (
        item.lastname
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ) {
        return (
          <Item
            id={item._id}
            name={item.firstname + " " + item.lastname}
            itemType={item.professor ? "Profesor" : "Student"}
            navigation={navigation}
            itemdata={item?.group?.orar ? item.group.orar : item.orar}
          />
        );
      }
    } else if (item.name !== undefined) {
      if (searchPhrase === "") {
        return (
          <Item
            id={item._id}
            name={item.name}
            itemType={"Grupa"}
            navigation={navigation}
            itemdata={item.orar}
          />
        );
      }
      // filter of the name
      if (
        item.name
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ) {
        return (
          <Item
            id={item._id}
            name={item.name}
            itemType={"Grupa"}
            navigation={navigation}
            itemdata={item.orar}
          />
        );
      }
      // filter of the description
      if (
        item.description
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ) {
        return (
          <Item
            id={item._id}
            name={item.name}
            itemType={"Grupa"}
            navigation={navigation}
            itemdata={item.orar}
          />
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 5,
    marginBottom: 5,
    height: "85%",
    width: "100%",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
