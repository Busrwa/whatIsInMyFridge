import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const navigation = useNavigation();

  const fetchRecipeDetails = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const steps = recipe.strInstructions.split('\r\n').filter(step => step.trim() !== '');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>

      {/* Malzemeler - Üstte */}
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        <View style={styles.ingredientsList}>
          {Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key])
            .map((key, index) => (
              <Text key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientQuantity}>{recipe[`strMeasure${index + 1}`]}</Text> {recipe[key]}
              </Text>
            ))}
        </View>
      </View>

      {/* Tarif Adımları - Altta */}
      <Text style={styles.recipeDescription}>Instructions</Text>
      <View style={styles.instructionsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e9f5f1',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  recipeImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2f8d7f',
  },
  recipeDescription: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
    textAlign: 'center',
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    flex: 1,
  },
  ingredientsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ingredientsList: {
    marginTop: 10,
  },
  ingredientItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  ingredientQuantity: {
    fontWeight: 'bold',
    color: '#2f8d7f',
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;
