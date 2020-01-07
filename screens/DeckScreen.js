import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";
import * as actions from "../actions";

const DeckScreen = props => {
  const renderCard = job => {
    return (
      <Card title={job.title}>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.created_at}</Text>
        </View>
        <Text adjustsFontSizeToFit={true} style={{ height: 500 }}>
          {job.description}
        </Text>
        <Button />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: "my-location" }}
          buttonStyle={{ backgroundColor: "#03A9F4" }}
          onPress={() => props.navigation.navigate("map")}
        />
      </Card>
    );
  };

  return (
    <View>
      <Swipe
        data={props.jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={job => props.likeJob(job)}
      />
    </View>
  );
};

DeckScreen.navigationOptions = ({ navigation }) => ({
  title: "Jobs",
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="description" size={30} color={tintColor} />;
  }
});

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
