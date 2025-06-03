import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function FormScreen() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [views, setViews] = useState('');
  const [image, setImage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  const itemToEdit = route.params?.item;

  useEffect(() => {
    if (itemToEdit) {
      setCategory(itemToEdit.category);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setDate(itemToEdit.date);
      setViews(itemToEdit.views);
      setImage(itemToEdit.image);
    }
  }, [itemToEdit]);

  const handleSave = async () => {
    if (!category || !title || !description || !date || !views || !image) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    const data = { category, title, description, date, views, image };

    try {
      if (itemToEdit) {
        await axios.put(`https://68271801397e48c913188e4d.mockapi.io/api/artikel/${itemToEdit.id}`, data);
        Alert.alert('Berhasil', 'Data berhasil diperbarui!');
      } else {
        await axios.post('https://68271801397e48c913188e4d.mockapi.io/api/artikel', data);
        Alert.alert('Berhasil', 'Data berhasil disimpan!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Enter date (e.g. 2025-05-16)"
        />
        <Text style={styles.label}>Views</Text>
        <TextInput
          style={styles.input}
          value={views}
          onChangeText={setViews}
          placeholder="Enter views count"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="Enter image URL"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
