import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';

const { width } = Dimensions.get('window');

const darshanTimings = [
  { time: '5:00 AM', event: 'Pratah Pooja & Abhisheka', duration: '1 hour' },
  { time: '7:30 AM', event: 'Mangala Aarti', duration: '30 mins' },
  { time: '12:00 PM', event: 'Madhyahna Pooja', duration: '45 mins' },
  { time: '6:00 PM', event: 'Sandhya Aarti', duration: '30 mins' },
  { time: '8:00 PM', event: 'Ratri Pooja', duration: '45 mins' },
];

const deities = [
  { name: 'Sri Trivikrama', description: 'Main deity of the Matha', icon: 'crown' },
  { name: 'Sri Bhoo Varaha', description: 'Sacred Varaha form', icon: 'paw' },
  { name: 'Sri Hayagriva', description: 'God of knowledge', icon: 'book' },
  { name: 'Sri Vadiraja Brindavana', description: 'Sacred resting place', icon: 'landmark' },
];

export default function DarshanScreen() {
  const [selectedSection, setSelectedSection] = useState('live');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Darshan</Text>
        <Text style={styles.headerSubtitle}>Experience divine blessings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.liveDarshanCard}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.liveContent}>
            <FontAwesome5 name="video" size={48} color={COLORS.primary} />
            <Text style={styles.liveTitle}>Live Darshan</Text>
            <Text style={styles.liveSubtitle}>Watch live temple proceedings</Text>
            <TouchableOpacity style={styles.watchButton}>
              <FontAwesome5 name="play" size={14} color={COLORS.white} />
              <Text style={styles.watchButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Schedule</Text>
          {darshanTimings.map((item, index) => (
            <View key={index} style={styles.scheduleItem}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.eventText}>{item.event}</Text>
                <View style={styles.scheduleBar} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sacred Deities</Text>
          <View style={styles.deitiesGrid}>
            {deities.map((deity, index) => (
              <TouchableOpacity key={index} style={styles.deityCard}>
                <View style={styles.deityIcon}>
                  <FontAwesome5 name={deity.icon} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.deityName}>{deity.name}</Text>
                <Text style={styles.deityDesc}>{deity.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <FontAwesome5 name="bell" size={24} color={COLORS.accent} />
              <Text style={styles.actionText}>Set Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <FontAwesome5 name="calendar-check" size={24} color={COLORS.secondary} />
              <Text style={styles.actionText}>Book Seva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <FontAwesome5 name="donate" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  liveDarshanCard: {
    margin: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 12,
    zIndex: 1,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginRight: 6,
  },
  liveText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  liveContent: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  liveTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 16,
  },
  liveSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
  },
  watchButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  timeContainer: {
    width: 80,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  durationText: {
    fontSize: 11,
    color: COLORS.gray,
  },
  scheduleContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  eventText: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  scheduleBar: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 8,
    width: '60%',
  },
  deitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deityCard: {
    width: (width - 48) / 2 - 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  deityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  deityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  deityDesc: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 8,
    fontWeight: '500',
  },
});
