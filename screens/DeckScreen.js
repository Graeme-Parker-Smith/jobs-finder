import React from "react";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";

const DeckScreen = props => {
  const renderCard = job => {
    return (
      <Card title={job.title}>
        <Text></Text>
        <Button />
      </Card>
    );
  };

  return (
    <View>
      <Swipe
        data={props.jobs}
        renderCard={renderCard}
        renderNoMoreCards={() => {}}
      />
    </View>
  );
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps)(DeckScreen);
