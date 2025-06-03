import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function ProfileScreen({ navigation }) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://68271801397e48c913188e4d.mockapi.io/api/artikel');
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus artikel ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`https://68271801397e48c913188e4d.mockapi.io/api/artikel/${id}`);
            fetchArticles();
          } catch (error) {
            Alert.alert('Error', 'Gagal menghapus artikel');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchArticles);
    return unsubscribe;
  }, [navigation]);

  return (
    <Animatable.View animation="fadeIn" duration={800} style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        delay={300}
        source={{
          uri: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=500&auto=format&fit=crop&q=60',
        }}
        style={styles.avatar}
      />
      <Animatable.Text animation="fadeInDown" delay={600} style={styles.name}>
        Ilham
      </Animatable.Text>
      <Animatable.Text animation="fadeInDown" delay={700} style={styles.email}>
        Ilham@gmail.com
      </Animatable.Text>

      <Animatable.View animation="bounceInUp" delay={1000}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Form')}
        >
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </Animatable.View>

      <ScrollView style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
        {articles.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            ) : null}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.cardMeta}>📅 {item.date} | 👁️ {item.views}</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Form', { item })}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginTop: 6,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardMeta: {
    marginTop: 6,
    color: '#777',
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    gap: 14,
  },
  edit: {
    color: 'blue',
    fontWeight: 'bold',
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});
