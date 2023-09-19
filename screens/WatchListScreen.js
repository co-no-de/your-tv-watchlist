import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, series, fonts } from '../assets/data'
import SeriesCardGrid from "../components/SeriesCardGrid";
import Pagination from "../components/Pagination";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userStorage = "userStorageData";

const WatchListScreen = ({ navigation }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [bookmarks, setBookmarks] = useState([])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const bookmarkedSeries = series.filter(item => bookmarks.includes(item.id))
  const currentPosts = bookmarkedSeries.slice(firstPostIndex, lastPostIndex);

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


  function navigateToAllSeries() {
    navigation.navigate("AllSeries")
  }

  return (
    <ScreenWrapper>
      <ScrollView style={styles.seriesMainContainer} alwaysBounceVertical={false} bounces={false}>
        <View style={styles.seriesContainer}>
          {currentPosts.map(item => (
            <SeriesCardGrid
            serieId={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              rating={item.imdbRating}
              date={item.releaseDateSort}
            />
          ))}
           
        </View>
        {bookmarkedSeries.length > 8 && (
          <Pagination
            totalPosts={bookmarkedSeries.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}


        {bookmarks.length === 0 && <View>
          <Text style={styles.goToAllSeriesText}>Add shows to your watchlist to view them here!</Text>
          <View style={styles.pressableContainer}>
          <Pressable style={({ pressed }) => [styles.allSeriesPressable, pressed && styles.pressed]} onPress={navigateToAllSeries}>
            <Text style={styles.allSeriesPressableText}>
              View all series
            </Text>
          </Pressable>
          </View>
         
          </View>}
       
      </ScrollView>
    </ScreenWrapper>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
 
 
 
  seriesMainContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  seriesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap" 
  },
  goToAllSeriesText: {
    fontFamily: fonts.primaryFont,
    color: colors.primaryYellow,
    textAlign: 'center'
  },
  pressableContainer: {
    alignItems: 'center',
    marginTop: 25
  },
  allSeriesPressableText: {
    color: colors.primaryYellow,
    fontFamily: fonts.primaryFont
  },
  allSeriesPressable: {
    borderWidth: 2,
    borderColor: colors.primaryYellow,
    padding:20,  
  },
  pressed: {
    opacity: 0.7
  }
});