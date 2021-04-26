import React from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

// Imports: Redux Persist Persister
import { store, persistor } from "./src/store/configureStore";

import Navigation from "./src/navigation/Navigation.js";

import { Provider as PaperProvider, DarkTheme } from "react-native-paper";

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "red",
    card: "black",
    //border: "rgb(199, 199, 204)",
    border: "black",
    notification: "rgb(255, 69, 58)",
  },
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <AppLoading
              startAsync={this._cacheResourcesAsync}
              onFinish={() => this.setState({ isReady: true })}
              onError={console.warn}
            />
          }
          persistor={persistor}
        >
          <PaperProvider theme={MyTheme}>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
  async _cacheResourcesAsync() {
    const images = [
      require("./assets/camille.jpg"),
      require("./assets/menu.png"),
      require("./assets/amanda.jpg"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }
}
