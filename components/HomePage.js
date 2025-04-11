import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  // Navigate to Recipe List Screen when Start button is pressed
  const handleStart = () => {
    navigation.navigate('RecipeList'); // Navigate to Recipe List Screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#4CAF50', // Yeşil renk
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
