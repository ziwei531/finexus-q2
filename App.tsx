/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import Box from './reusable/Box';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  ViewStyle,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  // if isInit, the button was initially pressed. if the button is pressed again, should be reversed.
  const [isInit, setIsInit] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [middleButtonColor, setMiddleButtonColor] = useState<string>(
    randomColor(),
  );

  // a new array of colors will be assigned with this function
  const generateColors = (): void => {
    //19 boxes in total
    const newColors: string[] = Array.from({length: 19}, () => randomColor());

    setColors(newColors);
  };

  //total animations are 9.
  const fadeAnims = useRef(
    Array.from({length: 9}, () => new Animated.Value(0)),
  ).current;

  // fade in starts from the start of the index. once all elements are present, the fade out should start at the very end of the index.
  const handleAnimation = () => {
    if (!isInit) {
      setIsInit(true);
      generateColors();

      //fade in
      const animations = fadeAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          delay: index * 1000,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(animations).start();
    } else {
      setIsInit(false);

      //fade out
      const reverseAnimations = fadeAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: 1000,
          delay: (fadeAnims.length - index - 1) * 1000,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(reverseAnimations).start();
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View>
        {/* first row */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[7],
              backgroundColor: colors[0],
              flex: 2,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[8],
              backgroundColor: colors[1],
              flex: 2,
              height: 120,
            }}
          />
        </View>

        {/* second row */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[6],
              backgroundColor: colors[2],
              flex: 1,
              height: 100,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[5],
              backgroundColor: colors[3],
              flex: 2,
              height: 100,
            }}
          />
        </View>

        {/* third row */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[1],
              backgroundColor: colors[4],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[2],
              backgroundColor: colors[5],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[3],
              backgroundColor: colors[6],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[4],
              backgroundColor: colors[7],
              flex: 1,
              height: 120,
            }}
          />
        </View>

        {/* fading in should start here */}
        {/* middle row */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[0],
              backgroundColor: colors[8],
              flex: 1,
              height: 65,
              marginBottom: 35,
            }}
          />
          {/* middle button*/}
          <TouchableOpacity
            style={{
              backgroundColor: middleButtonColor,
              flex: 1,
              height: 100,
            }}
            onPress={handleAnimation}>
            <View />
          </TouchableOpacity>
          <Animated.View
            style={{
              opacity: fadeAnims[0],
              backgroundColor: colors[10],
              flex: 1,
              height: 65,
              marginTop: 35,
            }}
          />
        </View>

        {/* first row after middle */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[4],
              backgroundColor: colors[11],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[3],
              backgroundColor: colors[12],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[2],
              backgroundColor: colors[13],
              flex: 1,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[1],
              backgroundColor: colors[14],
              flex: 1,
              height: 120,
            }}
          />
        </View>

        {/* second row after middle */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[5],
              backgroundColor: colors[15],
              flex: 1,
              height: 100,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[6],
              backgroundColor: colors[16],
              flex: 2,
              height: 100,
            }}
          />
        </View>

        {/* third row after middle */}
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fadeAnims[8],
              backgroundColor: colors[17],
              flex: 2,
              height: 120,
            }}
          />
          <Animated.View
            style={{
              opacity: fadeAnims[7],
              backgroundColor: colors[18],
              flex: 2,
              height: 120,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const randomColorGenerator = (() => {
  const colors = [
    'lightseagreen',
    'firebrick',
    'lightpink',
    'maroon',
    'cornflowerblue',
    'burlywood',
    'darkslateblue',
    'lightcoral',
    'orange',
    'darksalmon',
  ];

  //randomize the array on every new execution
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(colors);
  let availableColors = [...colors];
  let currentIndex = 0;

  return () => {
    //if reached the end already, assign colors the beginning again
    if (currentIndex >= availableColors.length) {
      availableColors = [...colors];
      currentIndex = 0;
    }

    const selectedColor = availableColors[currentIndex];
    currentIndex++;
    return selectedColor;
  };
})();

const randomColor = () => {
  return randomColorGenerator();
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  styleMiddle: {
    width: 140,
    height: 100,
    backgroundColor: randomColor(),
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
