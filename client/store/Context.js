import createAppContext from "./createAppContext";
import API from "./../api/WebService";
import userReducer from "./reducer";
import aType from "./ActionTypes";

const onSignin =
  (dispatch) =>
  async ({ email, password }, callback) => {
    console.log(API.defaults.headers.common["Authorization"]);
    await API.post("login", {
      email,
      password,
    })
      .then((response) => {
        console.log(response.data);
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
        if (callback && typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        dispatch({
          type: aType.ERROR,
          payload: error.response,
        });
      });
  };

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};

const onGetUsers = (dispatch) => async () => {
  const fetchData = async () => {
    const response = await API.get("/users");
    if (response) {
      dispatch({ type: aType.GET_USERS, payload: response.data });
    }
  };
  fetchData().catch((error) => {
    dispatch({
      type: aType.ERROR,
      payload: "Eroare la preluarea datelor",
    });
  });
};

export const { Provider, Context } = createAppContext(
  userReducer,
  { onSignin, onGetUsers },
  { accessToken: null, message: null }
);
