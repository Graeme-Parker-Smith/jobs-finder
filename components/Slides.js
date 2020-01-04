import React from "react";
import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slides = ({ data, onComplete }) => {
  const renderLastSlide = index => {
    if (index === data.length - 1) {
      return (
        <Button
          containerStyle={styles.button}
          title="Onwards!"
          raised
          onPress={onComplete}
        />
      );
    }
  };
  const renderSlides = ({ item, index }) => {
    return (
      <View style={[styles.slideStyle, { backgroundColor: item.color }]}>
        <Text style={styles.textStyle}>{item.text}</Text>
        {renderLastSlide(index)}
      </View>
    );
  };
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={item => item.text}
      renderItem={renderSlides}
      pagingEnabled={true}
    />
  );
};

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alginItems: "center",
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: "white"
  },
  button: {
    backgroundColor: "#0288D1",
    width: SCREEN_WIDTH * 0.5,
    alignSelf: "center",
    marginTop: 15
  }
};

export default Slides;
