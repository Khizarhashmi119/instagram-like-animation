import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart(() => {
      scale.value = withSpring(1, undefined, (finished) => {
        if (finished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    });

  const singleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      opacity.value = withTiming(0, undefined, (finished) => {
        if (finished) {
          opacity.value = withDelay(500, withTiming(1));
        }
      });
    });

  const likeAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: Math.max(scale.value, 0),
        },
      ],
    };
  });

  const turtlesAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector
        gesture={Gesture.Exclusive(doubleTapGesture, singleTapGesture)}
      >
        <Animated.Image
          style={styles.postStyles}
          source={require("./assets/post.jpg")}
        />
      </GestureDetector>
      <Animated.Image
        style={[styles.likeStyles, likeAnimatedStyles]}
        source={require("./assets/like.png")}
      />
      <Animated.Text style={[styles.turtles, turtlesAnimatedStyles]}>
        🐢🐢🐢🐢
      </Animated.Text>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  postStyles: {
    height: "70%",
    width: "100%",
  },
  likeStyles: {
    height: "13.5%",
    position: "absolute",
    width: "30%",
  },
  turtles: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
});
