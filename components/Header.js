import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/img/logo.png")} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 120,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 18,
  },
  logo: {
    height: 60,
    width: 255,
  },
});