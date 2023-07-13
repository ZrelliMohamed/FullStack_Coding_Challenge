import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-stock-star-rating';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MovieCard = ({ film, onDelete }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('OneMovie', { film });
  };

  const handleDeletePress = () => {
    onDelete(film);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <View style={styles.posterContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }} style={styles.poster} resizeMode="contain" />
        {onDelete &&<TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>}
      </View>
      <Text style={styles.title} numberOfLines={1}>{film.title}</Text>
      <Rating stars={film.vote_average} maxStars={10} size={12} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  posterContainer: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  poster: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
});

export default MovieCard;