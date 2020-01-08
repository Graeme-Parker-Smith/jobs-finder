import React, { useEffect } from "react";
import { Notifications } from "expo";
import { Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "react-redux";

import registerForNotifications from "./services/push_notifications";
import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

const MainNavigator = createBottomTabNavigator(
  {
    welcome: WelcomeScreen,
    auth: AuthScreen,
    mainFlow: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      reviewFlow: {
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen
        }),
        navigationOptions: {
          title: "Review Jobs",
          tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
          },
          headerRight: (
            <Button
              title="Settings"
              onPress={() => {
                navigation.navigate("settings");
              }}
              type="clear"
              titleStyle={{ color: "rgba(0,122,255,1)" }}
            />
          )
        }
      }
    })
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false
    },
    lazy: true
  }
);

const App = createAppContainer(MainNavigator);

export default () => {
  useEffect(() => {
    // Notifications.addListener(notification => {
    //   console.log(notification);
    //   const {
    //     data: { text },
    //     origin
    //   } = notification;
      
    //   if (origin === "received" && text) {
    //     Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
    //   }
    // });
    registerForNotifications();
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
