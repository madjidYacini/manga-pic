import React, { Component } from "react";
// import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

export class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: "Title",
  //   headerLeft: (
  //     <Icon
  //       containerStyle={styles.icon}
  //       type="ionicon"
  //       name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
  //     />
  //   ),
  //   headerRight: (
  //     <View style={styles.iconContainer}>
  //       <Icon
  //         type="ionicon"
  //         name={Platform.OS === "ios" ? "ios-search" : "md-search"}
  //       />
  //       <Icon
  //         type="ionicon"
  //         name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
  //       />
  //       <Icon
  //         type="ionicon"
  //         name={Platform.OS === "ios" ? "ios-more" : "md-more"}
  //       />
  //     </View>
  //   )
  // };

  render() {
    return (
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  }
}

export default HomeScreen;
