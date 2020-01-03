import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

const ReviewScreen = () => {
  return (
    <View>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
    </View>
  );
};

ReviewScreen.navigationOptions = ({ navigation }) => ({
  title: "Review Jobs",
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
});

export default ReviewScreen;
