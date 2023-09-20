import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { colors, series, fonts, userStorage } from '../assets/data'
import ScreenWrapper from "../components/ScreenWrapper";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/BackButton";

const SingleScreen = ({ route, navigation }) => {  
  const [bookmarks, setBookmarks] = useState([])

  const { serieId } = route.params;
  const serie = series.find(item => item.id === serieId);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function getLocalStorageData() {
        let localUserSeriesString = await AsyncStorage.getItem(userStorage)
        let localUserArray = await JSON.parse(localUserSeriesString)
        setBookmarks(localUserArray)
      }
      getLocalStorageData();    
    });   
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    async function getLocalData() {
      const localUserSeriesArray = await AsyncStorage.getItem(userStorage);
      if (!localUserSeriesArray) {
        let userSeriesArray = [];       
        await AsyncStorage.setItem(userStorage, JSON.stringify(userSeriesArray));      
    }   
       }
  
    getLocalData();
  }, []);

  async function addBookmark() {
    try {
      let localUserSeriesArray = await AsyncStorage.getItem(userStorage);
      let temp = await JSON.parse(localUserSeriesArray)
      temp.push(serieId)
      await AsyncStorage.setItem(userStorage, JSON.stringify(temp)); 
      setBookmarks(temp)
      
    } catch (error) {
      console.log(error)
    }
  }

  async function removeBookmark() {
   try {
    let localUserSeriesArray = await AsyncStorage.getItem(userStorage);
    let temp = await JSON.parse(localUserSeriesArray)
    temp = temp.filter(item => item != serieId)
    await AsyncStorage.setItem(userStorage, JSON.stringify(temp));
    setBookmarks(temp)
    } catch (error) {
    console.log(error)
   }
  }

  return (
    <ScreenWrapper>
      <ScrollView alwaysBounceVertical={false} bounces={false}>
        <BackButton />
        <View style={styles.imageOuterContainer}>
          <View style={styles.imageInnerContainer}>
            <Image
              contentFit="cover"
              source={serie.image}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.addToWatchlistContainer}>
          {bookmarks && bookmarks.includes(serieId) ? (
            <Pressable onPress={removeBookmark} style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.pressable}>
                <Text style={styles.pressableText}>
                  Remove from your watchlist
                </Text>
                <AntDesign
                  name="heart"
                  size={18}
                  color={colors.primaryYellow}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={addBookmark} style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.pressable}>
                <Text style={styles.pressableText}>Add to your watchlist</Text>

                <AntDesign
                  name="hearto"
                  size={18}
                  color={colors.primaryYellow}
                />
              </View>
            </Pressable>
          )}
        </View>
        <Text style={styles.seriesTitle}>{serie.title}</Text>
        <Text style={styles.year}>{serie.releaseDate.slice(6, 10)}</Text>
        <Text style={styles.year}>IMDB rating: {serie.imdbRating}</Text>
        <View style={styles.actorsContainer}>
          {serie.cast.map((item, index) => (
            <View key={index} style={styles.actorContainer}>
              <Text style={styles.actor} key={index}>
                {item}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{serie.description}</Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SingleScreen;

const styles = StyleSheet.create({
  imageOuterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageInnerContainer: {
    height: 500,
    marginTop: 20,
    width: "80%",
  },
  image: {
    flex: 1
  },
  addToWatchlistContainer: {
    paddingVertical: 4,
    marginTop: 6,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableText: {
    color: colors.primaryYellow,
    marginRight: 5,
    fontFamily: fonts.primaryFontLight

  },
  pressed: {
    opacity: 0.7,
  },
  seriesTitle: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 2,
    fontFamily: fonts.primaryFont,
    color: colors.primaryYellow,
  },
  year: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.primaryFont,
    color: colors.primaryYellow,
  },
  actorsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  actorContainer: {
    borderRadius: 6,
    overflow: 'hidden', 
    padding: 4,  
    backgroundColor: colors.primaryYellow,
    justifyContent: 'center',
    alignItems: 'center'  
  },

  actor: {
    fontFamily: fonts.primaryFont,   
  },


  descriptionContainer: {
    padding: 10,
    marginTop: 10,
  },
  description: {
    fontFamily: fonts.primaryFontLight,
    color: colors.primaryYellow,
  },
});
