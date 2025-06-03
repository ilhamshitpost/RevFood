import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

export default function ListHorizontal({ articles }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
      {articles.map((item) => (
        <View key={item.id} style={styles.bigArticle}>
          <Image source={{ uri: item.image }} style={styles.bigImage} />
          <View style={styles.overlay}>
            <Text style={styles.bigTitle}>{item.title}</Text>
            <Text style={styles.bigDate}>{item.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
  bigArticle: {
    width: 300,
    marginRight: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  bigImage: {
    width: '100%',
    height: 180,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(231, 76, 60, 0.85)',
    width: '100%',
    padding: 12,
  },
  bigTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bigDate: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
