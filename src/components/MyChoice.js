import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Paragraph, TextInput } from "react-native-paper";
import Clipboard from "expo-clipboard";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="folder" style={{ flex: 6 }} />
);

var choice = "";
var nbhashtags = 0;
var textArea = "Salut";

const HashtagText = () => {
  const [text, setText] = useState("");
  if (text == "") {
    textArea = choice;
  } else {
    textArea = text;
  }
  console.log(choice);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={textArea}
        onChangeText={(text) => setText(text)}
        label="Liste de hashtags"
        style={{
          backgroundColor: "black",
          fontSize: 16,
          marginBottom: "5%",
        }}
        numberOfLines={20}
        mode="outlined"
        multiline={true}
        scrollEnabled={true}
        blurOnSubmit={true}
      />
    </View>
  );
};

class MyChoice extends React.Component {
  ReplaceTextFunction = (arrayChoice) => {
    var SampleText = arrayChoice.toString();

    var NewText = SampleText.replace(/,/g, " ");

    textArea = NewText;
    choice = NewText;
  };

  getRandomHashtags = (length, strChoice) => {
    var arrayChoice = strChoice.split(",");
    var newArray = [];

    let size = length > arrayChoice.length ? arrayChoice.length : length;

    for (var i = 0; i < size; i++) {
      do {
        var randHashtags =
          arrayChoice[Math.floor(Math.random() * arrayChoice.length)];
      } while (newArray.indexOf(randHashtags) != -1);

      newArray.push(randHashtags);
    }

    return newArray;
  };

  handleChange = (text) => {
    choice += text;
  };

  copyToClipboard = () => {
    Clipboard.setString(choice);
  };

  handleGeneration = (value) => {
    choice = "";
    let err = this.props.handleFormSubmit();
    nbhashtags = value;
    console.log(err);
    if (err > 0) {
      this.ReplaceTextFunction(
        this.getRandomHashtags(Math.floor(nbhashtags), this.props.data.choice)
      );
    } else {
      textArea = "Pas de groupe de hashtags s??lectionn??";
      choice = "Pas de groupe de hashtags s??lectionn??";
    }

    this.forceUpdate();
  };

  handleClear = () => {
    choice = "";
    this.handleGeneration(0);
    this.props.handleId();
  };

  handleClipBoard = () => {
    Clipboard.setString(textArea);
    alert("Vos hashtags ont ??t?? copi??s dans le presse papier");
  };

  componentDidMount() {
    this.props.handleFormSubmit();
  }

  render() {
    return (
      <Card style={styles_static.main_container}>
        <View style={styles_static.card_title}>
          <Card.Title title="Choix des hashtags" left={LeftContent} />
        </View>
        <Card.Content style={styles_static.content_container}>
          <View style={styles_static.buttons_container}>
            <View style={styles_static.button}>
              <Button
                //style={[s.btn, s.btnPrimary]}
                icon="check-circle-outline"
                mode="outlined"
                dark="true"
                style={{ size: 16 }}
                onPress={() => this.handleGeneration(30)}
              >
                G??n??rer
              </Button>
            </View>
          </View>
          <View style={styles_static.list_container}>
            <HashtagText />
          </View>
          <View style={styles_static.buttons_container}>
            <View style={styles_static.button}>
              <Button
                //style={[s.btn, s.btnPrimary]}
                icon="trash-can-outline"
                mode="outlined"
                dark="true"
                style={{ size: 16 }}
                onPress={() => this.handleClear()}
              >
                Effacer
              </Button>
            </View>
            <View style={styles_static.button}>
              <Button
                //style={[s.btn, s.btnPrimary]}
                icon="clipboard"
                mode="outlined"
                dark="true"
                style={{ size: 16 }}
                onPress={() => this.handleClipBoard()}
              >
                Copier
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  }
}

const styles_static = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#303238",
  },
  buttons_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 2,
    marginTop: 10,
    alignItems: "center",
  },
  card_title: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  slider_container: {
    flex: 2,
    marginTop: "10%",
  },
  list_container: {
    flex: 6,
  },
  content_container: {
    flex: 6,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
});

export default MyChoice;
