import { View, Text, StyleSheet,ScrollView } from 'react-native'
import React , {useContext} from 'react'
import MovieCard from './MovieCard'
import { MovieContext } from './MovieContext'
const Favorit = () => {
    const { movies, setMovies } = useContext(MovieContext);
  
    if (movies.length === 0) {
      return (
        <View style={styles.container}>
          <Text>You don't have any favorite movies yet.</Text>
        </View>
      )
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {movies.map((movie, i) => {
          if (i % 2 === 0) {
            return (
              <View key={i} style={styles.cardContainer}>
                <MovieCard film={movie}/>
                {movies[i + 1] &&
                <MovieCard film={movies[i + 1]}/>
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
})
export default Favorit