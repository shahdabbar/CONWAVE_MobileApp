import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

const CourseDescScreen = ({ route, navigation }) => {
  const data = route.params.data
    ? route.params.data.map((e) => {
        return {
          ...e,
          course_decsription: "",
        };
      })
    : null;
  const [courses, setCourses] = useState(data);
  console.log(courses);

  const onValueChange = (item, text) => {
    const newData = courses.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          course_description: text,
        };
      }
      return {
        ...e,
        course_decsription: e.course_decsription,
      };
    });
    setCourses(newData);
    console.log("ccccccccc", courses);
  };

  const displayCourses = () => {
    return (
      <View>
        {courses ? (
          <FlatList
            data={courses}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                  <View style={styles.action}>
                    <TextInput
                      style={styles.textinput}
                      placeholder="Start Typing"
                      placeholderTextColor="#666"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(text) => {
                        onValueChange(item, text);
                      }}
                      underlineColorAndroid="transparent"
                    ></TextInput>
                  </View>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.warning}>
        <Text style={styles.paragraph}>
          Please specify more what you are gonna teach in each course..
        </Text>
      </View>
      <View style={{ marginBottom: 40 }}>
        <ScrollView>{displayCourses()}</ScrollView>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SetRate", { data: courses })}
        >
          <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
            <Text style={styles.next_text}>NEXT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDescScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 20,
  },

  text: {
    marginTop: 10,
    paddingLeft: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
  warning: {
    backgroundColor: "#ffd200",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  action: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    // paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  textinput: {
    padding: 10,
    fontSize: 20,
    height: 150,
    textAlignVertical: "top",
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});