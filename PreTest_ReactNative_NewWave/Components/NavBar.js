import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { DIMENSIONS } from '../Styles/Dimensions';

export default function NavBar() {
  return (
    <TouchableOpacity style={navBarStyles.container}>
      <Image style={navBarStyles.backButton} source={require('../Images/leftArrow.png')} />
      <Text style={navBarStyles.content}>Back</Text>
    </TouchableOpacity>
  );
}

const navBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: DIMENSIONS.screenWidth / 45,
    paddingTop: DIMENSIONS.screenWidth / 35
  },
  backButton: {
    width: DIMENSIONS.screenWidth / 11,
    height: DIMENSIONS.screenWidth / 11,
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
