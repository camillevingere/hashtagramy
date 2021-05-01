import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

function MyForm(props) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const navigation = useNavigation();

  function onSaveNote() {
    props.route.params.addNote({ noteTitle, noteValue });
    navigation.goBack();
  }

  useEffect(() => {
    // Anything in here is fired on component mount.
    if (props.route.params.title) {
      setNoteTitle(props.route.params.title);
      setNoteValue(props.route.params.hashtags);
    }
  }, []);

  return (
    <>
      {props.route.params.title ? (
        <Header titleText="Modifier le groupe de hashtags" />
      ) : (
        <Header titleText="Ajouter un groupe de hashtags" />
      )}
      <View style={styles.container}>
        <TextInput
          label="Ajouter un titre"
          value={noteTitle}
          mode="outlined"
          onChangeText={setNoteTitle}
          style={styles.title}
        />
        <TextInput
          label="Ajouter mes hashtags"
          value={noteValue}
          onChangeText={setNoteValue}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
          numberOfLines={8}
          mode="outlined"
          multiline={true}
        />

        <View style={{ flex: 2 }}>
          <FAB
            style={styles.fab}
            small
            icon="check"
            disabled={noteTitle == "" ? true : false}
            onPress={() => onSaveNote()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    //height: 300,
    marginTop: 20,
    fontSize: 20,
    backgroundColor: "black",
    flex: 4,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
});

export default MyForm;
