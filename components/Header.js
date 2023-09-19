import { StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../assets/data'
import { Image } from "expo-image";


const Header = () => {
  return (
    <LinearGradient
    colors={[colors.gradientStart, colors.gradientEnd]}
    style={styles.header}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <Image source={require("../assets/img/logo.png")} style={styles.logo} />
  </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    height: 120,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8
  },
  logo: {
    height: 60,
    width: 255
  }
});