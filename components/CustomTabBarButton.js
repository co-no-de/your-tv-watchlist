import { StyleSheet, View, Pressable } from "react-native";
import { colors } from "../assets/data";
import * as Animatable from 'react-native-animatable';

const CustomTabBarButton = props => {
  const { children, accessibilityState, onPress } = props;

  if (accessibilityState.selected) {
    return (
      <Animatable.View animation="zoomIn" duration={400} style={styles.btnWrapper}>
        <Pressable onPress={onPress} style={styles.activeBtn}>
          <View>{children}</View>
        </Pressable>
      </Animatable.View>
    );
  } else {
    return (
      <View style={styles.btnWrapper}>
        <Pressable onPress={onPress}>{children}</Pressable>
      </View>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  activeBtn: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    backgroundColor: colors.white,   
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.gradientEnd,
    transform: [{ translateY: -30 }],
  },
  btnWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});