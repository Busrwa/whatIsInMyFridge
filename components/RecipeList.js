import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
//@Author: Busra Yacioglu

const RecipeList = ({ recipes }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.recipeName}>{item.strMeal}</Text>
          </View>
        )}
        keyExtractor={(item) => item.idMeal.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recipeItem: {
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  recipeName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeList;
