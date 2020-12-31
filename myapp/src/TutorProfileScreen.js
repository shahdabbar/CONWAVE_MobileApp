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
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import axios from "axios";
import { block, color } from "react-native-reanimated";

const TutorProfileScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [tutor, setTutor] = useState([]);
  const [item, setItem] = useState(route.params.item);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // get user tutor
    axios
      .get(`api/user/tutor?user_id=${item.user_id}`)
      .then((response) => {
        setTutor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`api/user/tutor/courses?user_id=${item.user_id}`)
      .then((response) => {
        setCourses(response.data);
        console.log("couuuu", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {tutor.length != 0 ? (
        <View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.wrapper}>
                <View style={styles.profileImage}>
                  <Image
                    source={
                      item.tutor.profile_photo_path
                        ? {
                            uri: `http://192.168.0.106:8000/${item.tutor.profile_photo_path}`,
                          }
                        : require("../assets/images/profile2.png")
                    }
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.dm}>
                  <MaterialIcon name="chat" size={26} color="#DFD8C8" />
                </View>
                <View style={styles.active}></View>
              </View>
              <View style={styles.infoContainer}>
                <Text
                  style={{
                    ...styles.infoText,
                    color: COLORS.black,
                    textTransform: "capitalize",
                  }}
                >
                  {tutor[0].firstname} {tutor[0].lastname}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "100",
                    color: "gray",
                  }}
                >
                  {tutor[0].location} Lebanon
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    top: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name="star" size={22} color={COLORS.yellow} />
                  <Text
                    style={{
                      color: COLORS.yellow,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    4.5
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={{ ...styles.text, fontSize: 24 }}>
                  {tutor[0].profile.hours_tutored}
                </Text>
                <Text style={{ ...styles.text, ...styles.subText }}>
                  Hours Tutored
                </Text>
              </View>
              <View
                style={{
                  ...styles.statsBox,
                  borderColor: "#DFDBC8",
                  borderLeftWidth: 1,
                }}
              >
                <Text style={{ ...styles.text, fontSize: 24 }}>
                  {tutor[0].profile.students_tutored}
                </Text>
                <Text style={{ ...styles.text, ...styles.subText }}>
                  Students Tutored
                </Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
              <LinearGradient
                colors={[COLORS.yellow, COLORS.white]}
                style={{
                  // borderRadius: SIZES.radius / 2,
                  borderTopRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
                  borderWidth: 2,
                  borderColor: COLORS.yellow,
                  elevation: 5,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.yellow]}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: 50,
                    width: SIZES.width * 0.3,
                    // backgroundColor: COLORS.yellow,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    // ...styles.shadow,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      LBP {item.rate}
                    </Text>
                  </View>
                </LinearGradient>
                <View style={{ marginLeft: 5 }}>
                  <View>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ ...styles.infoText }}>Why hire me</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: "800" }}>
                        {tutor[0].profile.bio}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginBottom: 10, marginTop: 16 }}>
                    <Text style={{ ...styles.infoText, fontSize: 22 }}>
                      Educational Background
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name="university"
                        size={20}
                        color={COLORS.dark}
                      />

                      <Text
                        style={{
                          ...styles.infoText,
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Lebanese Internationl University
                        {/* {tutor[0].profile.university} */}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name="graduation-cap"
                        size={22}
                        color={COLORS.dark}
                      />

                      <Text
                        style={{
                          ...styles.infoText,
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Computer Science
                        {/* {tutor[0].profile.major} */}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                padding: 20,
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    fontWeight: "bold",
                    color: COLORS.black,
                    alignSelf: "center",
                  }}
                >
                  My Courses
                </Text>
              </View>
              {/* <Text style={[styles.subText, styles.recent]}>My Courses</Text> */}
              {courses.map((e) => (
                <View key={e.id}>
                  <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: "70%" }}>
                      <Text
                        style={[
                          styles.text,
                          { color: "#41444B", fontWeight: "300" },
                        ]}
                      >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {e.course.name}
                          {", "}
                        </Text>
                        <Text style={{ fontWeight: "400" }}>
                          {e.course_description}
                        </Text>{" "}
                      </Text>
                    </View>
                    <View style={styles.action}>
                      <Text>{e.rate}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ marginBottom: 50 }}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
                  My Videos
                </Text>
                <Text style={{ ...FONTS.h3, color: "red" }}>View all</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.mediaVideoContainer}>
                  <Image
                    source={require("../assets/images/pexels.jpeg")}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.mediaVideoContainer}>
                  <Image
                    source={require("../assets/images/photo.jpeg")}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.mediaVideoContainer}>
                  <Image
                    source={require("../assets/images/image.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </ScrollView>
              <View style={styles.mediaCount}>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
                  ]}
                >
                  3
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 14,
                      color: "#DFD8C8",
                      textTransform: "uppercase",
                    },
                  ]}
                >
                  Videos
                </Text>
              </View>
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate("BookTime", {
                  course: item,
                  // tutor: tutor,
                })
              }
            >
              <LinearGradient
                colors={[COLORS.beige, COLORS.beige]}
                style={styles.next}
              >
                <Text
                  style={{
                    ...styles.infoText,
                    fontSize: 20,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Book a session - LBP {item.rate}/h
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default TutorProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  wrapper: {
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    // backgroundColor: "gray",
    overflow: "hidden",
    elevation: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  buttonContainer: {
    width: "80%",
    borderTopRightRadius: SIZES.radius * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    height: 70,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  next: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderTopRightRadius: SIZES.radius * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    width: "80%",
    height: 70,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    // position: "absolute",
    elevation: 5,
    alignSelf: "center",
  },
  action: {
    // borderRadius: 15,
    // borderBottomRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: "#ff01ff",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  //   button: {
  //     height: 75,
  //     width: "100%",
  //     borderColor: "#ffd200",
  //     borderWidth: 2,
  //     borderRadius: 50,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginVertical: 5,
  //     // elevation: 5,
  //     position: "absolute",
  //     alignSelf: "flex-end",
  //   },
  //   buttonContainer: {
  //     height: 75,
  //     width: "20%",
  //     left: 300,
  //     borderRadius: 50,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginVertical: 5,
  //     elevation: 5,
  //     position: "absolute",
  //     bottom: 0,
  //     alignSelf: "flex-end",
  //   },
  infoText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#202020",
  },

  //   DarkOverlay: {
  //     position: "absolute",
  //     top: 0,
  //     right: 0,
  //     left: 0,
  //     height: 270,
  //     backgroundColor: "#000",
  //     opacity: 0.5,
  //     borderBottomRightRadius: 65,
  //   },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },

  text: {
    // fontFamily: "HelveticaNeue",
    color: "#41444B",
  },
  subText: {
    fontSize: 14,
    color: COLORS.black,
    // color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 28,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 22,
    left: 20,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 5,
    right: 0,
    padding: 4,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 5,
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
  mediaVideoContainer: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  // 41444B
  mediaCount: {
    backgroundColor: "#a06262",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 16,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 14,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});