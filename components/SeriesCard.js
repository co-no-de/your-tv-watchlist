import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";


const SeriesCard = ({ image, serieId }) => {
  const navigation = useNavigation();

  function handlePress(serieId) {
    navigation.navigate("SingleScreen", {
      serieId
    })
  }

  return (
    <Pressable onPress={() => handlePress(serieId)} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>    
    <Image source={image} style={styles.image} />     
    </Pressable>   
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  image: {   
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    resizeMode: "cover",
    flex: 1,
    height: 380,
    width: 190,  
   
  },
  container: {     
    margin: 8
  },
  pressed: {
    opacity: 0.7,
  }
});
