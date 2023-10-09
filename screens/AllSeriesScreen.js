import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";
import SeriesCardGrid from "../components/SeriesCardGrid";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import Pagination from "../components/Pagination";
import { colors, fonts, series } from '../assets/data'
import ScreenWrapper from "../components/ScreenWrapper";

const AllSeriesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Alphabetical ASC");
  const [displayedSeries, setDisplayedSeries] = useState(series);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minimalRating, setMinimalRating] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const filters = [
    { id: 0, filter: "Most recent" },
    { id: 1, filter: "Least recent" },
    { id: 2, filter: "Highest rated" },
    { id: 3, filter: "Lowest rated" },
    { id: 4, filter: "Most bookmarked" },
    { id: 5, filter: "Alphabetical ASC" },
    { id: 6, filter: "Alphabetical DESC" },
  ];

  let toBeSortedFiltered = [...series];

  let categoryFilters = getCategories();

  let yearFilters = getReleaseYears();

  function getCategories() {
    let tempCategoryArray = [];
    series.map(serie => {
      let category = serie.category.split(" ");
      category.forEach(category => {
        if (!tempCategoryArray.includes(category) && category != "") {
          tempCategoryArray.push(category);
        }
      });
    });

    return tempCategoryArray;
  }

  function getReleaseYears() {
    let tempReleaseYearsArray = [];
    series.map(serie => {
      let year = serie.releaseDate.slice(6, 10);

      if (!tempReleaseYearsArray.includes(year)) {
        tempReleaseYearsArray.push(year);
      }
    });

    return tempReleaseYearsArray;
  }

  useLayoutEffect(() => {
    toBeSortedFiltered = toBeSortedFiltered.sort((a, b) => {
      const valA = a.title;
      const valB = b.title;

      if (valA < valB) {
        return -1;
      }

      if (valA > valB) {
        return 1;
      }

      return 0;
    });

    setDisplayedSeries(toBeSortedFiltered);
  }, []);

  function applyFilter() {
    if (selectedYear != "") {
      toBeSortedFiltered = toBeSortedFiltered.filter(item =>
        item.releaseDate.includes(selectedYear)
      );
    }

    if (selectedCategory != "") {
      toBeSortedFiltered = toBeSortedFiltered.filter(item =>
        item.category.includes(selectedCategory)
      );
    }

    if (minimalRating != null) {
      toBeSortedFiltered = toBeSortedFiltered.filter(
        item => item.imdbRating >= minimalRating
      );
    }

    switch (selectedFilter) {
      case "Most recent":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.releaseDateSort;
          const valB = b.releaseDateSort;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Least recent":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.releaseDateSort;
          const valB = b.releaseDateSort;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Highest rated":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.imdbRating;
          const valB = b.imdbRating;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Lowest rated":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.imdbRating;
          const valB = b.imdbRating;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Most bookmarked":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.bookmarks;
          const valB = b.bookmarks;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Alphabetical ASC":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.title;
          const valB = b.title;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Alphabetical DESC":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.title;
          const valB = b.title;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
    }

    setDisplayedSeries(toBeSortedFiltered);

    setModalVisible(false);
  }

  function resetFilters() {
    setSelectedYear("");
    setMinimalRating(null);
    toBeSortedFiltered = [...series];
    switch (selectedFilter) {
      case "Most recent":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.releaseDateSort;
          const valB = b.releaseDateSort;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Least recent":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.releaseDateSort;
          const valB = b.releaseDateSort;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Highest rated":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.imdbRating;
          const valB = b.imdbRating;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Lowest rated":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.imdbRating;
          const valB = b.imdbRating;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Most bookmarked":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.bookmarks;
          const valB = b.bookmarks;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Alphabetical ASC":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.title;
          const valB = b.title;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Alphabetical DESC":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.title;
          const valB = b.title;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
    }
    setDisplayedSeries(toBeSortedFiltered);
    setModalVisible(false);
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = displayedSeries.slice(firstPostIndex, lastPostIndex);

  return (
    <ScreenWrapper>
         <Pressable style={styles.mainPressable}>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.childPressable}
          >
            <Octicons
              name="arrow-switch"
              size={24}
              color={colors.primaryYellow}
            />
            <Text style={styles.pressableText}>Sort</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.childPressable}
          >
            <Ionicons name="filter" size={24} color={colors.primaryYellow} />
            <Text style={styles.pressableText}>Filter</Text>
          </Pressable>
        </Pressable>

        <ScrollView style={styles.seriesMainContainer} alwaysBounceVertical={false} bounces={false}>
          <View style={styles.seriesContainer}>
            {currentPosts.map(item => (
              <SeriesCardGrid
              serieId={item.id}
                key={item.id}
                title={item.title}
                image={item.image}
                rating={item.imdbRating}
                date={item.releaseDateSort}
              />
            ))}
          </View>
          {displayedSeries.length > 8 && (
            <Pagination
              totalPosts={displayedSeries.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </ScrollView>

        <BottomModal
          swipeThreshold={200}
          onBackDropPress={() => setModalVisible(!modalVisible)}
          swipeDirection={["up", "down"]}
          footer={
            <ModalFooter>
              <Pressable
                onPress={() => applyFilter()}
                style={styles.modalPressable}
              >
                <Text>Apply</Text>
              </Pressable>
            </ModalFooter>
          }
          modalTitle={<ModalTitle title="Filter and sort"  />}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          onHardwareBackPress={() => setModalVisible(!modalVisible)}
          visible={modalVisible}
          onTouchOutside={() => setModalVisible(!modalVisible)}
        >
          <ModalContent style={styles.modalContent}>
            <View style={styles.modalContentMainView}>
              <View style={styles.modalContentLeft}>
                <Text style={styles.modalTexts}>Filter</Text>
                <Text>Year</Text>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={itemValue => setSelectedYear(itemValue)}
                >
                  <Picker.Item label="Year" value="" />
                  {yearFilters.map((year, index) => (
                     <Picker.Item key={index} label={year} value={year} />
                  ))}         
                </Picker>
                <Text>Category</Text>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={itemValue => setSelectedCategory(itemValue)}
                >
                  <Picker.Item label="Category" value="" />
                  {categoryFilters.map((category, index) => (
                     <Picker.Item key={index} label={category} value={category} />
                  ))}                  
                </Picker>
                <Text>Minimal rating: {minimalRating ? minimalRating : 0}</Text>

                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={10}
                  minimumTrackTintColor={colors.darkGrey}
                  maximumTrackTintColor={colors.darkGrey}
                  step={0.5}
                  value={minimalRating}
                  onValueChange={value => setMinimalRating(value)}
                />

                <Pressable onPress={() => resetFilters()}>
                  <View style={styles.resetContainer}>
                    <Text style={styles.resetText}>Reset filters</Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.modalContentRight}>
                <Text style={styles.modalTexts}>Sort</Text>
                {filters.map(filter => (
                  <Pressable
                    key={filter.id}
                    style={styles.filterPressable}
                    onPress={() => setSelectedFilter(filter.filter)}
                  >
                    {selectedFilter.includes(filter.filter) ? (
                      <Entypo
                        name="circle-with-plus"
                        size={16}
                        color={colors.black}
                        style={styles.filterIcon}
                      />
                    ) : (
                      <Entypo
                        name="circle"
                        size={16}
                        color={colors.black}
                        style={styles.filterIcon}
                      />
                    )}

                    <Text>{filter.filter}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ModalContent>
        </BottomModal>
        <View style={{height: 25}}></View>
    </ScreenWrapper>
   
     
     
  );
};

export default AllSeriesScreen;

const styles = StyleSheet.create({
  mainPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  childPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    fontSize: 15,
    fontFamily: fonts.primaryFont,
    marginLeft: 8,
    color: colors.primaryYellow,
  },
  seriesMainContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  seriesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalPressable: {
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  modalContent: {
    width: "100%",
    height: 300,
  },
  modalContentMainView: {
    flexDirection: "row",
  },
  modalContentLeft: {
    marginVertical: 10,
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.black,
  },
  modalContentRight: {
    flex: 1,
    marginVertical: 10,
  },
  modalTexts: {
    textAlign: "center",
  },
  filterPressable: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 6,
  },
  filterIcon: {
    marginRight: 6,
  },
 
  resetContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resetText: {
    padding: 8,
    backgroundColor: colors.red,
    borderRadius: 8,
  },
});
