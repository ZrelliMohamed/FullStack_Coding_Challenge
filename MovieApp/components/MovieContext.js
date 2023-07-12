import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const storedMovies = await AsyncStorage.getItem('movies');
        if (storedMovies !== null) {
          setMovies(JSON.parse(storedMovies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const saveMovies = async () => {
      try {
        await AsyncStorage.setItem('movies', JSON.stringify(movies));
      } catch (error) {
        console.log(error);
      }
    };
    saveMovies();
  }, [movies]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};