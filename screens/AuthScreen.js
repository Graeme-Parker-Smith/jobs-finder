import React, { useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

const AuthScreen = ({ facebookLogin }) => {
  useEffect(() => {
    facebookLogin();
    AsyncStorage.removeItem("fb_token");
  }, []);
  return (
    <View>
      <Text>AuthScreen</Text>
      <Text>AuthScreen</Text>
      <Text>AuthScreen</Text>
      <Text>AuthScreen</Text>
    </View>
  );
};

export default connect(null, actions)(AuthScreen);
