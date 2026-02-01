import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { firestoreService } from '../../services/firestore';

const { width } = Dimensions.get('window');

const fallbackTopThree = [
  { rank: 2, name: 'Raghavendra K', points: 2850, avatar: 'R' },
  { rank: 1, name: 'Madhava Rao', points: 3200, avatar: 'M' },
  { rank: 3, name: 'Srinivas P', points: 2650, avatar: 'S' },
];

const fallbackLeaderboard = [
  { rank: 4, name: 'Narayana Achar', points: 2500, avatar: 'N' },
  { rank: 5, name: 'Krishna Bhat', points: 2350, avatar: 'K' },
  { rank: 6, name: 'Vishnu Sharma', points: 2200, avatar: 'V' },
  { rank: 7, name: 'Lakshmi Devi', points: 2100, avatar: 'L' },
  { rank: 8, name: 'Ganesh Hegde', points: 1950, avatar: 'G' },
  { rank: 9, name: 'Anand Kumar', points: 1850, avatar: 'A' },
  { rank: 10, name: 'Padma S', points: 1750, avatar: 'P' },
];

const currentUser = { rank: 45, name: 'You', points: 750, avatar: 'Y' };

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await firestoreService.getLeaderboard(10);
      if (data.length > 0) {
        const formattedData = data.map((user, index) => ({
          rank: index + 1,
          name: user.displayName || 'User',
          points: user.points || 0,
          avatar: (user.displayName || 'U')[0].toUpperCase(),
        }));
        setLeaderboard(formattedData);
      } else {
        setLeaderboard([...fallbackTopThree.sort((a, b) => a.rank - b.rank), ...fallbackLeaderboard]);
      }
    } catch (error) {
      console.log('Using fallback data:', error);
      setLeaderboard([...fallbackTopThree.sort((a, b) => a.rank - b.rank), ...fallbackLeaderboard]);
    } finally {
      setLoading(false);
    }
  };

  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const renderPodium = () => (
    <View style={styles.podiumContainer}>
      {podiumOrder.map((user) => {
        if (!user) return null;
        const isFirst = user.rank === 1;
        const height = isFirst ? 100 : user.rank === 2 ? 80 : 60;
        return (
          <View key={user.rank} style={styles.podiumItem}>
            <View style={[
              styles.avatarContainer,
              isFirst && styles.avatarFirst,
              { marginBottom: 8 }
            ]}>
              <Text style={[styles.avatarText, isFirst && styles.avatarTextFirst]}>
                {user.avatar}
              </Text>
              {isFirst && (
                <View style={styles.crownBadge}>
                  <FontAwesome5 name="crown" size={12} color={COLORS.accent} />
                </View>
              )}
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{user.name}</Text>
            <Text style={styles.podiumPoints}>{user.points} pts</Text>
            <View style={[
              styles.podiumBar,
              { height, backgroundColor: isFirst ? COLORS.accent : user.rank === 2 ? COLORS.gray : '#CD7F32' }
            ]}>
              <Text style={styles.rankText}>{user.rank}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderLeaderboardItem = ({ item }: { item: any }) => (
    <View style={styles.leaderboardItem}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankBadgeText}>{item.rank}</Text>
      </View>
      <View style={styles.userAvatar}>
        <Text style={styles.userAvatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={styles.pointsRow}>
          <FontAwesome5 name="star" size={12} color={COLORS.accent} />
          <Text style={styles.userPoints}>{item.points} points</Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={14} color={COLORS.gray} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top performers this month</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderPodium()}

        <View style={styles.currentUserCard}>
          <View style={styles.currentUserLeft}>
            <View style={styles.currentUserRank}>
              <Text style={styles.currentUserRankText}>{currentUser.rank}</Text>
            </View>
            <View style={styles.currentUserAvatar}>
              <Text style={styles.currentUserAvatarText}>{currentUser.avatar}</Text>
            </View>
            <View>
              <Text style={styles.currentUserName}>Your Ranking</Text>
              <Text style={styles.currentUserPoints}>{currentUser.points} points</Text>
            </View>
          </View>
          <View style={styles.currentUserProgress}>
            <Text style={styles.progressText}>+150 to rank up</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Rankings</Text>
          <FlatList
            data={restOfLeaderboard}
            renderItem={renderLeaderboardItem}
            keyExtractor={(item) => item.rank.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.badgesSection}>
          <Text style={styles.listTitle}>Badges Earned</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { icon: 'medal', title: 'Quiz Master', color: COLORS.accent },
              { icon: 'book-reader', title: 'Scholar', color: COLORS.secondary },
              { icon: 'fire', title: '7 Day Streak', color: COLORS.danger },
              { icon: 'star', title: 'Top 50', color: COLORS.primary },
            ].map((badge, index) => (
              <View key={index} style={styles.badgeCard}>
                <View style={[styles.badgeIcon, { backgroundColor: badge.color + '20' }]}>
                  <FontAwesome5 name={badge.icon} size={20} color={badge.color} />
                </View>
                <Text style={styles.badgeTitle}>{badge.title}</Text>
              </View>
            ))}
          </ScrollView>
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
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: (width - 80) / 3,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFirst: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  avatarTextFirst: {
    fontSize: 24,
  },
  crownBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 4,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  podiumPoints: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  podiumBar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  currentUserCard: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  currentUserLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentUserRank: {
    backgroundColor: COLORS.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  currentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  currentUserAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  currentUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  currentUserPoints: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  currentUserProgress: {
    marginTop: SPACING.sm,
  },
  progressText: {
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 3,
  },
  listSection: {
    padding: SPACING.lg,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userPoints: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  badgesSection: {
    paddingHorizontal: SPACING.lg,
  },
  badgeCard: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeTitle: {
    fontSize: 11,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
});
