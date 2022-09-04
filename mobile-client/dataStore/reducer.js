import AsyncStorage from "@react-native-async-storage/async-storage";
import aType from "../utils/ActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case aType.LOGIN:
      saveToken(action.payload);
      saveId(action.id);
      return {
        ...state,
        token: action.payload,
        id: action.id,
        message: action.payload,
        isLoading: false,
      };
    case aType.LOGOUT:
      clearStorage();
      return { token: null, message: null, state };
    case aType.ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case aType.VIEW_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case aType.VIEW_ORAR:
      var data;
      if (action.payload.professor) {
        data = action.payload.orar;
      } else {
        data = action.payload.group.orar;
      }
      return {
        ...state,
        orar: data,
        isLoading: false,
      };
    case aType.VIEW_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload.appointments,
      };
    case aType.DELETE_APPOINTMENT:
      return {
        ...state,
      };
    case aType.SEARCH:
      return {
        ...state,
        searchdata: action.payload,
      };
    case aType.USER_SEARCH:
      return {
        ...state,
        people: action.payload,
      };
    case aType.CREATE_APPOINTMENT:
      return {
        ...state,
      };
    case aType.CONFIRM_APPOINTMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const saveToken = async (token) => {
  try {
    var newToken = token;
    if (newToken.split(" ")[0] == "Bearer") {
      newToken = newToken.split(" ")[1];
    }
    await AsyncStorage.setItem("token", `Bearer ${newToken}`);
  } catch (error) {
    console.log(error);
  }
};

const saveId = async (id) => {
  try {
    await AsyncStorage.setItem("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};

export default userReducer;
