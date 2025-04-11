import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const IngredientList = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients:</Text>
      {/* ScrollView yerine FlatList kullanılıyor */}
      <FlatList 
        data={ingredients} 
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IngredientList;
