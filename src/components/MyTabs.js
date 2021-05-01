import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyHashtags from "./MyHashtags.js";
import TheirHashtags from "./TheirHashtags.js";
import MyChoice from "./MyChoice.js";
import MyForm from "./MyForm";
import { firebase } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

var Hashtags = {};

var OPTIONS1 = [];

var OPTIONS2 = [];

var ID = 123;

const mapStateToProps = (state) => {
  return {
    theirHashtags: state.theirHashtags,
  };
};

function ModifyTheirHashtags(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mes hashtags"
        children={(navigation) => (
          <TheirHashtags
            key={ID}
            navigation={navigation}
            data={props.data}
            isForm={props.isForm}
            memoryCheck={props.memoryCheck}
            options={props.options}
            load={props.load}
          />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyForm"
        component={MyForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

class MyTabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes1: OPTIONS1.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
      checkboxes2: OPTIONS2.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
      choice: "",
      hashtags1: [],
      hashtags2: [],
      id: "123",
      idTheirHashtags: "678",
    };
  }

  handleCheckboxChange1 = (text) => {
    this.setState((prevState) => ({
      checkboxes1: {
        ...prevState.checkboxes1,
        [text]: !prevState.checkboxes1[text],
      },
    }));
  };

  handleCheckboxChange2 = (text) => {
    this.setState((prevState) => ({
      checkboxes2: {
        ...prevState.checkboxes2,
        [text]: !prevState.checkboxes2[text],
      },
    }));
  };

  handleId = () => {
    this.setState({
      id: Math.random().toString(),
    });
  };

  handleIdTheirHashtags = () => {
    this.setState({
      idTheirHashtags: Math.random().toString(),
    });
  };

  checkCheckbox = (arr) => {
    for (var key in arr) {
      if (arr[key] == true) {
        return true;
      }
    }

    return false;
  };

  handleFormSubmit = () => {
    this.setState({
      choice: "",
    });

    let status = 0;

    if (this.checkCheckbox(this.state.checkboxes1) == true) {
      console.log(this.state.hashtags1);
      Object.keys(this.state.checkboxes1)
        .filter((checkbox) => this.state.checkboxes1[checkbox])
        .forEach((checkbox) => {
          this.setState((prevState) => ({
            choice: prevState.choice + this.state.hashtags1[checkbox],
          }));
        });

      status = 1;
    }
    if (this.checkCheckbox(this.state.checkboxes2) == true) {
      console.log(this.state.hashtags2);
      Object.keys(this.state.checkboxes2)
        .filter((checkbox) => this.state.checkboxes2[checkbox])
        .forEach((checkbox) => {
          this.setState((prevState) => ({
            choice: prevState.choice + this.state.hashtags2[checkbox],
          }));
        });

      status = 1;
    }

    return status;
  };

  handleChange = () => {
    this.setState({
      choice: this.state.choice,
    });
  };

  initDatabase = () => {
    this.setState({
      hashtags1: [],
    });
    OPTIONS1 = [];
    firebase
      .database()
      .ref("/hashtags")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          OPTIONS1.push(childSnapshot.key.toString());
        });
        this.setState({
          hashtags1: snapshot.val(),
        });
      });
  };

  fromStrToArray = (strString) => {
    var array = strString.split(" ");
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      var hashtags = array[i];
      newArray.push(hashtags);
    }

    return array;
  };

  dumpRaw = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      if (result.length > 0) {
        console.log("salut");
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              //console.log(store);
              Hashtags[store[i][0]] = this.fromStrToArray(store[i][1]);
              this.setState({
                hashtags2: Hashtags,
              });
            });
          });
        });
      } else {
        console.log("pas salut");
        this.setState({
          hashtags2: null,
        });
      }
    } catch (e) {}
  };
  clearAllData() {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => alert("success"));
  }

  fromStrToArray = (strString) => {
    var array = strString.split(" ");
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      var hashtags = array[i];
      newArray.push(hashtags);
    }

    return array;
  };

  componentDidMount() {
    //this.clearAllData();
    this.initDatabase();
    this.dumpRaw();
  }

  componentDidUpdate() {
    this.setState({
      hashtags2: this.props.theirHashtags,
    });
  }

  render() {
    console.log(this.props.theirHashtags);
    console.log(this.state.hashtags2);
    return (
      <Tab.Navigator
        initialRouteName="MyHashtags"
        activeColor="white"
        labelStyle={{ fontSize: 12 }}
        backgroundColor="red"
        barStyle={{ backgroundColor: "#383838" }} //"#0578F9" }}
      >
        <Tab.Screen
          name="MyHashtags "
          children={() => (
            <MyHashtags
              data={this.state}
              memoryCheck={this.handleCheckboxChange1}
              options={OPTIONS1}
            />
          )}
          options={{
            tabBarLabel: "Hashtags",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="fire" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ModifyTheirHashtags"
          children={() => (
            <ModifyTheirHashtags
              data={this.state}
              isForm={this.props.isForm}
              memoryCheck={this.handleCheckboxChange2}
              options={OPTIONS2}
              load={this.dumpRaw}
              navigation={this.props.navigationProps}
            />
          )}
          options={{
            tabBarLabel: "Mes hashtags",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="MyChoice"
          children={() => (
            <MyChoice
              key={this.state.id}
              data={this.state}
              handleFormSubmit={this.handleFormSubmit}
              handleChange={this.handleChange}
              handleId={this.handleId}
            />
          )}
          options={{
            tabBarLabel: "Générer",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="check" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default connect(mapStateToProps)(MyTabs);
