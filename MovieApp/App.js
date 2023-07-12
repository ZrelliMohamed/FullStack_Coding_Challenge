import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Movie = createNativeStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import MoviesListe from './components/MoviesListe';
import OneMovie from './components/OneMovie';
import Favorit from './components/Favorit';
import { MovieProvider } from './components/MovieContext';
export default function App() {
  return (
    <MovieProvider>
      <NavigationContainer>
        <Movie.Navigator>
          <Movie.Screen name="Home" component={MoviesListe} options={{ headerShown: false, headerTitle: null }} />
          <Movie.Screen name="OneMovie" component={OneMovie} options={{ headerTitle: "" }} />
          <Movie.Screen name="Favorit" component={Favorit} options={{ headerTitle: "" }} />
        </Movie.Navigator>
      </NavigationContainer>
    </MovieProvider>
  );
}
