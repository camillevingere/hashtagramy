import "react-native-gesture-handler";

import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MyTabs from "../components/MyTabs.js";
import About from "../components/About";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{
            width: 35,
            height: 35,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MyTabs">
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          title: "Hashtags", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#FB4141", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#e91e63", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "À propos", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#303238",
    notification: "rgb(255, 69, 58)",
  },
};

class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: "#cc5353",
            itemStyle: { marginVertical: 5 },
          }}
        >
          <Drawer.Screen
            name="FirstPage"
            options={{ drawerLabel: "Hashtags" }}
            component={firstScreenStack}
          />
          <Drawer.Screen
            name="SecondPage"
            options={{ drawerLabel: "À propos" }}
            component={secondScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
