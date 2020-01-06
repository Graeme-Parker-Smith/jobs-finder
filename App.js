import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "react-redux";

import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  mainFlow: createBottomTabNavigator({
    map: MapScreen,
    deck: DeckScreen,
    reviewFlow: createStackNavigator({
      review: ReviewScreen,
      settings: SettingsScreen
    })
  })
}, {
  defaultNavigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});

const App = createAppContainer(MainNavigator);

export default () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
};
