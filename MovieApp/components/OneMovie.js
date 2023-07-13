import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { MovieContext } from './MovieContext'

const { width, height } = Dimensions.get('window')

const OneMovie = () => {
  const { params } = useRoute()
  const { film } = params
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)
  const { movies, setMovies } = useContext(MovieContext)

  // function that adds or removes the movie from favorites
  const handleToggleFavorite = () => {
    if (isFavorite) {
      const updatedMovies = movies.filter((movie) => movie.id !== film.id)
      setMovies(updatedMovies)
      setIsFavorite(false)
      Alert.alert('Removed from favorites')
    } else {
      setMovies([...movies, film])
      setIsFavorite(true)
      Alert.alert('Added to favorites')
    }
  }

  // check if the movie is already in the favorites
  useEffect(() => {
    setIsFavorite(movies.some((movie) => movie.id === film.id))
  }, [movies, film])

  // create the button in the right side of the header to add/remove the movie from favorites
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? 'red' : 'black'}
          style={{ marginRight: 10 }}
          onPress={handleToggleFavorite}
        />
      ),
    })
  }, [navigation, isFavorite, handleToggleFavorite])

  // get the genres of the movie from the API
  const [filmtype, setFilmType] = useState([])

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MThmNzU2ZjU2OGNjMWVmYjg4NzEwZmU1YWM2ZTI1OCIsInN1YiI6IjY0YWRhMDA1M2UyZWM4MDEwZGFkOTNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k3fYJOozqOVOd794I5t2R6XBfPhxuGOsN9HLTFJ8mtE',
    },
  }

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        const newFilmType = response.data.genres
          .filter((genre) => film.genre_ids.includes(genre.id))
          .map((genre) => genre.name)
        setFilmType((prevFilmType) => [...prevFilmType, ...newFilmType])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const releaseDate = new Date(film.release_date).toLocaleDateString()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/w500' + film.poster_path }}
          style={styles.poster}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleRatingContainer}>
            <Text style={styles.title}>{film.title}</Text>
            <Text style={styles.rating}>{film.vote_average}</Text>
          </View>
          <Text style={styles.releaseDate}>{releaseDate}</Text>
          <View style={styles.genreContainer}>
            {filmtype.map((genre) => (
              <Text key={genre} style={[styles.genre, { flex: 0, minWidth: 50 }]}>
                {genre}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.overviewTitle}>Overview</Text>
        <View style={styles.overviewContainer}>
          <Text style={styles.overview}>{film.overview}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10
  },
  posterContainer: {
    position: 'relative',
    marginBottom: 10
  },
  poster: {
    height: height*0.7  ,
    width: width,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-end'
  },
  titleRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow'
  },
  releaseDate:{
    fontSize: 16,
    color: 'white'
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  genre: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 2,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center'
  },
  overviewContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify'
  }
})

export default OneMovie