import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { firestoreService } from '../../services/firestore';

const { width } = Dimensions.get('window');

const fallbackData = [
  { id: '1', name: 'Sri Krishna Idol', category: 'Idols', description: 'Ancient brass idol of Lord Krishna', year: '16th Century' },
  { id: '2', name: 'Silver Puja Thali', category: 'Puja Items', description: 'Ornate silver thali used in temple rituals', year: '18th Century' },
  { id: '3', name: 'Vadiraja Stotra Manuscript', category: 'Manuscripts', description: 'Original handwritten manuscript', year: '1575 AD' },
  { id: '4', name: 'Hayagriva Idol', category: 'Idols', description: 'Sacred Hayagriva deity idol', year: '15th Century' },
];

const categoryIcons: Record<string, string> = {
  'Idols': 'om',
  'Puja Items': 'bell',
  'Manuscripts': 'scroll',
  'Art': 'palette',
};

const categories = ['All', 'Idols', 'Puja Items', 'Manuscripts', 'Art'];

export default function ArtefactsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [artefacts, setArtefacts] = useState<any[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtefacts();
  }, []);

  const loadArtefacts = async () => {
    try {
      const data = await firestoreService.getArtefacts();
      if (data.length > 0) {
        setArtefacts(data);
      }
    } catch (error) {
      console.log('Using fallback data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtefacts = artefacts.filter((item: any) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderArtefactCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.artefactCard}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={categoryIcons[item.category] || 'star'} size={32} color={COLORS.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.artefactName}>{item.name}</Text>
        <Text style={styles.artefactCategory}>{item.category}</Text>
        <Text style={styles.artefactDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.yearBadge}>
          <FontAwesome5 name="clock" size={10} color={COLORS.accent} />
          <Text style={styles.yearText}>{item.year}</Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color={COLORS.gray} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading artefacts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sacred Artefacts</Text>
        <Text style={styles.headerSubtitle}>Explore our heritage collection</Text>
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artefacts..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>{filteredArtefacts.length} items found</Text>
      </View>

      <FlatList
        data={filteredArtefacts}
        renderItem={renderArtefactCard}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 20,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: -20,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.medium,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  categoriesContainer: {
    marginTop: SPACING.lg,
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.lg,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  resultsHeader: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  resultsText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  artefactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  artefactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  artefactCategory: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  artefactDescription: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  yearText: {
    fontSize: 11,
    color: COLORS.accent,
    marginLeft: 4,
    fontWeight: '500',
  },
});
