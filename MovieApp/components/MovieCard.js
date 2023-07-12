import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-stock-star-rating'
import { useNavigation } from '@react-navigation/native'
const MovieCard = ({film}) => {
    const navigation = useNavigation()
    const handleCardPress = (film) => {
        navigation.navigate('OneMovie', {film})
      }
  return (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(film)}>
    <Image source={{ uri: 'https://image.tmdb.org/t/p/w500'+film.poster_path }} style={styles.poster} resizeMode="contain" />
    <Text style={styles.title} numberOfLines={1}>{film.title}</Text>
    <Rating stars={film.vote_average} maxStars={10} size={12} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
      poster: {
        height: 200,
        width:'100%'
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 5
      }
})
export default MovieCard