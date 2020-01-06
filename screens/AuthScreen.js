import React, { useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

const AuthScreen = (props) => {
  useEffect(() => {
    props.facebookLogin();
    onAuthComplete(props);
  }, []);
  useEffect(() => {
    onAuthComplete(props);
  }, [props.token]);

  const onAuthComplete = props => {
    if (props.token) {
      props.navigation.navigate("map");
    }
  };

  return (
    <View />
  );
};

function mapStateToProps({ auth }) {
  console.log(auth);
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
