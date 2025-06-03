import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ItemSmall({ item }) {
  return (
    <View style={styles.smallCard}>
      <Image source={{ uri: item.image }} style={styles.smallImage} />
      <View style={styles.smallContent}>
        <Text style={styles.smallCategory}>{item.category}</Text>
        <Text style={styles.smallTitle}>{item.title}</Text>
        <Text style={styles.smallDescription}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.smallDate}>{item.date}</Text>
          <Text style={styles.views}>{item.views} views</Text>
        </View>
      </View>
      <Text style={styles.bookmark}>🔖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smallCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  smallImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  smallContent: {
    flex: 1,
  },
  smallCategory: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  smallTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  smallDescription: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  smallDate: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  views: {
    fontSize: 12,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  bookmark: {
    fontSize: 18,
    color: '#e74c3c',
    marginLeft: 8,
  },
});
