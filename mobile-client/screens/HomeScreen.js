import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { RRule } from "rrule";
import { Agenda } from "react-native-calendars";

import Toast from "react-native-root-toast";
import ModalView from "../components/ModalView";
import LoadingOverlay from "../components/LoadingOverlay";

import { Context as UserContext } from "../dataStore/userAccessContext";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const HomeScreen = ({ navigation }) => {
  const {
    state,
    onGetOrar,
    onGetAppointments,
    onAppointmentDelete,
    onSearchPeople,
    onCreateAppointment,
    onAppointmentConfirm,
  } = useContext(UserContext);
  const { orar, appointments, people, id } = state;

  const [items, setItems] = useState({});
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [inputStartDate, setInputStartDate] = useState(new Date());
  const [inputEndDate, setInputEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [invitedPeople, setInvitedPeople] = useState([]);
  const [modalSearchLoading, setModalSearchLoading] = useState([]);
  const [peopleSearchList, setPeopleSearchList] = useState([]);
  const [monthLoaded, setMonthLoaded] = useState(false);
  const [locationType, setLocationType] = useState("Onsite");
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);

    onGetAppointments();
    onGetOrar();

    var timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (items === null) {
      loadItems();
    }
  }, [items]);

  useEffect(() => {
    if (isFocused) {
      reloadAgenda();
    }
  }, [isFocused]);

  const createAppointment = () => {
    onCreateAppointment({
      title,
      description,
      location,
      locationType,
      inputStartDate,
      inputEndDate,
      invitedPeople,
    });

    reloadAgenda();
  };

  const reloadAgenda = () => {
    setTimeout(() => {
      onGetAppointments();
      // setTitle("");
      // setDescription("");
      // setLocation("");
      // setInvitedPeople([]);
    }, 500);
    setTimeout(() => {
      setItems(null);
    }, 3000);
  };

  const appointmentResponseCallback = () => {
    if (modalVisible) {
      if (people) {
        let newPeople = people;
        newPeople.map(
          (item) => (item.firstname = item.firstname + " " + item.lastname)
        );
        setPeopleSearchList(people);
      }
    }
  };

  const appointmentReloadResponseCallback = () => {
    onGetAppointments();
    reloadAgenda();
  };

  function getHourInterval(date) {
    let dateToLocalUTC = new Date(date);
    var offsetInHours = -(new Date().getTimezoneOffset() / 60);
    dateToLocalUTC.setHours(dateToLocalUTC.getHours() + offsetInHours);
    let hourInterval = dateToLocalUTC.toISOString().slice(11, 16);
    return hourInterval;
  }

  function checkWeekParity(date) {
    var currentDateHeader = date;
    var currentDate = new Date(currentDateHeader);
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentDate - oneJan) / (24 * 60 * 60 * 1000)
    );
    var result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);

    return (result + 1) % 2;
  }

  const loadAppointments = (items) => {
    var newItems = items || {};

    const appointmentArray = new Array();
    appointments.forEach((item, i) => {
      var newDate = new Date(item.startDate);
      appointmentArray[i] = newDate.toISOString().split("T")[0];
    });
    for (let i = 0; i < appointmentArray.length; i++) {
      var startInvervalDate = new Date(appointments[i].startDate);
      startInvervalDate = startInvervalDate.toISOString().slice(11, 16);
      var endInvervalDate = new Date(appointments[i].endDate);
      endInvervalDate = endInvervalDate.toISOString().slice(11, 16);

      var index = appointments[i].invitedPeople.findIndex(
        (e) => e.participant._id === id
      );
      var confirmedVar = appointments[i].invitedPeople[index]?.confirmed;

      if (!newItems[appointmentArray[i]]) {
        newItems[appointmentArray[i]] = [];
        appointments[i].invitedPeople;
        newItems[appointmentArray[i]].push({
          id: appointments[i]._id,
          titlu: appointments[i].title,
          descriere: appointments[i].description,
          locatie: appointments[i].location,
          locationtype: appointments[i].locationType,
          interval: startInvervalDate + " - " + endInvervalDate,
          invitedPeople: appointments[i].invitedPeople,
          createdBy:
            appointments[i].createdBy.firstname +
            " " +
            appointments[i].createdBy.lastname,
          createdById: appointments[i].createdBy._id,
          confirmed: confirmedVar,
        });
      } else {
        if (
          newItems[appointmentArray[i]].some(
            (e) => e.id === appointments[i]._id
          )
        ) {
          var found = true;
        }
        if (!found) {
          newItems[appointmentArray[i]].push({
            id: appointments[i]._id,
            titlu: appointments[i].title,
            descriere: appointments[i].description,
            locatie: appointments[i].location,
            locationtype: appointments[i].locationType,
            interval: startInvervalDate + " - " + endInvervalDate,
            invitedPeople: appointments[i].invitedPeople,
            createdBy:
              appointments[i].createdBy.firstname +
              " " +
              appointments[i].createdBy.lastname,
            createdById: appointments[i].createdBy._id,
            confirmed: confirmedVar,
          });
        }
      }
    }

    const finalItems = {};
    Object.keys(newItems).forEach((key) => {
      finalItems[key] = newItems[key];
    });

    setItems(finalItems);
  };

  const loadItems = () => {
    if (monthLoaded == false) {
      if (orar == undefined) {
        Alert.alert("Nu s-a putut realiza conexiunea catre server");
        return null;
      }
      setTimeout(() => {
        var ruleArr = new Array();
        for (var i = 0; i < orar.zile.length; i++) {
          const newStartDate = new Date(orar.startDate);
          newStartDate.setDate(newStartDate.getDate() + i);
          ruleArr.push(
            new RRule({
              freq: RRule.WEEKLY,
              interval: 1,
              dtstart: newStartDate,
              until: new Date(orar.endDate),
            })
          );
        }

        const dateContainer = new Array();
        ruleArr.forEach((arrItem, i) => {
          dateContainer[i] = arrItem
            .all()
            .map((date) => date.toISOString().slice(0, 10));
        });

        const newItems = items || {};

        for (let i = 0; i < dateContainer.length; i++) {
          for (let j = 0; j < dateContainer[i].length; j++) {
            if (!newItems[dateContainer[i][j]]) {
              newItems[dateContainer[i][j]] = [];

              const numDays = orar.zile[i];
              for (let k = 0; k < numDays.orarItems.length; k++) {
                let startInvervalDate = getHourInterval(
                  numDays.orarItems[k].startDate
                );
                let endInvervalDate = getHourInterval(
                  numDays.orarItems[k].endDate
                );

                if (
                  numDays.orarItems[k].repeats === "odd" &&
                  checkWeekParity(dateContainer[i][j]) == 1
                ) {
                  newItems[dateContainer[i][j]].push({
                    name: numDays.orarItems[k].name,
                    locatie: numDays.orarItems[k].location,
                    interval: startInvervalDate + " - " + endInvervalDate,
                    type: numDays.orarItems[k].type,
                    linkmeet: numDays.orarItems[k].linkmeet,
                    locationtype: numDays.orarItems[k].locationtype,
                    professor:
                      numDays.orarItems[k].professor.firstname +
                      " " +
                      numDays.orarItems[k].professor.lastname,
                  });
                } else if (
                  numDays.orarItems[k].repeats === "even" &&
                  checkWeekParity(dateContainer[i][j]) == 0
                ) {
                  newItems[dateContainer[i][j]].push({
                    name: numDays.orarItems[k].name,
                    locatie: numDays.orarItems[k].location,
                    interval: startInvervalDate + " - " + endInvervalDate,
                    type: numDays.orarItems[k].type,
                    linkmeet: numDays.orarItems[k].linkmeet,
                    locationtype: numDays.orarItems[k].locationtype,
                    professor:
                      numDays.orarItems[k].professor.firstname +
                      " " +
                      numDays.orarItems[k].professor.lastname,
                  });
                } else if (numDays.orarItems[k].repeats === "weekly") {
                  newItems[dateContainer[i][j]].push({
                    name: numDays.orarItems[k].name,
                    locatie: numDays.orarItems[k].location,
                    interval: startInvervalDate + " - " + endInvervalDate,
                    type: numDays.orarItems[k].type,
                    linkmeet: numDays.orarItems[k].linkmeet,
                    locationtype: numDays.orarItems[k].locationtype,
                    professor:
                      numDays.orarItems[k].professor.firstname +
                      " " +
                      numDays.orarItems[k].professor.lastname,
                  });
                }
              }
            }
          }
        }

        const finalItems = {};
        Object.keys(newItems).forEach((key) => {
          finalItems[key] = newItems[key];
        });

        loadAppointments(finalItems);
        setMonthLoaded(false);
      }, 1000);
      setMonthLoaded(true);
    }
  };

  const renderItem = (item) => {
    if (item.id == null) {
      return (
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => {
            setItem(item);
            setEventModalVisible(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Text>{item.name}</Text>
            <Text style={{ color: "grey" }}>{item.type}</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>{item.interval}</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ color: "grey" }}>{item.locatie}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      if (item.createdById == id) {
        return (
          <TouchableOpacity
            style={styles.touchableItemAppointmentPending}
            onPress={() => {
              setItem(item);
              setEventModalVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.titlu}</Text>
              <Text style={{ color: "grey" }}>Eveniment</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text>{item.interval}</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ color: "grey" }}>{item.locatie}</Text>
            </View>
          </TouchableOpacity>
        );
      } else if (item.confirmed == "Pending") {
        return (
          <TouchableOpacity
            style={styles.touchableItemAppointmentPending}
            onPress={() => {
              setItem(item);
              setEventModalVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.titlu}</Text>
              <Text style={{ color: "grey" }}>Eveniment</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text>{item.interval}</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ color: "grey" }}>{item.locatie}</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={
              item.confirmed == "Yes"
                ? styles.touchableItemAppointmentConfirmed
                : styles.touchableItemAppointmentDenied
            }
            onPress={() => {
              setItem(item);
              setEventModalVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.titlu}</Text>
              <Text style={{ color: "grey" }}>Eveniment</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text>{item.interval}</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ color: "grey" }}>{item.locatie}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
  };

  const renderEmptyDate = () => {
    return <View style={styles.divider} />;
  };

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

  const createAppointmentDeleteAlert = () => {
    Alert.alert("Atentie", "Esti sigur ca vrei sa anulezi evenimentul?", [
      {
        text: "Renunta",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Da",
        onPress: () => {
          Toast.show("Eveniment sters cu succes", {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            animation: true,
          });
          onAppointmentDelete(item.id, appointmentReloadResponseCallback);
          setEventModalVisible(!eventModalVisible);
        },
      },
    ]);
  };

  const returnActionButtons = () => {
    if (item.createdById !== id && item.confirmed == "Pending") {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.buttonConfirm, styles.buttonopen]}
            onPress={() => {
              Toast.show("Eveniment confirmat", {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                animation: true,
              });
              onAppointmentConfirm(
                item.id,
                "Yes",
                appointmentReloadResponseCallback
              );
              setEventModalVisible(!eventModalVisible);
            }}
          >
            <Text style={styles.textStyle}>Accepta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonDelete, styles.buttoncancel]}
            onPress={() => {
              Toast.show("Eveniment refuzat", {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                animation: true,
              });
              onAppointmentConfirm(
                item.id,
                "No",
                appointmentReloadResponseCallback
              );
              setEventModalVisible(!eventModalVisible);
            }}
          >
            <Text style={styles.textStyle}>Refuza</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const returnModalButtons = () => {
    if (item.createdById == id) {
      return (
        <TouchableOpacity
          style={[styles.buttonDelete, styles.buttonopen]}
          onPress={() => {
            createAppointmentDeleteAlert();
          }}
        >
          <Text style={styles.textStyle}>Anuleaza</Text>
        </TouchableOpacity>
      );
    }
  };

  if (isLoading) {
    return <LoadingOverlay isShow={isLoading} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={eventModalVisible}
        onRequestClose={() => {
          setEventModalVisible(!eventModalVisible);
        }}
        useNativeDriver={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 22 }}>
              {item.id ? item.titlu : item.name}
            </Text>
            <Text style={{ fontSize: 16, color: "grey" }}>
              {item.type ? item.type : "Eveniment"}
            </Text>
            <Text style={{ fontSize: 16, color: "grey" }}>
              {item.locationtype}
            </Text>
            {item.id && (
              <Text style={{ fontSize: 16, color: "grey" }}>
                {item.createdBy}
              </Text>
            )}
            <Text style={{ fontSize: 16 }}>{item.interval}</Text>
            <Text style={{ fontSize: 16 }}>
              {item.id
                ? "Descriere: " + item.descriere
                : "Prof. " + item.professor}
            </Text>
            <Text style={{ fontSize: 16 }}>{"Locatie: " + item.locatie}</Text>
            {item.id && <Text style={{ fontSize: 18 }}>Invitati:</Text>}
            {item.id && returnPeople(item)}
            <View>
              {returnActionButtons()}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 10,
                }}
              >
                {returnModalButtons()}
                {item.locationtype == "Online" && (
                  <TouchableOpacity
                    style={[styles.button, styles.buttonopen]}
                    onPress={() => {
                      setEventModalVisible(!eventModalVisible);
                      Linking.openURL(
                        item.linkmeet ? item.linkmeet : item.locatie
                      );
                    }}
                  >
                    <Text style={styles.textStyle}>
                      Alaturati-va intalnirii
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.buttoncancel]}
                  onPress={() => {
                    setEventModalVisible(!eventModalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Inchide</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ModalView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setInputStartDate={setInputStartDate}
        inputStartDate={inputStartDate}
        setInputEndDate={setInputEndDate}
        inputEndDate={inputEndDate}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        location={location}
        setLocation={setLocation}
        invitedPeople={invitedPeople}
        setInvitedPeople={setInvitedPeople}
        createAppointment={createAppointment}
        peopleSearchList={peopleSearchList}
        setPeopleSearchList={setPeopleSearchList}
        onSearchPeople={onSearchPeople}
        modalSearchLoading={modalSearchLoading}
        setModalSearchLoading={setModalSearchLoading}
        appointmentResponseCallback={appointmentResponseCallback}
        locationType={locationType}
        setLocationType={setLocationType}
      ></ModalView>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        loadItemsForMonth={loadItems}
        minDate={"2022-05-10"}
        maxDate={"2022-10-30"}
        markingType={"multi-dot"}
        pastScrollRange={12}
        futureScrollRange={12}
        firstDay={1}
        theme={{
          selectedDayBackgroundColor: "#06447E",
          dotColor: "#06447E",
          agendaTodayColor: "#06447E",
          agendaDayTextColor: "#949494",
          agendaDayNumColor: "#949494",
          agendaKnobColor: "#06447E",
        }}
      ></Agenda>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          backgroundColor: "#06447E",
          position: "absolute",
          borderRadius: 50,
          width: 60,
          height: 60,
          right: 30,
          bottom: 30,
          alignItems: "center",
          justifyContent: "center",
          elevation: 5,
        }}
      >
        <View style={{ marginBottom: 4 }}>
          <FontAwesome5 name="calendar-plus" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  touchableItemAppointmentConfirmed: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    marginTop: 10,
    borderColor: "green",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  touchableItemAppointmentDenied: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    marginTop: 10,
    borderColor: "red",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  touchableItemAppointmentPending: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    marginTop: 10,
    borderColor: "#06447E",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  touchableItem: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    marginTop: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 50,
    margin: 30,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#06447E",
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
  buttonConfirm: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "green",
    width: 120,
    justifyContent: "center",
  },
  buttonDelete: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "red",
    width: 120,
    justifyContent: "center",
  },
  buttonopen: {
    marginRight: 10,
  },
  buttoncancel: {
    marginLeft: 10,
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
});
