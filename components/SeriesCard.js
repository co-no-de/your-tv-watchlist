import { StyleSheet, Pressable, useWindowDimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

function useStyles() {
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    image: {      
      height: width > 400 ? 280 : 380,
      width: width > 400 ? 155 : 190,     
    },
    container: {
      margin: 8,     
    },
    pressed: {
      opacity: 0.7,
    },
    innerContainer: {
      elevation: 5,
      backgroundColor: 'black'
    },
  });
}

const SeriesCard = ({ image, serieId }) => {
  const styles = useStyles();

  const navigation = useNavigation();

  function handlePress(serieId) {
    navigation.navigate("SingleScreen", {
      serieId,
    });
  }

  return (
    <Pressable
      onPress={() => handlePress(serieId)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.innerContainer}>
      <Image source={image} style={styles.image} />
      </View>
    
    </Pressable>
  );
};

export default SeriesCard;
