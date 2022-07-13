import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {DIMENSIONS} from '../Styles/Dimensions';

export default function Item({image}) {
  return (
    <Image
      style={itemStyles.img}
      source={{
        uri: image,
      }}
    />
  );
}

const itemStyles = StyleSheet.create({
  img: {
    width: DIMENSIONS.screenWidth / 2.4,
    height: DIMENSIONS.screenHeight / 3,
    margin: DIMENSIONS.screenWidth / 32,
    borderRadius: 10,
  },
});
