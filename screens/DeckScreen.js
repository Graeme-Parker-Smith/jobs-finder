import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const DeckScreen = () => {
  return (
    <View>
      <Text>DeckScreen</Text>
      <Text>DeckScreen</Text>
      <Text>DeckScreen</Text>
      <Text>DeckScreen</Text>
    </View>
  );
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);
