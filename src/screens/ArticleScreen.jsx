import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ItemSmall from '../components/ItemSmall';
import { smallArticles } from '../data';
import * as Animatable from 'react-native-animatable';

export default function ArticleScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {smallArticles.map((item, index) => (
        <Animatable.View
          key={item.id}
          animation="fadeInUp"
          delay={index * 100}
          duration={600}
        >
          <ItemSmall item={item} />
        </Animatable.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
