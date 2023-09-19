import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const SeriesCard = ({ image, serieId }) => {
  const navigation = useNavigation();

  function handlePress(serieId) {
    navigation.navigate("SingleScreen", {
      serieId,
    });
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={() => handlePress(serieId)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Image source={image} style={styles.image} />
      </Pressable>
    </View>
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  outerContainer: {
    width: "50%",
    padding: 6,
    overflow: "hidden",
  },
  image: {
    height: 300,
  },
  pressed: {
    opacity: 0.7,
  },
});
