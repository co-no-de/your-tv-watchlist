import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  SingleScreen,
  AllSeriesScreen,
  SearchScreen,
  WatchListScreen,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./assets/data";
import CustomTabBarButton from "./components/CustomTabBarButton";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.gradientEnd,
          tabBarInactiveTintColor: colors.gradientStart,
          tabBarIcon: ({ focused }) => {
            let iconName;
            let iconColor;

            if (route.name === "Home") {
              iconName = focused ? "ios-home-sharp" : "ios-home-outline";
              iconColor = focused ? colors.gradientEnd : colors.gradientStart;
            } else if (route.name === "AllSeries") {
              iconName = focused ? "file-tray-full" : "file-tray-full-outline";
              iconColor = focused ? colors.gradientEnd : colors.gradientStart;
            } else if (route.name === "Search") {
              iconName = focused ? "search-circle" : "search-circle-outline";
              iconColor = focused ? colors.gradientEnd : colors.gradientStart;
            } else if (route.name === "Watchlist") {
              iconName = focused ? "list-circle-sharp" : "list-circle-outline";
              iconColor = focused ? colors.gradientEnd : colors.gradientStart;
            }

            return <Ionicons name={iconName} size={24} color={iconColor} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
            tabBarLabel: "Home",
            tabBarIconStyle: {
              flex: 1,

              height: 30,
              position: "absolute",
              left: 15,
              bottom: -1,
            },
            tabBarLabelStyle: {
              transform: [{ translateY: 10 }],
            },
          }}
        />
        <Tab.Screen
          name="AllSeries"
          component={AllSeriesScreen}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
            tabBarLabel: "All Series",
            tabBarIconStyle: {
              flex: 1,

              height: 30,
              position: "absolute",
              left: 20,
              bottom: -1,
            },
            tabBarLabelStyle: {
              transform: [{ translateY: 10 }],
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,

            tabBarIconStyle: {
              flex: 1,

              height: 30,
              position: "absolute",
              left: 15,
              bottom: -1,
            },
            tabBarLabelStyle: {
              transform: [{ translateY: 10 }],
            },
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchListScreen}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,

            tabBarIconStyle: {
              flex: 1,

              height: 30,
              position: "absolute",
              left: 20,
              bottom: -1,
            },
            tabBarLabelStyle: {
              transform: [{ translateY: 10 }],
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="SingleScreen" component={SingleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;