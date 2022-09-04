import { StyleSheet, StatusBar, Text, View, SafeAreaView } from "react-native";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the settings screen</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
