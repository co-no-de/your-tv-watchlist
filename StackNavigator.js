import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SingleScreen, AllSeriesScreen, SearchScreen, WatchListScreen } from './screens'

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="All Series" component={AllSeriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Watchlist" component={WatchListScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="SingleScreen" component={SingleScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;