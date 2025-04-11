import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeListScreen = () => {
  const [ingredient, setIngredient] = useState(''); // User input for individual ingredient
  const [ingredients, setIngredients] = useState([]); // List of ingredients entered by the user
  const [recipes, setRecipes] = useState([]); // Recipes to display
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state for invalid ingredients
  const navigation = useNavigation();

  // Validate ingredient (check if it exists in the valid list)
  const validateIngredient = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      const data = await response.json();
      const validIngredients = data.meals.map((meal) => meal.strIngredient.toLowerCase()); // List of valid ingredients in lowercase
      return validIngredients.includes(ingredient.toLowerCase());
    } catch (error) {
      console.error('Error validating ingredient:', error);
      return false;
    }
  };

  // Add ingredient to the list
  const handleAddIngredient = async () => {
    if (ingredient.trim() === '') {
      setError('Please enter a valid ingredient!');
      return;
    }

    // Validate ingredient (ignore case sensitivity)
    const isValid = await validateIngredient(ingredient);

    if (isValid) {
      setIngredients((prev) => [...prev, ingredient.trim().toLowerCase()]);
      setIngredient('');
      setError('');
    } else {
      setError('Invalid ingredient! Please enter a valid ingredient.');
    }
  };

  // Remove ingredient from the list
  const handleRemoveIngredient = (ingredientToRemove) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient !== ingredientToRemove);
    setIngredients(updatedIngredients);
  };

  // Fetch recipes based on the ingredients entered by the user
  useEffect(() => {
    if (ingredients.length > 0) {
      setLoading(true);
      const fetchRecipes = async () => {
        try {
          // Fetch recipes for each ingredient separately
          const allRecipes = [];
          for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.meals) {
              allRecipes.push(...data.meals);
            }
          }

          // Remove duplicates based on recipe ID
          const uniqueRecipes = Array.from(
            new Map(allRecipes.map((item) => [item.idMeal, item])).values()
          );
          setRecipes(uniqueRecipes);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, [ingredients]);

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.idMeal })}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Recipe Search</Text>

        {/* Ingredient Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter an ingredient"
          value={ingredient}
          onChangeText={setIngredient}
          onSubmitEditing={handleAddIngredient} // Handles Enter key press
          returnKeyType="done" // Optional: Change "Enter" key to "Done"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>

        {/* Error Message */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Display Added Ingredients */}
        <View style={styles.ingredientListContainer}>
          {ingredients.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ingredientItem}
              onPress={() => handleRemoveIngredient(item)}
            >
              <Text style={styles.ingredientText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Margin Adjustment Based on Ingredients */}
        {ingredients.length > 0 && (
          <Text style={styles.recipeCount}>
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
          </Text>
        )}

        {/* Recipes List */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.idMeal.toString()}
            numColumns={2}
            columnWrapperStyle={styles.recipeListRow}
            contentContainerStyle={styles.recipeListContainer}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ingredientListContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ingredientItem: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  recipeCount: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
  recipeItem: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  recipeListContainer: {
    paddingBottom: 10,
  },
  recipeListRow: {
    justifyContent: 'space-between',
  },
});

export default RecipeListScreen;
