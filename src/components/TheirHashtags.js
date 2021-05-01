import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, FAB } from "react-native-paper";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { addnote, deletenote } from "../store/reducers/theirHashtagsReducer";
import { useNavigation } from "@react-navigation/native";
import HashtagBox from "./HashtagBox.js";

function TheirHashtags(props) {
  const notes = useSelector((state) => state.theirHashtags, shallowEqual);
  const dispatch = useDispatch();
  const addNote = (note) => dispatch(addnote(note));

  const navigation = useNavigation();

  const handleModify = (title, hashtags) => {
    navigation.navigate("MyForm", {
      addNote,
      title,
      hashtags,
    });
  };

  const createCheckbox = (option) => (
    <HashtagBox
      label={option}
      isSelected={props.data.checkboxes2[option]}
      onCheckboxChange={props.memoryCheck}
      list={props.data.hashtags2[option]}
      handleModify={handleModify}
    />
  );

  const createCheckboxes = () => Object.keys(notes).map(createCheckbox);

  return (
    <>
      <View style={styles.container}>
        {Object.keys(notes).length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Vous n'avez aucun groupe de hashtags
            </Text>
          </View>
        ) : (
          <ScrollView>{createCheckboxes()}</ScrollView>
        )}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label=""
          color="black"
          onPress={() =>
            navigation.navigate("MyForm", {
              addNote,
            })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10,
    backgroundColor: "white",
  },
  listTitle: {
    fontSize: 20,
  },
});

export default TheirHashtags;
