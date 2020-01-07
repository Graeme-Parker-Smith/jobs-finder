import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView from "react-native-maps";
import { connect } from "react-redux";

import * as actions from "../actions";

const MapScreen = props => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  });

  const onRegionChangeComplete = region => {
    // console.log(region);
    setRegion(region);
  };

  const onButtonPress = () => {
    props.fetchJobs(region, () => {
      props.navigation.navigate("deck");
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        style={styles.mapStyle}
      />
      <View style={styles.buttonContainer}>
        <Button
          large
          title="Search This Area"
          icon={{ name: "search" }}
          buttonStyle={{ backgroundColor: "#009688" }}
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  title: "Map",
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="my-location" size={30} color={tintColor} />;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0
  }
});

export default connect(null, actions)(MapScreen);
