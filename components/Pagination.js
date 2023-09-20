import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors, fonts } from '../assets/data'

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <View style={styles.paginationContainer}>
      {pages.map((page, index) => (
        <Pressable
          style={[styles.pressable, page === currentPage && styles.current]}
          key={index}
          onPress={() => setCurrentPage(page)}
        >
          <Text
            style={[
              styles.text,
              page === currentPage ? styles.currentText : {},
            ]}
          >
            {page}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pressable: {
    borderColor: colors.primaryYellow,
    borderWidth: 2,
    height: 25,
    width: 25,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  current: { backgroundColor: colors.primaryYellow },
  text: {
    color: colors.primaryYellow,
    fontFamily: fonts.primaryFontLight
  },    
  currentText: {
    color: colors.black,
  },
  paginationContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
