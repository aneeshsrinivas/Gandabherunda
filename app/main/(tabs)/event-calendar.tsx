import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../../constants/theme';
import { firestoreService } from '../../../services/firestore';

const { width } = Dimensions.get('window');

const fallbackEvents = [
  {
    id: '1',
    title: 'Magh Shudha Dwadashi Aradhane',
    date: new Date('2026-02-15'),
    location: 'Sode Vadiraja Matha',
    category: 'Aradhane',
  },
  {
    id: '2',
    title: 'Paryaya 2026 Celebrations',
    date: new Date('2026-01-18'),
    location: 'Udupi Sri Krishna Matha',
    category: 'Paryaya',
  },
  {
    id: '3',
    title: 'Youth Spiritual Camp',
    date: new Date('2026-05-10'),
    location: 'Sode Vadiraja Matha',
    category: 'Camp',
  },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const categoryColors: Record<string, string> = {
  'Aradhane': COLORS.primary,
  'Paryaya': COLORS.secondary,
  'Camp': COLORS.info,
  'Festival': COLORS.accent,
};

export default function EventCalendarScreen() {
  const [events, setEvents] = useState<any[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await firestoreService.getEvents();
      if (data.length > 0) {
        const formattedEvents = data.map((e: any) => ({
          ...e,
          date: (e.date as any)?.toDate ? (e.date as any).toDate() : new Date(e.date as any),
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.log('Using fallback data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const filteredEvents = events.filter((e: any) => {
    const eventMonth = new Date(e.date).getMonth();
    return eventMonth === selectedMonth;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.headerSubtitle}>Upcoming temple events and celebrations</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthsContainer}
        contentContainerStyle={styles.monthsContent}
      >
        {months.map((month, index) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthChip,
              selectedMonth === index && styles.monthChipActive,
            ]}
            onPress={() => setSelectedMonth(index)}
          >
            <Text
              style={[
                styles.monthText,
                selectedMonth === index && styles.monthTextActive,
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>
          {months[selectedMonth]} Events ({filteredEvents.length})
        </Text>

        {filteredEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="calendar-times" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No events in {months[selectedMonth]}</Text>
          </View>
        ) : (
          filteredEvents.map((event: any) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={[styles.eventIndicator, { backgroundColor: categoryColors[event.category] || COLORS.primary }]} />
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: (categoryColors[event.category] || COLORS.primary) + '20' }]}>
                    <Text style={[styles.categoryText, { color: categoryColors[event.category] || COLORS.primary }]}>
                      {event.category}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <View style={styles.detailItem}>
                    <FontAwesome5 name="calendar" size={12} color={COLORS.gray} />
                    <Text style={styles.detailText}>{formatDate(new Date(event.date))}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome5 name="map-marker-alt" size={12} color={COLORS.gray} />
                    <Text style={styles.detailText}>{event.location}</Text>
                  </View>
                </View>
              </View>
              <FontAwesome5 name="chevron-right" size={14} color={COLORS.gray} />
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity style={styles.addReminderBtn}>
          <FontAwesome5 name="bell" size={16} color={COLORS.white} />
          <Text style={styles.addReminderText}>Set Event Reminders</Text>
        </TouchableOpacity>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.gray,
    fontSize: 14,
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
  monthsContainer: {
    marginTop: SPACING.lg,
    maxHeight: 50,
  },
  monthsContent: {
    paddingHorizontal: SPACING.lg,
  },
  monthChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  monthChipActive: {
    backgroundColor: COLORS.primary,
  },
  monthText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  monthTextActive: {
    color: COLORS.white,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: SPACING.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  eventIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: SPACING.md,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: 4,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 6,
  },
  addReminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  addReminderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 8,
  },
});
