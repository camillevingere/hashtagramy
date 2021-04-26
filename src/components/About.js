import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { Icon, Button } from "react-native-elements";
import { Card } from "react-native-paper";

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

const RaisedButton = (props) => <Button raised {...props} />;

class About extends Component {
  render() {
    return (
      <ScrollView>
        <Card style={styles_static.card}>
          <Card.Title title="@camillevingere" />
          <Card.Content>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 130,
                  height: 130,
                  marginBottom: 20,
                  borderRadius: 130,
                }}
                source={require("../../assets/camille.jpg")}
              />
            </View>
            <Text
              style={{
                flex: 2,
                marginBottom: 15,
                marginTop: -5,
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              Développement de l'application
            </Text>
            <Button
              icon={
                <Icon
                  style={{ marginRight: 5 }}
                  name="logo-instagram"
                  type="ionicon"
                  color="#517fa4"
                  color="#ffffff"
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Voir sur Instagram"
              onPress={() =>
                Linking.openURL("https://www.instagram.com/camillevingere/")
              }
            />
          </Card.Content>
        </Card>

        <Card style={styles_static.card}>
          <Card.Title title="@amndapics" />
          <Card.Content>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 130,
                  height: 130,
                  marginBottom: 20,
                  borderRadius: 130,
                }}
                source={require("../../assets/amanda.jpg")}
              />
            </View>
            <Text
              style={{
                marginBottom: 15,
                marginTop: -5,
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              Base de données des hashtags
            </Text>
            <Button
              icon={
                <Icon
                  style={{ marginRight: 5 }}
                  name="logo-instagram"
                  type="ionicon"
                  color="#517fa4"
                  color="#ffffff"
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "#e91e63",
              }}
              title="Voir sur Instagram"
              onPress={() =>
                Linking.openURL("https://www.instagram.com/amndapics/")
              }
            />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles_static = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
});

export default About;
