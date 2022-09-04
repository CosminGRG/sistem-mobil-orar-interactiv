import { useState, useContext } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import SearchBar from "../components/SearchBar";
import SearchList from "../components/SearchList";

import { Context as UserContext } from "../dataStore/userAccessContext";

const SearchScreen = ({ navigation }) => {
  const { state, onSearchKeywords } = useContext(UserContext);
  const { searchdata } = state;

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [keyboardTap, setKeyboardTap] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && (
        <Text style={styles.title}>
          Cauta grupe, studenti, profesori pentru a vedea orare.
        </Text>
      )}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        triggerSearchKeyword={() => {
          if (!keyboardTap) {
            setKeyboardTap(true);
            setTimeout(() => {
              onSearchKeywords({ searchPhrase });
              setKeyboardTap(false);
            }, 120);
          }
        }}
      />
      {
        <SearchList
          searchPhrase={searchPhrase}
          data={searchdata}
          setClicked={setClicked}
          navigation={navigation}
        />
      }
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
  },
  title: {
    width: "90%",
    marginTop: "15%",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});
