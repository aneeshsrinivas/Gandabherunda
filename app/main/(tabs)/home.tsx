import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Card from '../../../components/Card';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const newsData = [
    {
      id: '1',
      title: 'Magh Shudha Dwadashi Aradhane',
      image: 'https://via.placeholder.com/300x200/FF9933/FFFFFF?text=Aradhane',
      content: 'Annual celebration of Sri Vadiraja Swamiji Aradhane',
    },
    {
      id: '2',
      title: 'Paryaya 2026 Preparations',
      image: 'https://via.placeholder.com/300x200/138808/FFFFFF?text=Paryaya',
      content: 'Preparations underway for upcoming Paryaya',
    },
    {
      id: '3',
      title: 'New Publication Release',
      image: 'https://via.placeholder.com/300x200/FF9933/FFFFFF?text=Publication',
      content: 'Latest Pravachana book available now',
    },
    {
      id: '4',
      title: 'Youth Camp Announcement',
      image: 'https://via.placeholder.com/300x200/138808/FFFFFF?text=Youth+Camp',
      content: 'Registration open for annual youth camp',
    },
    {
      id: '5',
      title: 'Vrindavana Renovation',
      image: 'https://via.placeholder.com/300x200/FF9933/FFFFFF?text=Renovation',
      content: 'Renovation work at historical Vrindavanas',
    },
  ];

  const announcements = [
    { id: '1', text: 'ಮಾಘ ಶುದ್ಧ ದ್ವಾದಶಿ ಆರಾಧನೆ - ಫೆಬ್ರವರಿ 10, 2026', type: 'aaradhane' },
    { id: '2', text: 'Special Utsava on Makara Sankranti', type: 'utsava' },
    { id: '3', text: 'Paryaya begins March 2026', type: 'festival' },
    { id: '4', text: 'Weekly Bhajana every Thursday 6PM', type: 'general' },
  ];

  const socialLinks = {
    instagram: 'https://instagram.com/sodematha',
    facebook: 'https://facebook.com/sodematha',
    youtube: 'https://youtube.com/@sodematha',
    whatsapp: 'https://whatsapp.com/channel/sodematha',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FontAwesome5 name="bars" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.omSymbol}>ॐ</Text>
        <Text style={styles.mathaName}>Sode Sri Vadiraja Matha</Text>
        <View style={styles.swamijisRow}>
          <View style={styles.swamiji}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Photo</Text>
            </View>
            <Text style={styles.swamijiName}>Sri Sri Vishwothama{'\n'}Theertha Swamiji</Text>
          </View>
          <View style={styles.swamiji}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Photo</Text>
            </View>
            <Text style={styles.swamijiName}>Sri Sri Vishwavallabha{'\n'}Theertha Swamiji</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.newsScroll}
        >
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
            <View key={item.id} style={styles.announcementCard} {...({} as any)}>
              <Text style={styles.announcementText}>{item.text}</Text>
              <View style={styles.announcementBadge}>
                <Text style={styles.badgeText}>
                  {item.type === 'aaradhane' ? 'Aaradhane' :
                    item.type === 'utsava' ? 'Utsava' :
                      item.type === 'festival' ? 'Festival' : 'General'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Darshan & Prasada Timings - Sode</Text>
        <View style={styles.timingsCard}>
          <View style={styles.timingRow}>
            <View style={styles.timingBlock}>
              <Text style={styles.timingLabel}>Morning Darshan</Text>
              <Text style={styles.timingValue}>5:00 AM - 8:30 AM</Text>
            </View>
            <View style={styles.timingBlock}>
              <Text style={styles.timingLabel}>Noon Prasada</Text>
              <Text style={styles.timingValue}>11:30 AM</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.timingRow}>
            <View style={styles.timingBlock}>
              <Text style={styles.timingLabel}>Evening Darshan</Text>
              <Text style={styles.timingValue}>5:00 PM - 7:30 PM</Text>
            </View>
            <View style={styles.timingBlock}>
              <Text style={styles.timingLabel}>Evening Prasada</Text>
              <Text style={styles.timingValue}>7:30 PM</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(socialLinks.instagram)}>
            <FontAwesome5 name="instagram" size={36} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(socialLinks.facebook)}>
            <FontAwesome5 name="facebook" size={36} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(socialLinks.youtube)}>
            <FontAwesome5 name="youtube" size={36} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(socialLinks.whatsapp)}>
            <FontAwesome5 name="whatsapp" size={36} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.socialHandle}>@sodematha</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>ಶ್ರೀ ವಾದಿರಾಜರ ಕೃಪೆ ಎಲ್ಲದರ ಮೇಲೆ</Text>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  omSymbol: {
    fontSize: 36,
    color: COLORS.white,
    marginBottom: 5,
  },
  mathaName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  swamijisRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  swamiji: {
    alignItems: 'center',
    width: '45%',
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoText: {
    color: COLORS.white,
    fontSize: 12,
  },
  swamijiName: {
    fontSize: 11,
    color: COLORS.white,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  newsScroll: {
    marginBottom: 10,
  },
  carousel: {
    width: width - 30,
  },
  announcementCard: {
    width: width - 30,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  announcementText: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  announcementBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  timingsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingBlock: {
    flex: 1,
    padding: 10,
  },
  timingLabel: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  timingValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  socialHandle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;
