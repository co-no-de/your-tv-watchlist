import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { colors, fonts } from '../assets/data'

const SearchResult = ({ id, title, image, description }) => {
  const navigation = useNavigation();

  function navigateToSingle(id) {
    navigation.navigate("SingleScreen", {
      serieId: id
    });
  }

  return (
    <Pressable style={styles.pressable} onPress={() => navigateToSingle(id)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primaryYellow,
    height: 130,
  },
  imageContainer: {
    flex: 2,
  },
  textContainer: {
    flex: 8,
    padding: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.primaryFont,
  },
  text: {
    fontFamily: fonts.primaryFontLight,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  pressable: {
    marginBottom: 18,
  },
});
