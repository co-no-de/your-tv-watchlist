import { StyleSheet, Text, View, ScrollView } from "react-native";
import SeriesCard from "../components/SeriesCard";
import { AntDesign } from "@expo/vector-icons";
import { colors, fonts, series } from "../assets/data";
import ScreenWrapper from "../components/ScreenWrapper";

const HomeScreen = () => {
  const popularSeries = series
    .sort((a, b) => {
      const valA = a.bookmarks;
      const valB = b.bookmarks;

      if (valA > valB) {
        return -1;
      }

      if (valA < valB) {
        return 1;
      }

      return 0;
    })
    .slice(0, 6);

  const highestRatedSeries = series
    .sort((a, b) => {
      const valA = a.imdbRating;
      const valB = b.imdbRating;

      if (valA > valB) {
        return -1;
      }

      if (valA < valB) {
        return 1;
      }

      return 0;
    })
    .slice(0, 6);

  const newSeries = series
    .sort((a, b) => {
      const valA = a.releaseDateSort;
      const valB = b.releaseDateSort;

      if (valA > valB) {
        return -1;
      }

      if (valA < valB) {
        return 1;
      }

      return 0;
    })
    .slice(0, 6);

  return (
    <ScreenWrapper>
      <ScrollView alwaysBounceVertical={false} bounces={false}>
        <View style={styles.category}>
          <Text style={styles.textBig}>Popular</Text>
          <AntDesign name="doubleright" size={20} color={colors.black} />
        </View>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewHorizontal}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
        >
          {popularSeries.map(item => (
            <SeriesCard
              serieId={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              rating={item.imdbRating}
              date={item.releaseDateSort}
            />
          ))}
        </ScrollView>

        <View style={styles.category}>
          <Text style={styles.textBig}>Highest rated</Text>
          <AntDesign name="doubleright" size={20} color={colors.black} />
        </View>

        <ScrollView
          horizontal={true}
          style={styles.scrollViewHorizontal}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
        >
          {highestRatedSeries.map(item => (
            <SeriesCard
              serieId={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              rating={item.imdbRating}
              date={item.releaseDateSort}
            />
          ))}
        </ScrollView>

        <View style={styles.category}>
          <Text style={styles.textBig}>Newest</Text>
          <AntDesign name="doubleright" size={20} color={colors.black} />
        </View>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewHorizontal}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
        >
          {newSeries.map(item => (
            <SeriesCard
              serieId={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              rating={item.imdbRating}
              date={item.releaseDateSort}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  category: {
    textAlign: "center",
    backgroundColor: colors.primaryYellow,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textBig: {
    fontFamily: fonts.primaryFont,
    fontSize: 22,
  },
  scrollViewHorizontal: {
    marginBottom: 18,
  },
});
