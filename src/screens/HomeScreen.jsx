import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { categories, articles, smallArticles } from '../data';
import ItemSmall from '../components/ItemSmall';
import ListHorizontal from '../components/ListHorizontal';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [search, setSearch] = useState('');

  const filteredBigArticles =
    activeCategory === 'Popular' || activeCategory === 'Latest'
      ? articles
      : [];

  const filteredSmallArticles =
    activeCategory === 'Popular' || activeCategory === 'Latest'
      ? smallArticles.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      : smallArticles.filter(
          (item) =>
            item.category === activeCategory &&
            item.title.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.container}>
      <Animatable.View animation="bounceInDown" duration={1000} style={styles.header}>
        <Text style={styles.logo}>RevFood</Text>
      </Animatable.View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search food..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {categories.map((cat, index) => (
            <Animatable.View
              key={cat}
              animation="fadeInRight"
              delay={index * 100}
              duration={600}
            >
              <TouchableOpacity
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.categoryItem,
                  activeCategory === cat && styles.activeCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === cat && styles.activeCategoryText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </ScrollView>

        {(activeCategory === 'Popular' || activeCategory === 'Latest') && (
          <ListHorizontal articles={filteredBigArticles} />
        )}

        <View style={styles.smallArticles}>
          {filteredSmallArticles.map((item, index) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              delay={index * 100}
              duration={600}
            >
              <ItemSmall item={item} showDescription />
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e74c3c',
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    fontSize: 16,
    borderWidth: 0,
  },
  searchButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  categories: {
    marginTop: 14,
    marginBottom: 14,
  },
  categoryItem: {
    height: 34,
    paddingHorizontal: 18,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategory: {
    backgroundColor: '#e74c3c',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  smallArticles: {
    marginTop: 10,
  },
});
