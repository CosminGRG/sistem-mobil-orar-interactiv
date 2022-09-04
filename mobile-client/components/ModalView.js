import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Switch,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Toast from "react-native-root-toast";

const ModalView = ({
  modalVisible,
  setModalVisible,
  inputStartDate,
  setInputStartDate,
  inputEndDate,
  setInputEndDate,
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  invitedPeople,
  setInvitedPeople,
  createAppointment,
  peopleSearchList,
  setPeopleSearchList,
  onSearchPeople,
  modalSearchLoading,
  setModalSearchLoading,
  appointmentResponseCallback,
  locationType,
  setLocationType,
}) => {
  const [mode, setMode] = useState("date");
  const [modeEnd, setModeEnd] = useState("date");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visualDate, setVisualDate] = useState("Alege data");
  const [visualTimeStart, setVisualTimeStart] = useState("Alege ora start");
  const [visualTimeEnd, setVisualTimeEnd] = useState("Alege ora sfarsit");
  const [mesajEroare, setMesajEroare] = useState("");

  const [open, setOpen] = useState(false);

  function getHourInCurrentTimezone(date) {
    let dateToLocalUTC = date;
    var offsetInHours = -(new Date().getTimezoneOffset() / 60);
    dateToLocalUTC.setHours(dateToLocalUTC.getHours() + offsetInHours);
    let hourInterval = dateToLocalUTC.toISOString().slice(11, 16);
    return hourInterval;
  }

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowStart(false);
    setInputStartDate(currentDate);
    setInputEndDate(currentDate);

    let visualdate = currentDate.toISOString().slice(0, 10);
    let visualtime = getHourInCurrentTimezone(currentDate);

    setVisualDate(visualdate);
    setVisualTimeStart(visualtime);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setInputEndDate(currentDate);

    let visualtime = getHourInCurrentTimezone(currentDate);
    setVisualTimeEnd(visualtime);
  };

  const showMode = (currentMode) => {
    setShowStart(true);
    setMode(currentMode);
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showTimepickerEnd = () => {
    showModeEnd("time");
  };

  const isValidURL = (string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  const checkInputs = () => {
    if (
      title == "" ||
      description == "" ||
      location == "" ||
      inputStartDate == null ||
      inputEndDate == null
    ) {
      setMesajEroare("Campurile sunt obligatorii");
      return false;
    } else {
      var isUrl = isValidURL(location);
      var startTime = inputStartDate.getTime();
      var endTime = inputEndDate.getTime();
      if (isOnline && !isUrl) {
        setMesajEroare("Eveniment online. Locatia trebuie sa contina un link");
        return false;
      } else if (endTime < startTime) {
        setMesajEroare(
          "Ora de sfarsit nu poate sa fie mai mica ca ora de inceput"
        );
        return false;
      }
      Toast.show("Eveniment inregistrat cu succes", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        animation: true,
      });
      // setVisualDate("Alege data");
      // setVisualTimeStart("Alege ora start");
      // setVisualTimeEnd("Alege ora sfarsit");
      //setMesajEroare("");

      return true;
    }
  };

  const toggleSwitch = () => {
    if (isOnline) {
      setLocationType("Onsite");
    } else {
      setLocationType("Online");
    }
    setIsOnline((previousState) => !previousState);
  };
  const [isOnline, setIsOnline] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      useNativeDriver={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Adauga eveniment nou</Text>
          <View>
            <DropDownPicker
              style={{
                backgroundColor: "#fff",
                marginBottom: 15,
              }}
              schema={{
                label: "firstname",
                value: "_id",
              }}
              open={open}
              setOpen={setOpen}
              value={invitedPeople}
              setValue={setInvitedPeople}
              items={peopleSearchList}
              setItems={setPeopleSearchList}
              loading={modalSearchLoading}
              disableLocalSearch={true}
              onChangeSearchText={(text) => {
                setModalSearchLoading(true);
                onSearchPeople(
                  text,
                  setModalSearchLoading,
                  appointmentResponseCallback
                );
              }}
              multiple={true}
              searchable={true}
              listMode="FLATLIST"
              mode="BADGE"
              badgeDotColors={["red", "blue", "orange"]}
              searchPlaceholder="Cauta"
              flatListProps={{
                initialNumToRender: 10,
              }}
              searchTextInputProps={{
                maxLength: 15,
                selectionColor: "#06447E",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#fff",
              }}
              translation={{
                PLACEHOLDER: "Selecteaza persoane",
                SEARCH_PLACEHOLDER: "Cauta",
                SELECTED_ITEMS_COUNT_TEXT: {
                  1: "Un element a fost selectat",
                  n: "{count} elemente au fost selectate",
                },
                NOTHING_TO_SHOW: "Nu exista nimic de aratat",
              }}
              searchTextInputStyle={{
                backgroundColor: "#d9dbda",
              }}
              searchContainerStyle={{
                borderBottomColor: "#fff",
                backgroundColor: "#fff",
              }}
            />
            <View style={clicked ? styles.searchBar_clicked : styles.searchBar}>
              {/* search Icon */}
              <MaterialIcons
                name="title"
                size={20}
                color="black"
                style={{ marginLeft: 1 }}
              />
              {/* Input field */}
              <TextInput
                style={styles.input}
                placeholder="Titlu"
                selectionColor={"#06447E"}
                value={title}
                onChangeText={setTitle}
                onFocus={() => {
                  setClicked(true);
                }}
              />
            </View>
            <View style={clicked ? styles.searchBar_clicked : styles.searchBar}>
              {/* search Icon */}
              <MaterialIcons
                name="description"
                size={20}
                color="black"
                style={{ marginLeft: 1 }}
              />
              {/* Input field */}
              <TextInput
                style={styles.input}
                placeholder="Descriere"
                selectionColor={"#06447E"}
                value={description}
                onChangeText={setDescription}
                onFocus={() => {
                  setClicked(true);
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={clicked ? styles.location_clicked : styles.location}>
                {/* search Icon */}
                <Ionicons
                  name="location"
                  size={20}
                  color="black"
                  style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                  style={styles.input}
                  placeholder={isOnline ? "Link" : "Locatie"}
                  selectionColor={"#06447E"}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setClicked(true);
                  }}
                />
              </View>
              <View>
                <Text>Online?</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={isOnline ? "#06447E" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isOnline}
                />
              </View>
            </View>

            <View style={styles.dateInput}>
              <Pressable
                hitSlop={{ left: 10, right: 10 }}
                style={styles.dateInputPressable}
                onPress={() => {
                  showDatepicker();
                }}
              >
                <MaterialIcons
                  name="date-range"
                  size={20}
                  color="black"
                  style={{ marginLeft: 1 }}
                />
                <TextInput
                  editable={false}
                  style={styles.input}
                  placeholderTextColor="#000"
                  placeholder={visualDate}
                  selectionColor={"#06447E"}
                />
              </Pressable>
            </View>
            <View style={styles.dateInput}>
              <Pressable
                hitSlop={{ left: 10, right: 10 }}
                style={styles.dateInputPressable}
                onPress={() => {
                  showTimepicker();
                }}
              >
                <MaterialCommunityIcons
                  name="clock-time-five-outline"
                  size={20}
                  color="black"
                  style={{ marginLeft: 1 }}
                />
                <TextInput
                  editable={false}
                  style={styles.input}
                  placeholderTextColor="#000"
                  placeholder={visualTimeStart}
                  selectionColor={"#06447E"}
                />
              </Pressable>
            </View>
            <View style={styles.dateInput}>
              <Pressable
                hitSlop={{ left: 10, right: 10 }}
                style={styles.dateInputPressable}
                onPress={() => {
                  showTimepickerEnd();
                }}
              >
                <MaterialCommunityIcons
                  name="clock-time-five"
                  size={20}
                  color="black"
                  style={{ marginLeft: 1 }}
                />
                <TextInput
                  editable={false}
                  style={styles.input}
                  placeholderTextColor="#000"
                  placeholder={visualTimeEnd}
                  selectionColor={"#06447E"}
                />
              </Pressable>
            </View>
            {showStart && (
              <DateTimePicker
                value={inputStartDate}
                mode={mode}
                is24Hour={true}
                onChange={onChangeStart}
              />
            )}
            {showEnd && (
              <DateTimePicker
                value={inputEndDate}
                mode={modeEnd}
                is24Hour={true}
                onChange={onChangeEnd}
              />
            )}
          </View>
          <Text style={{ marginBottom: 5, color: "red" }}>{mesajEroare}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={[styles.button, styles.buttonsend]}
              onPress={() => {
                if (checkInputs()) {
                  setModalVisible(!modalVisible);
                  createAppointment();
                }
              }}
            >
              <Text style={styles.textStyle}>Trimite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttoncancel]}
              onPress={() => {
                setMesajEroare("");
                setModalVisible(!modalVisible);
                Keyboard.dismiss();
                setClicked(false);
              }}
            >
              <Text style={styles.textStyle}>Anuleaza</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
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
  },
  buttonsend: {
    marginRight: 10,
  },
  buttoncancel: {
    marginLeft: 10,
  },
  buttondata: {
    marginBottom: 10,
  },
  buttonora: {
    marginBottom: 10,
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "85%",
    fontSize: 20,
    marginLeft: 10,
  },
  dateInput: {
    padding: 5,
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    marginBottom: 15,
  },
  dateInputPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  searchBar_clicked: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    borderColor: "#06447E",
    borderStyle: "solid",
    borderWidth: 1,
  },
  location: {
    width: 260,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  location_clicked: {
    width: 260,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#06447E",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
