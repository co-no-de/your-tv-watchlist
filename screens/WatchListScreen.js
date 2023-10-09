import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, series, fonts, userStorage } from "../assets/data";
import { FontAwesome } from "@expo/vector-icons";
import Pagination from "../components/Pagination";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SeriesCardGridWatchlist from "../components/SeriesCardGridWatchlist";

const WatchListScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [bookmarks, setBookmarks] = useState([]);

  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;
  let bookmarkedSeries = series.filter(item => bookmarks.includes(item.id));
  let currentPosts = bookmarkedSeries.slice(firstPostIndex, lastPostIndex);

  if (!currentPosts.length === 0) {
    currentPosts = bookmarkedSeries;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getLocalStorageData() {
        let localUserSeriesString = await AsyncStorage.getItem(userStorage);
        let localUserArray = await JSON.parse(localUserSeriesString);
        console.log(localUserArray);

        if (!localUserArray) {
          setBookmarks([]);
        } else {
          setBookmarks(localUserArray);
        }
      }
      getLocalStorageData();
    });
    return unsubscribe;
  }, [navigation]);

  function navigateToAllSeries() {
    navigation.navigate("AllSeries");
  }

  async function removeBookmark(serieId) {
    try {
      let localUserSeriesArray = await AsyncStorage.getItem(userStorage);
      let temp = await JSON.parse(localUserSeriesArray);
      temp = temp.filter(item => item != serieId);
      await AsyncStorage.setItem(userStorage, JSON.stringify(temp));
      setBookmarks(temp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.seriesMainContainer}
        alwaysBounceVertical={false}
        bounces={false}
      >
        <View style={styles.seriesContainer}>
          {currentPosts.map(item => (
            <View key={item.id} style={styles.serieContainer}>
              <SeriesCardGridWatchlist
                serieId={item.id}
                title={item.title}
                image={item.image}
                rating={item.imdbRating}
                date={item.releaseDateSort}
              />
              <View style={styles.removeContainer}>
                <Pressable
                  onPress={() => removeBookmark(item.id)}
                  style={styles.removePressable}
                >
                  <Text style={styles.removeText}>Remove from watchlist</Text>
                  <FontAwesome
                    name="remove"
                    size={18}
                    color={colors.primaryYellow}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
        {currentPosts.length > 8 ||
          (bookmarkedSeries.length > 8 && (
            <Pagination
              totalPosts={bookmarkedSeries.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          ))}

        {bookmarks.length === 0 && (
          <View>
            <Text style={styles.goToAllSeriesText}>
              Add shows to your watchlist to view them here!
            </Text>
            <View style={styles.pressableContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.allSeriesPressable,
                  pressed && styles.pressed,
                ]}
                onPress={navigateToAllSeries}
              >
                <Text style={styles.allSeriesPressableText}>
                  View all series
                </Text>
              </Pressable>
            </View>
          </View>
        )}
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
    flexWrap: "wrap",
  },
  serieContainer: {
    width: "50%",
  },
  goToAllSeriesText: {
    fontFamily: fonts.primaryFont,
    color: colors.primaryYellow,
    textAlign: "center",
  },
  pressableContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  allSeriesPressableText: {
    color: colors.primaryYellow,
    fontFamily: fonts.primaryFont,
  },
  allSeriesPressable: {
    borderWidth: 2,
    borderColor: colors.primaryYellow,
    padding: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  removeContainer: {
    alignItems: "center",
  },
  removePressable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: colors.primaryYellow,
    fontFamily: fonts.primaryFontLight,
    marginRight: 5,
  },
});
