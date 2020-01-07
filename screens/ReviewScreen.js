import React from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";

const ReviewScreen = props => {
  console.log(props.likedJobs.length);
  const renderLikedJobs = () => {
    return props.likedJobs.map(job => {
      return (
        <Card title={job.title} key={job.id}>
          <View style={{ height: 200 }}>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.created_at}</Text>
            </View>
            <Button
              title="Appply Now!"
              buttonStyle={{ backgroundColor: "#03A9F4" }}
              onPress={() => Linking.openURL(job.url)}
            />
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

ReviewScreen.navigationOptions = ({ navigation }) => ({
  
});

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
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="description" size={30} color={tintColor} />;
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
});
function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
