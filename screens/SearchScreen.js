import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";
import { colors, series, fonts } from '../assets/data'
import ScreenWrapper from "../components/ScreenWrapper";

const SearchScreen = () => {
 
  const [input, setInput] = useState("");
  const [displayedSeries, setDisplayedSeries] = useState([]);

  useEffect(() => {
    if (input.length > 2) {
      let seriesToDisplayArray = [];

      series.forEach(item => {
        if (item.title.toLowerCase().includes(input.toLowerCase())) {
          seriesToDisplayArray.push(item);
          return;
        } else {
          item.cast.forEach(castMember => {
            if (castMember.toLowerCase().includes(input.toLowerCase() )) {
              seriesToDisplayArray.push(item);
              return;
            }
          });
        }
      });

      let seriesToDisplayArrayUnique = Array.from(
        new Set(seriesToDisplayArray)
      );

      setDisplayedSeries(seriesToDisplayArrayUnique);
    } else {
      setDisplayedSeries([]);
    }
  }, [input]);

  return (
   <ScreenWrapper>
          <View style={styles.searchContainer}>
        <TextInput
          value={input}
          placeholder="Search for title or actor"
          placeholderTextColor={colors.black}
          onChangeText={text => setInput(text)}
          fontFamily={fonts.primaryFont}                        
              theme={{ fonts: { regular: fonts.primaryFont } }}
        />
        <Feather name="search" size={24} color={colors.primaryYellow} />
      </View>
      <ScrollView style={styles.scrollViewContainer} alwaysBounceVertical={false} bounces={false}>
        {displayedSeries?.map(item => (
          <SearchResult
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
          />
        ))}
          <View style={{height: 25}}></View>
      </ScrollView>
   </ScreenWrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: colors.primaryYellow,
    borderWidth: 4,
  },
  scrollViewContainer: {
    padding: 10,
  },
  mainContainer: {
    flex: 1,
  },
  gradient: {
    paddingVertical: 12,
    flex: 1,
  },
});