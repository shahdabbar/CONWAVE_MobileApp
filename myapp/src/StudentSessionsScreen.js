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
  Modal,
  Animated,
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
import { curveBasis } from "d3-shape";
import Moment from "moment";

import axios from "axios";

const StudentSessionsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(2);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get(`api/user/sessions?user_id=${user.id}`)
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setUpcoming(
      sessions.data
        ? sessions.data.filter((e) => e.date >= Moment().format("YYYY-MM-DD"))
        : null
    );

    setPrevious(
      sessions.data
        ? sessions.data.filter((e) => e.date < Moment().format("YYYY-MM-DD"))
        : null
    );
  }, [sessions]);

  let stars = [];

  for (let x = 1; x <= 5; x++) {
    stars.push({
      x: x,
      name: "star",
      color: COLORS.yellow,
      size: 32,
      style: { marginHorizontal: 6 },
    });
  }

  const Upcoming = () => {
    return (
      <View>
        {sessions ? (
          <FlatList
            data={upcoming}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              marginBottom: 60,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    elevation: 2,
                    borderLeftColor: COLORS.pink,
                    borderLeftWidth: 4,
                    marginHorizontal: SIZES.padding * 2,
                    marginVertical: SIZES.padding,
                  }}
                >
                  <View style={{ position: "absolute", top: 5, right: 10 }}>
                    <MaterialIcon
                      name="star-rate"
                      size={24}
                      color={COLORS.yellow}
                      onPress={() => {
                        setModal(true);
                      }}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 20 }}>
                    <View
                      style={{
                        marginTop: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <View>
                        <View style={styles.profileImage}>
                          <Image
                            source={
                              item.tutor_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.106:8000/${item.tutor_profile_photo_path}`,
                                  }
                                : require("../assets/images/profile2.png")
                            }
                            style={styles.image}
                            resizeMode="cover"
                          />
                        </View>
                      </View>
                      <View style={{ left: 12 }}>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              color: COLORS.yellow2,
                              fontWeight: "bold",
                              fontSize: 20,
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            {item.course_name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              color: COLORS.black,
                              fontWeight: "800",
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            With {item.tutor_firstname} {item.tutor_lastname}.
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              fontWeight: "800",
                              color: "gray",
                              width: "90%",
                              marginVertical: 1,
                            }}
                          >
                            {Moment(item.date).format("dddd, MMM DD")}
                            {" - "}
                            {item.hour}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 0.5,
                        width: "100%",
                        backgroundColor: "#C8C8C8",
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View>
                        <FontAwesome5
                          name="arrow-right"
                          size={16}
                          color={COLORS.pink}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "800",
                          color: COLORS.pink,
                          alignSelf: "center",
                          left: 10,
                        }}
                      >
                        View Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };

  const Previous = () => {
    return (
      <View>
        {sessions ? (
          <FlatList
            data={previous}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              marginBottom: 60,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    elevation: 2,
                    borderLeftColor: COLORS.yellow2,
                    borderLeftWidth: 4,
                    marginHorizontal: SIZES.padding * 2,
                    marginVertical: SIZES.padding,
                  }}
                >
                  <View style={{ position: "absolute", top: 5, right: 10 }}>
                    <MaterialIcon
                      name="star-rate"
                      size={24}
                      color={COLORS.yellow}
                      onPress={() => {
                        setModal(true);
                      }}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 20 }}>
                    <View
                      style={{
                        marginTop: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <View>
                        <View style={styles.profileImage}>
                          <Image
                            source={
                              item.tutor_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.106:8000/${item.tutor_profile_photo_path}`,
                                  }
                                : require("../assets/images/profile2.png")
                            }
                            style={styles.image}
                            resizeMode="cover"
                          />
                        </View>
                      </View>
                      <View style={{ left: 12 }}>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              color: COLORS.yellow2,
                              fontWeight: "bold",
                              fontSize: 20,
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            {item.course_name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              color: COLORS.black,
                              fontWeight: "800",
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            With {item.tutor_firstname} {item.tutor_lastname}.
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              fontWeight: "800",
                              color: "gray",
                              width: "90%",
                              marginVertical: 1,
                            }}
                          >
                            {Moment(item.date).format("dddd, MMM DD")}
                            {" - "}
                            {item.hour}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 0.5,
                        width: "100%",
                        backgroundColor: "#C8C8C8",
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View>
                        <FontAwesome5
                          name="arrow-right"
                          size={16}
                          color={COLORS.pink}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "800",
                          color: COLORS.pink,
                          alignSelf: "center",
                          left: 10,
                        }}
                      >
                        View Booking
                      </Text>
                    </TouchableOpacity>
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
      <Modal visible={modal} transparent={true} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "60%",
              marginHorizontal: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
              paddingBottom: 20,
              // height: 300,
            }}
          >
            <View
              style={{
                position: "absolute",
                marginHorizontal: 10,
                marginVertical: 10,
                right: 2,
              }}
            >
              <FontAwesome
                name="close"
                size={24}
                color="gray"
                onPress={() => {
                  setModal(false);
                }}
              />
            </View>

            <View>
              <View style={{ marginVertical: 20 }}>
                <Text style={styles.infoText}>Rate this tutor</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                {stars.map((e) => {
                  return (
                    <TouchableOpacity key={e.x} onPress={() => {}}>
                      <Animated.View>
                        <FontAwesome
                          name={e.x <= 3 ? e.name : "star-o"}
                          size={e.size}
                          color={e.color}
                          style={e.style}
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {addComment ? (
                <View>
                  <View style={styles.action}>
                    <TextInput
                      style={styles.textinput}
                      placeholder="Add a comment"
                      placeholderTextColor="#666"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(text) => {
                        setComment(text);
                        console.log("comment", comment);
                      }}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setAddComment(!addComment)}
                    >
                      <LinearGradient
                        colors={[COLORS.primary, COLORS.yellow2]}
                        style={styles.next}
                      >
                        <Text style={styles.next_text}>Add</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setAddComment(!addComment)}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.yellow2]}
                    style={styles.next}
                  >
                    <Text style={styles.next_text}>Add Comment</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          left: 20,
        }}
      >
        <View>
          <Ionicon
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="gray"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View style={{ left: 20 }}>
          <Text style={styles.sessions}>Sessions</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statsBox}
          onPress={() => {
            setShow(!show);
          }}
        >
          <Text
            style={{
              ...styles.text,
              ...styles.subText,
              color: show ? COLORS.primary : COLORS.black2,
              fontWeight: show ? "bold" : "normal",
              fontSize: show ? 22 : 20,
              textTransform: show ? "uppercase" : "none",
              textDecorationLine: show ? "underline" : "none",
            }}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}
          style={{
            ...styles.statsBox,
            borderColor: "#DFDBC8",
            borderLeftWidth: 2,
          }}
        >
          <Text
            style={{
              ...styles.text,
              ...styles.subText,

              color: !show ? COLORS.yellow2 : COLORS.black2,
              fontWeight: !show ? "bold" : "normal",
              fontSize: !show ? 22 : 20,
              textTransform: !show ? "uppercase" : "none",
              textDecorationLine: !show ? "underline" : "none",
            }}
          >
            Previous
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 10, marginTop: 10 }}>
        {show ? <>{Upcoming()}</> : <>{Previous()}</>}
      </View>
    </View>
  );
};

export default StudentSessionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  sessions: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.black2,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black2,
    left: 5,
    // alignSelf: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 22,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: "hidden",
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: COLORS.black2,
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 35,
    width: "50%",
    height: 50,
    borderColor: "#ffd200",
    borderWidth: 2,
    alignSelf: "center",
  },
  next_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  // action: {
  //   flexDirection: "row",
  //   marginTop: 10,
  //   marginBottom: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "gray",
  //   paddingBottom: 5,
  //   // width: 100,
  // },
  action: {
    borderRadius: 20,
    borderWidth: 1,
    // marginHorizontal: 20,
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
  //   text: {
  //     margin: 30,
  //     fontSize: 30,
  //     fontWeight: "bold",
  //   },
});