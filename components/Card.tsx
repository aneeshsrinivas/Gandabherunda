import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');

interface CardProps {
  title: string;
  image: string;
  [key: string]: any;
}

const Card = ({ title, image, ...rest }: CardProps) => {
  return (
    <View style={styles.card} {...rest}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.4,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Card;
