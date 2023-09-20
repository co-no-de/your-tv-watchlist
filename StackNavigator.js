import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SingleScreen, AllSeriesScreen, SearchScreen, WatchListScreen } from './screens'
import { Ionicons } from "@expo/vector-icons";
import { colors } from './assets/data'

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator   screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          width: "100%",
          alignItems: "center",
        },
      
        tabBarIcon: ({ focused }) => {
          let iconName;
         

          if (route.name === "Home" ) {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
         
          } else if (route.name === "All Series") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
         
          } else if (route.name === "Search") {
            iconName = focused ? "search-circle" : "search-circle-outline";
         
          } else if (route.name === "Watchlist") {
            iconName = focused
              ? "list-circle-sharp"
              : "list-circle-outline";
         
          }

          return <Ionicons
          name={iconName}
          size={24}
          color={colors.gradientEnd}
        />
        },
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="All Series" component={AllSeriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Watchlist" component={WatchListScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
       headerShown: false,
    }}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="SingleScreen" component={SingleScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;