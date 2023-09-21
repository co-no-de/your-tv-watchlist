import { StyleSheet, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../assets/data'
import Header from './Header'


const ScreenWrapper = ({ children }) => {
  return (
    <View style={styles.mainContainer}>
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Header />
      {children}

    </LinearGradient>
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  gradient: {
    paddingVertical: 12,
    flex: 1,
  },
})