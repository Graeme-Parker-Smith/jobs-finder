import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  });

  const onRegionChangeComplete = region => {
    console.log(region);
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        style={styles.mapStyle}
      />
    </View>
  );
};

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
  }
});

export default MapScreen;
