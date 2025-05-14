import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ORİJİNAL HALİ:
// const RecipeListScreen = () => {

// GÜNCELLENMİŞ HALİ:
const RecipeListScreen = ({ navigation, userEmail }) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateIngredient = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      const data = await response.json();
      const validIngredients = data.meals.map((meal) => meal.strIngredient.toLowerCase());
      return validIngredients.includes(ingredient.toLowerCase());
    } catch (error) {
      console.error('Error validating ingredient:', error);
      return false;
    }
  };

  const handleAddIngredient = async () => {
    if (ingredient.trim() === '') {
      setError('Please enter a valid ingredient!');
      return;
    }

    const isValid = await validateIngredient(ingredient);

    if (isValid) {
      setIngredients((prev) => [...prev, ingredient.trim().toLowerCase()]);
      setIngredient('');
      setError('');
    } else {
      setError('Invalid ingredient! Please enter a valid ingredient.');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient !== ingredientToRemove);
    setIngredients(updatedIngredients);
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      setLoading(true);
      const fetchRecipes = async () => {
        try {
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
        {/* ORİJİNAL HALİ */}
        {/* <Text style={styles.title}>Recipe Search</Text> */}

        {/* GÜNCELLENMİŞ HALİ */}
        <Text style={styles.title}>
          Recipe Search {userEmail ? `- ${userEmail}` : ''}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter an ingredient"
          value={ingredient}
          onChangeText={setIngredient}
          onSubmitEditing={handleAddIngredient}
          returnKeyType="done"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

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

        {ingredients.length > 0 && (
          <Text style={styles.recipeCount}>
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
          </Text>
        )}

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
