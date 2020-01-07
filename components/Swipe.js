import React, { useState, useEffect, useMemo } from "react";
import { Animated, PanResponder, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards
}) => {
  const [pos, setPos] = useState(new Animated.ValueXY());
  const [pos2, setPos2] = useState(new Animated.ValueXY());
  const [deckIndex, setDeckIndex] = useState(0);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      pos.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    }
  });

  useEffect(() => {
    setDeckIndex(0);
  }, []);

  const forceSwipe = direction => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(pos, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = direction => {
    const item = data[deckIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);

    Animated.timing(pos2, {
      toValue: { x: 0, y: -10 },
      duration: 100
    }).start(() => {
      pos.setValue({ x: 0, y: 0 });
      pos2.setValue({ x: 0, y: 0 });
      setDeckIndex(prevDeckIndex => {
        return prevDeckIndex + 1;
      });
    });
  };

  const resetPosition = () => {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  const getCardStyle = () => {
    const rotate = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...pos.getLayout(),
      transform: [{ rotate }]
    };
  };

  const renderCards = () => {
    if (!data || data.results || deckIndex >= data.length) {
      return renderNoMoreCards();
    }
    function makeDeck() {
      return data.map((item, cardIndex) => {
        if (cardIndex < deckIndex) {
          return null;
        }

        if (cardIndex === deckIndex) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.card(cardIndex)]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card(cardIndex),
              { top: 10 * (cardIndex - deckIndex) }
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      });
    }
    if (Platform.OS === "ios") {
      return makeDeck();
    } else {
      return makeDeck().reverse();
    }
  };

  return (
    <Animated.View style={pos2.getLayout()}>{renderCards()}</Animated.View>
  );
};

Swipe.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {}
};

const styles = {
  card: cardIndex => ({
    position: "absolute",
    width: SCREEN_WIDTH,
    zIndex: cardIndex * -1
  })
};

export default Swipe;
