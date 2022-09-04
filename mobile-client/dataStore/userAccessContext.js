import { navigate, reset } from "../utils/NavigationRef";

import AsyncStorage from "@react-native-async-storage/async-storage";
import createAppContext from "./createAppContext";
import API from "../api/WebService";
import aType from "../utils/ActionTypes";
import userReducer from "./reducer";

const onSignin =
  (dispatch) =>
  async ({ email, password }) => {
    await API.post("login", {
      email,
      password,
    })
      .then((response) => {
        var token = response.data.token;
        if (token.split(" ")[0] == "Bearer") {
          token = token.split(" ")[1];
        }

        configureAPI({ token: `Bearer ${token}` });
        dispatch({
          type: aType.LOGIN,
          payload: response.data.token,
          id: response.data.id,
        });
        reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        });
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: "Invalid email or password.",
        });
      });
  };

const onCheckLogin = (dispatch) => async () => {
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    if (token) {
      configureAPI({ token });
      dispatch({ type: aType.LOGIN, payload: token, id: id });
      navigate("TabNavigator", { screen: "Home" });
    } else {
      navigate("Welcome");
    }
  };
  fetchData().catch(console.error);
};

const onLogout = (dispatch) => () => {
  dispatch({ type: aType.LOGOUT });
  reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};

const onGetProfile = (dispatch) => async () => {
  const fetchData = async () => {
    const response = await API.get("/user/profile");
    if (response) {
      dispatch({ type: aType.VIEW_PROFILE, payload: response.data });
    }
  };
  fetchData().catch((error) => {
    dispatch({
      type: aType.ERROR,
      payload: "Eroare la preluarea datelor",
    });
  });
};

const onGetOrar = (dispatch) => async () => {
  const fetchData = async () => {
    const response = await API.get("/user/orar");
    if (response) {
      dispatch({ type: aType.VIEW_ORAR, payload: response.data });
    }
  };
  fetchData().catch(console.error);
};

const onGetAppointments = (dispatch) => async (callback) => {
  await API.get("/user/appointments")
    .then((response) => {
      dispatch({ type: aType.VIEW_APPOINTMENTS, payload: response.data });
      typeof callback === "function" && callback();
    })
    .catch((error) => {
      dispatch({
        type: aType.ERROR,
        payload: "Nu s-au gasit date",
      });
    });
};

const onSearchKeywords =
  (dispatch) =>
  ({ searchPhrase }) => {
    API.get(`/search/${searchPhrase}`)
      .then((response) => {
        dispatch({ type: aType.SEARCH, payload: response.data });
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: "Nu s-au gasit date",
        });
      });
  };

const onCreateAppointment =
  (dispatch) =>
  ({
    title,
    description,
    location,
    locationType,
    inputStartDate,
    inputEndDate,
    invitedPeople,
  }) => {
    API.post("appointment", {
      title,
      description,
      location,
      locationType,
      inputStartDate,
      inputEndDate,
      invitedPeople,
    })
      .then((response) => {
        dispatch({ type: aType.CREATE_APPOINTMENT, payload: response.data });
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: "Oops. Something wrong happened.",
        });
      });
  };

const onAppointmentDelete =
  (dispatch) => (id, appointmentReloadResponseCallback) => {
    API.delete(`/appointments/${id}`)
      .then((response) => {
        dispatch({ type: aType.DELETE_APPOINTMENT, payload: response.data });
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: "Nu s-au gasit date",
        });
      })
      .finally(() => {
        appointmentReloadResponseCallback();
      });
  };

const onAppointmentConfirm =
  (dispatch) => (id, confirmed, appointmentReloadResponseCallback) => {
    API.patch(`/appointments/${id}`, {
      confirmed,
    })
      .then((response) => {
        dispatch({ type: aType.CONFIRM_APPOINTMENT, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: aType.ERROR, payload: "Data not found" + err });
      })
      .finally(() => {
        if (
          appointmentReloadResponseCallback &&
          typeof appointmentReloadResponseCallback === "function"
        ) {
          appointmentReloadResponseCallback();
        }
      });
  };

const onSearchPeople =
  (dispatch) =>
  (searchPhrase, setModalSearchLoading, appointmentResponseCallback) => {
    API.post("/users/search", {
      searchPhrase,
    })
      .then((response) => {
        dispatch({ type: aType.USER_SEARCH, payload: response.data });
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: "Nu s-au gasit date",
        });
      })
      .finally(() => {
        setModalSearchLoading(false);
        appointmentResponseCallback();
      });
  };

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
  API.defaults.headers.common["Cache-Control"] = "no-cache";
  API.defaults.headers.common["Pragma"] = "no-cache";
  API.defaults.headers.common["Expires"] = "0";
};

export const { Provider, Context } = createAppContext(
  userReducer,
  {
    onCheckLogin,
    onSignin,
    onLogout,
    onGetProfile,
    onGetOrar,
    onGetAppointments,
    onSearchKeywords,
    onCreateAppointment,
    onAppointmentDelete,
    onAppointmentConfirm,
    onSearchPeople,
  },
  { accessToken: null, message: null }
);
