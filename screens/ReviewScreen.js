import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";

const ReviewScreen = props => {
  console.log(props.likedJobs.length);
  const renderLikedJobs = () => {
    return props.likedJobs.map(job => {
      return (
        <Card key={job.id}>
          <View style={{ height: 200 }}>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.created_at}</Text>
            </View>
          </View>
        </Card>
      );
    });
  };

  return (
    <View>
      <ScrollView>{renderLikedJobs()}</ScrollView>
    </View>
  );
};

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  italics: {
    fontStyle: "italic"
  }
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
function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
