import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GenderScreen from "./GenderScreen";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { block, Easing } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../constants";

function TypeScreen({ navigation }) {
  const { width, height } = Dimensions.get("screen");

  return (
    <View style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
        }}
      >
        <Svg height={height + 50} width={width + 50}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("../../assets/images/dark.jpg")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            ClipPath="url(#clip)"
          />
        </Svg>
      </View>
      <View>
        <MaterialIcons
          style={styles.icon}
          name="arrow-back"
          color={COLORS.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Animatable.View animation="slideInLeft" style={styles.header}>
        <Text style={styles.text_header}>Lets get started!</Text>
        <Text style={styles.textInput}>What are you here for?</Text>
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="lightSpeedIn">
        <Animated.View animation="lightSpeedIn">
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("GenderScreen", { type: "student" });
              }}
            >
              <LinearGradient
                colors={[COLORS.darkpink, COLORS.primary]}
                style={styles.button}
              >
                <Text style={styles.textSign}>I want to learn</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  color="#000"
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View animation="lightSpeedIn">
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("GenderScreen", { type: "tutor" });
              }}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.yellow2]}
                style={styles.button}
              >
                <Text style={styles.textSign}>I want to teach</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  color="#000"
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animatable.View>
    </View>
  );
}

export default TypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black3,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 30,
    marginVertical: 50,
  },
  footer: {
    flex: 3,
    opacity: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: COLORS.white2,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 10,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },

  icon: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20,
  },
  textInput: {
    marginHorizontal: 20,
    flex: 1,
    color: "#474747",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 2,
  },

  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
