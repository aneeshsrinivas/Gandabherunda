import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme';
import Card from '../../../components/Card';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const newsData = [
    { id: '1', title: 'Article 1', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Article 2', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Article 3', image: 'https://via.placeholder.com/150' },
  ];

  const announcements = [
    { id: '1', text: 'Announcement 1' },
    { id: '2', text: 'Announcement 2' },
    { id: '3', text: 'Announcement 3' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newsData.map((item) => (
            <Card key={item.id} title={item.title} image={item.image} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {announcements.map((item) => (
            <View key={item.id} style={styles.announcementCard}>
              <Text>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Darshan & Prasada Timings</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Darshan</Text>
            <Text style={styles.tableHeader}>Timings</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Morning</Text>
            <Text>7:00 AM - 12:00 PM</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Evening</Text>
            <Text>4:00 PM - 8:00 PM</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Prasada</Text>
            <Text style={styles.tableHeader}>Timings</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Lunch</Text>
            <Text>12:00 PM - 2:00 PM</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Dinner</Text>
            <Text>8:00 PM - 9:30 PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.socialMediaContainer}>
        <FontAwesome5 name="facebook" size={30} color={COLORS.primary} />
        <FontAwesome5 name="youtube" size={30} color={COLORS.primary} />
        <FontAwesome5 name="instagram" size={30} color={COLORS.primary} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carousel: {
    width: width - 30,
  },
  announcementCard: {
    width: width - 30,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default HomeScreen;
