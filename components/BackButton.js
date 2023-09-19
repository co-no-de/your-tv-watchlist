import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors, fonts } from "../assets/data";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.backButtonContainer}>
        <AntDesign
          name="back"
          size={24}
          color={colors.primaryYellow}
          style={styles.icon}
        />
        <Text style={styles.text}>Go back</Text>
      </View>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: fonts.primaryFont,
    color: colors.primaryYellow,
  },
  pressed: {
    opacity: 0.7,
  },
});
