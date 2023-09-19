import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";


export default function App() {

  const [fontsLoaded] = useFonts({
    "Tajawal-Bold": require("./assets/fonts/Tajawal-Bold.ttf"),
    Tajawal: require("./assets/fonts/Tajawal-Regular.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>     
      <StackNavigator />
      <StatusBar style="light" />   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
