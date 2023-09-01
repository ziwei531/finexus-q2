import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface Props {
  width: number;
  height: number;
}
function Box(props: Props) {
  const randomColor = () => {
    const color = [
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

    let randColor = color[Math.floor(Math.random() * color.length)];

    return randColor;
  };
  const colors = randomColor();
  const [colorIndex, setColorIndex] = useState(0);

  const getNextColor = () => {
    setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
  };

  return (
    <View
      style={{
        backgroundColor: colors[colorIndex],
        width: props.width,
        height: props.height,
      }}
    />
  );
}

export default Box;
