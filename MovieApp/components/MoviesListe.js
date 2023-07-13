import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const MoviesListe = () => {
  const API_KEY = "418f756f568cc1efb88710fe5ac6e258"
  const [films, setFilms] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        setFilms(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFavorites = () => {
    navigation.navigate('Favorit')
  }

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search for a movie"
        />
        <TouchableOpacity onPress={handleFavorites}>
          <Ionicons name="heart" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {filteredFilms.map((film, i) => {
        if (i % 2 === 0) {
          return (
            <View key={i} style={styles.cardContainer}>
              <MovieCard film={film}/>
              {filteredFilms[i + 1] &&
              <MovieCard film={filteredFilms[i + 1]}/>
              }
            </View>
          )
        }
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 5,
  }
})

export default MoviesListe