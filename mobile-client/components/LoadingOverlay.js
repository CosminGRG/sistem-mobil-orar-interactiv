import { ActivityIndicator, View, Dimensions } from "react-native";

const LoadingOverlay = ({ isShow = false }) => {
  if (isShow) {
    return (
      <View
        style={{
          position: "absolute",
          flex: 1,
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 200,
          }}
        >
          <ActivityIndicator size="large" color={"#06447E"} />
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default LoadingOverlay;
