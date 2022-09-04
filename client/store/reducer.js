import aType from "../store/ActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case aType.LOGIN:
      saveToken(action.payload);
      saveId(action.id);
      return {
        ...state,
        token: action.payload,
        id: action.id,
      };
    case aType.LOGOUT:
      clearStorage();
      return { token: null, message: null, state };
    case aType.GET_USERS:
      return {
        ...state,
        userData: action.payload,
      };
    case aType.ERROR:
      return {
        ...state,
        message: action.payload,
      };
  }
};

const saveToken = async (token) => {
  try {
    var newToken = token;
    if (newToken.split(" ")[0] == "Bearer") {
      newToken = newToken.split(" ")[1];
    }
    await localStorage.setItem("token", `Bearer ${newToken}`);
  } catch (error) {
    console.log(error);
  }
};

const saveId = async (id) => {
  try {
    await localStorage.setItem("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
};

export default userReducer;
