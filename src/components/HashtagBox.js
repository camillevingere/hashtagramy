import React from "react";
import CheckBox from "expo-checkbox";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Paragraph, Button } from "react-native-paper";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { deletenote } from "../store/reducers/theirHashtagsReducer";

const BODY_COLOR = "#000022",
  TEXT_MUTED = "#888888";

// custom constants
const constants = {
  BODY_COLOR,
  TEXT_MUTED,
};

// custom classes
const classes = {
  title: {
    color: "red",
  },
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const { styles: s, constants: c } = bootstrapStyleSheet;

function Buttons(props) {
  const dispatch = useDispatch();
  const deleteNote = (id) => dispatch(deletenote(id));

  ReplaceTextFunction = (arrayChoice) => {
    var SampleText = arrayChoice.toString();

    var NewText = SampleText.replace(/,/g, " ");

    return NewText;
  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem(props.title);
    } catch (e) {
      // remove error
    }

    alert("Groupe supprimé");
  };

  return (
    <View style={styles_static.main_container}>
      <View style={styles.button}>
        <Button
          icon="circle-edit-outline"
          mode="outlined"
          dark="true"
          style={{ size: 16 }}
          onPress={() =>
            props.handleModify(props.title, ReplaceTextFunction(props.hashtags))
          }
        >
          Modifier
        </Button>
      </View>
      <View style={styles.button}>
        <Button
          icon="trash-can-outline"
          mode="outlined"
          dark="true"
          style={{ size: 16 }}
          onPress={() => deleteNote(props.id)}
        >
          Supprimer
        </Button>
      </View>
    </View>
  );
}

class HashtagBox extends React.PureComponent {
  render() {
    return (
      <Card style={styles_static.card}>
        <Card.Title
          title={this.props.label}
          style={styles_static.card_title}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={() => (
            <CheckBox
              disabled={false}
              value={this.props.isSelected}
              onChange={() => this.props.onCheckboxChange(this.props.label)}
              style={{ marginRight: "30%" }}
              tintColors={{ false: "white" }}
            />
          )}
        />

        <Card.Content>
          <Paragraph style={{ flex: 2 }}>{this.props.list}</Paragraph>
          {this.props.handleModify ? (
            <Buttons
              handleModify={this.props.handleModify}
              title={this.props.label}
              hashtags={this.props.list}
              id={this.props.label}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}

const styles_static = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#1C1C1E",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  card_title: {
    flex: 1,
  },
});

export default HashtagBox;
