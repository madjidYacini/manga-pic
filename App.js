import React, { Component } from "react";
import axios from "axios";
import { HomeScreen } from "./screens/HomeScreen";
import { Card } from "react-native-elements";
import { YellowBox, TouchableOpacity } from "react-native";

import { CustomPicker } from "react-native-custom-picker";
YellowBox.ignoreWarnings(["Remote debugger"]);
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  Picker,
  Linking,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class App extends Component {
  constructor(props) {
    super(props);
    state = {
      genre: [],
      selectedGenreId: 0,
      selectedGenre: "Select one Type",
      mangaArrayType: [],
      isReady: false
    };
  }

  async componentWillMount() {
    try {
      this.setState({
        genre: [
          "Action",
          "Adventure",
          "Cars",
          "Comedy",
          "Dementia",
          "Demons",
          "Mystery",
          "Drama",
          "Ecchi",
          "Fantasy",
          "Game",
          "Hentai",
          "Historical",
          "Horror"
        ],
        selectedGenreId: 0,
        selectedGenre: "Select one Type"
      });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
  async getMangas(service, id) {
    try {
      let id = this.state.genre.indexOf(service);
      this.setState({
        selectedGenreId: id,
        selectedGenre: service
      });
      let mangaFinalArray = [];
      if (id + 1 > 0) {
        let mangas = await axios.get(
          `https://api.jikan.moe/v3/genre/manga/${id + 1}/1`
        );

        let mangaArray = mangas.data.manga;

        mangaArray.forEach(element => {
          let newSynopsis = element.synopsis.substring(
            0,
            element.synopsis.indexOf("\r")
          );
          let mangaObj = {
            title: element.title,
            image: element.image_url,
            volumes: element.volumes,
            publishing_start: element.publishing_start,
            synopsis: newSynopsis,
            url: element.url
          };
          mangaFinalArray.push(mangaObj);
        });
      } else {
        mangaFinalArray = [];
      }
      this.setState({
        mangaArrayType: mangaFinalArray,
        isReady: true
      });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
  _onPressButton(val) {
    try {
      Alert.alert(
        "View the details",
        "If you want to see more information about this manga, hint OK 😃",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => Linking.openURL(val) }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log("====================================");
      console.log(error.message);
      console.log("====================================");
    }
  }

  render() {
    let ready = this.state.isReady;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#efefef"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            fontSize: 50,
            fontStyle: "italic",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textDecorationStyle: "solid",
            color: "yellow"
          }}
        >
          💫Manga-pic💫
        </Text>
        <CustomPicker
          options={this.state.genre}
          selectedValue={this.state.selectedGenre}
          onValueChange={(service, id) => this.getMangas(service, id)}
          style={{
            alignItems: "center",
            marginTop: 50,
            height: 100,
            width: 100,
            marginLeft: 100
          }}
          style={styles.picker}
        />

        <View style={styles.container}>
          <ScrollView style={{ backgroundColor: "red" }}>
            {ready &&
              this.state.mangaArrayType.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={value => this._onPressButton(item.url)}
                  >
                    <Card
                      title={item.title}
                      borderRadius={5}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "yellow"
                      }}
                    >
                      <Image
                        style={{
                          marginLeft: 50,
                          width: 200,
                          height: 200
                        }}
                        source={{
                          uri: item.image
                        }}
                      />
                      <View style={styles.user}>
                        <Text style={styles.name}>{item.synopsis}</Text>

                        <Text style={styles.name}>
                          Publishing start : {item.publishing_start}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  picker: {
    // flex: 1,
    width: "100%",
    height: 44
  },
  pickerItem: {
    height: 44
  }
});
