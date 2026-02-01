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
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { firestoreService, LearnContent } from '../../services/firestore';

const { width } = Dimensions.get('window');

const fallbackCategories = [
  { id: '1', title: 'Pravachanas', icon: 'microphone', count: 45, color: COLORS.primary },
  { id: '2', title: 'Scriptures', icon: 'book', count: 28, color: COLORS.secondary },
  { id: '3', title: 'Stotras', icon: 'music', count: 62, color: COLORS.accent },
  { id: '4', title: 'Videos', icon: 'video', count: 34, color: COLORS.info },
];

const fallbackProgress = [
  { id: '1', title: 'Bhagavad Gita', progress: 45, chapters: '8/18' },
  { id: '2', title: 'Vadiraja Works', progress: 30, chapters: '3/10' },
  { id: '3', title: 'Madhwa Vijaya', progress: 70, chapters: '14/20' },
];

const typeIcons: Record<string, string> = {
  'pravachana': 'microphone',
  'scripture': 'book-open',
  'stotra': 'music',
  'video': 'play-circle',
};

export default function LearnScreen() {
  const [content, setContent] = useState<LearnContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await firestoreService.getLearnContent();
      if (data.length > 0) {
        setContent(data);
      }
    } catch (error) {
      console.log('Using fallback data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>Explore our spiritual knowledge base</Text>
        <View style={styles.streakBadge}>
          <FontAwesome5 name="fire" size={16} color={COLORS.accent} />
          <Text style={styles.streakText}>7 Day Streak</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {fallbackCategories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                  <FontAwesome5 name={cat.icon} size={24} color={cat.color} />
                </View>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <Text style={styles.categoryCount}>{cat.count} items</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {fallbackProgress.map((item) => (
            <TouchableOpacity key={item.id} style={styles.progressCard}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressTitle}>{item.title}</Text>
                <Text style={styles.progressChapters}>{item.chapters} chapters</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.progressPercent}>{item.progress}%</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {content.length > 0 ? content.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredCard}>
                <View style={styles.featuredIcon}>
                  <FontAwesome5 name={typeIcons[item.type] || 'book'} size={28} color={COLORS.primary} />
                </View>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredType}>{item.type}</Text>
                <View style={styles.durationBadge}>
                  <FontAwesome5 name="clock" size={10} color={COLORS.gray} />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </TouchableOpacity>
            )) : (
              <Text style={styles.noDataText}>No content available</Text>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.dailyQuoteCard}>
          <FontAwesome5 name="quote-left" size={20} color={COLORS.white} />
          <Text style={styles.quoteText}>
            "Service to Guru and God is the highest form of devotion"
          </Text>
          <Text style={styles.quoteAuthor}>- Sri Vadiraja Tirtha</Text>
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
  noDataText: {
    color: COLORS.gray,
    padding: SPACING.md,
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
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginLeft: 6,
  },
  categoriesSection: {
    padding: SPACING.lg,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 2 - 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  categoryCount: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  progressChapters: {
    fontSize: 12,
    color: COLORS.gray,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'right',
  },
  featuredCard: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  featuredIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  featuredType: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  durationText: {
    fontSize: 11,
    color: COLORS.gray,
    marginLeft: 4,
  },
  dailyQuoteCard: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  quoteText: {
    fontSize: 16,
    color: COLORS.white,
    fontStyle: 'italic',
    lineHeight: 24,
    marginTop: 8,
  },
  quoteAuthor: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 12,
    textAlign: 'right',
  },
});
