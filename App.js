import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import StackNavigator from "./StackNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { userStorage } from "./assets/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Tajawal-Bold": require("./assets/fonts/Tajawal-Bold.ttf"),
    Tajawal: require("./assets/fonts/Tajawal-Regular.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {

      let localUserSeriesString = await AsyncStorage.getItem(userStorage);
      let localUserArray = await JSON.parse(localUserSeriesString);

      if(localUserArray.length === 0) {
        let startArray = [];
        await AsyncStorage.setItem(userStorage, JSON.stringify(startArray));
      }

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
      <ModalPortal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
