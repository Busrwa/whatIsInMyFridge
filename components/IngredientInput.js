import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
//@Author: Busra Yacioglu

export default function IngredientInput({ onAddIngredient }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const formattedText = text.trim().toLowerCase(); // Küçük harfe dönüştür
    if (formattedText) {
      onAddIngredient(formattedText);
      setText('');
    }
  };


//Oluşturma karşılanıyor. post
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add an ingredient..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 8,
  },
});
