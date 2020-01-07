import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

const SettingsScreen = props => {
  return (
    <View>
      <Button
        title="Reset Liked Jobs"
        large
        icon={{ name: "delete-forever" }}
        buttonStyle={{ backgroundColor: "#F44336" }}
        onPress={props.clearLikedJobs}
      />
    </View>
  );
};

export default connect(null, { clearLikedJobs })(SettingsScreen);
