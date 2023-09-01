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

type FadeInViewProps = PropsWithChildren<{
  style: ViewStyle;
  duration?: number; // New duration prop
}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const {style, duration = 1000, children} = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration, // Use the custom duration
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={{...style, opacity: fadeAnim}}>
      {children}
    </Animated.View>
  );
};

function App(): JSX.Element {
  const [isVisible, setVisible] = useState(false);

  const handleMiddlePress = () => {
    setVisible(!isVisible);
  };

  return (
    <SafeAreaView style={styles.styleBg}>
      {!isVisible ? (
        <TouchableOpacity
          onPress={handleMiddlePress}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.styleMiddle} />
        </TouchableOpacity>
      ) : (
        <View>
          {/* first row */}
          <FadeInView style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 250, height: 100}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 150, height: 100}}
            />
          </FadeInView>

          {/* second row */}
          <FadeInView duration={2000} style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 150, height: 100}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 250, height: 100}}
            />
          </FadeInView>

          {/* third row */}
          <FadeInView duration={3000} style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
          </FadeInView>

          {/* middle row */}
          <View style={styles.container}>
            <FadeInView
              duration={4000}
              style={{
                backgroundColor: randomColor(),
                width: 120,
                height: 65,
                marginBottom: 35,
              }}
            />
            {/* middle button*/}
            <TouchableOpacity onPress={handleMiddlePress}>
              <View
                style={[styles.styleMiddle, {backgroundColor: randomColor()}]}
              />
            </TouchableOpacity>
            <FadeInView
              duration={4000}
              style={{
                backgroundColor: randomColor(),
                width: 120,
                height: 65,
                marginTop: 35,
              }}
            />
          </View>

          {/* first row after middle */}
          <FadeInView duration={5000} style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 90, height: 120}}
            />
          </FadeInView>

          {/* second row after middle */}
          <FadeInView duration={6000} style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 250, height: 130}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 150, height: 130}}
            />
          </FadeInView>

          {/* third row after middle */}
          <FadeInView duration={7000} style={styles.container}>
            <View
              style={{backgroundColor: randomColor(), width: 150, height: 100}}
            />
            <View
              style={{backgroundColor: randomColor(), width: 250, height: 100}}
            />
          </FadeInView>
        </View>
      )}
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
  styleBg: {
    flex: 1,
    backgroundColor: 'white',
  },

  styleMiddle: {
    width: 120,
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
