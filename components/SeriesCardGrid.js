import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const SeriesCardGrid = ({ image, serieId }) => {
  const navigation = useNavigation();

  function handlePress(serieId) {
    navigation.navigate("SingleScreen", {
      serieId,
    });
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
      <Pressable
        onPress={() => handlePress(serieId)}
        style={[({ pressed }) => pressed && styles.pressed]}
      >
        <Image source={image} style={styles.image} />
      </Pressable>
      </View>
    
    </View>
  );
};

export default SeriesCardGrid;

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
  innerContainer: {  
    elevation: 3,
    backgroundColor: 'black'
  },
});
