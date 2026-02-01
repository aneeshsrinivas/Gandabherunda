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
import { firestoreService } from '../../services/firestore';

const { width } = Dimensions.get('window');

const fallbackCategories = [
  { id: '1', title: 'Matha History', icon: 'landmark', questionCount: 25, color: COLORS.primary },
  { id: '2', title: 'Guru Parampara', icon: 'users', questionCount: 20, color: COLORS.secondary },
  { id: '3', title: 'Scriptures', icon: 'book', questionCount: 30, color: COLORS.accent },
  { id: '4', title: 'Festivals', icon: 'star', questionCount: 15, color: COLORS.info },
  { id: '5', title: 'Sri Vadiraja', icon: 'crown', questionCount: 20, color: '#FFC107' },
  { id: '6', title: 'Mixed Quiz', icon: 'random', questionCount: 50, color: '#DC3545' },
];

const difficulties = [
  { id: 'easy', title: 'Easy', icon: 'smile', color: COLORS.success },
  { id: 'medium', title: 'Medium', icon: 'meh', color: COLORS.warning },
  { id: 'hard', title: 'Hard', icon: 'frown', color: COLORS.danger },
];

const recentScores = [
  { category: 'Matha History', score: 8, total: 10, date: 'Today' },
  { category: 'Scriptures', score: 7, total: 10, date: 'Yesterday' },
  { category: 'Festivals', score: 9, total: 10, date: '2 days ago' },
];

export default function QuizHomeScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [categories, setCategories] = useState<any[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await firestoreService.getQuizCategories();
      if (data.length > 0) {
        setCategories(data);
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
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <Text style={styles.headerSubtitle}>Test your spiritual knowledge</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <FontAwesome5 name="trophy" size={16} color={COLORS.accent} />
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <FontAwesome5 name="check-circle" size={16} color={COLORS.success} />
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <FontAwesome5 name="fire" size={16} color={COLORS.danger} />
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Difficulty</Text>
          <View style={styles.difficultyRow}>
            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff.id}
                style={[
                  styles.difficultyCard,
                  selectedDifficulty === diff.id && styles.difficultyCardActive,
                ]}
                onPress={() => setSelectedDifficulty(diff.id)}
              >
                <FontAwesome5
                  name={diff.icon}
                  size={24}
                  color={selectedDifficulty === diff.id ? COLORS.white : diff.color}
                />
                <Text style={[
                  styles.difficultyTitle,
                  selectedDifficulty === diff.id && styles.difficultyTitleActive
                ]}>
                  {diff.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: (cat.color || COLORS.primary) + '20' }]}>
                  <FontAwesome5 name={cat.icon || 'question'} size={22} color={cat.color || COLORS.primary} />
                </View>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <Text style={styles.categoryQuestions}>{cat.questionCount || 10} questions</Text>
                <TouchableOpacity style={[styles.startBtn, { backgroundColor: cat.color || COLORS.primary }]}>
                  <Text style={styles.startBtnText}>Start</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scores</Text>
          {recentScores.map((score, index) => (
            <View key={index} style={styles.scoreCard}>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreCategory}>{score.category}</Text>
                <Text style={styles.scoreDate}>{score.date}</Text>
              </View>
              <View style={styles.scoreResult}>
                <Text style={styles.scoreValue}>{score.score}/{score.total}</Text>
                <View style={[
                  styles.scoreBadge,
                  { backgroundColor: score.score >= 8 ? COLORS.success : score.score >= 5 ? COLORS.warning : COLORS.danger }
                ]}>
                  <Text style={styles.scoreBadgeText}>
                    {score.score >= 8 ? 'Excellent' : score.score >= 5 ? 'Good' : 'Try Again'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.dailyChallengeCard}>
          <View style={styles.challengeContent}>
            <FontAwesome5 name="calendar-day" size={32} color={COLORS.white} />
            <View style={styles.challengeText}>
              <Text style={styles.challengeTitle}>Daily Challenge</Text>
              <Text style={styles.challengeDesc}>Complete for bonus points!</Text>
            </View>
          </View>
          <FontAwesome5 name="chevron-right" size={20} color={COLORS.white} />
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
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginTop: 16,
    ...SHADOWS.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  difficultyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  difficultyCardActive: {
    backgroundColor: COLORS.primary,
  },
  difficultyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginTop: 6,
  },
  difficultyTitleActive: {
    color: COLORS.white,
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
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  categoryQuestions: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  startBtn: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  scoreCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  scoreDate: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  scoreResult: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  scoreBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  dailyChallengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeText: {
    marginLeft: SPACING.md,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  challengeDesc: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
});
