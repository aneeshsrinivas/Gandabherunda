import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// @ts-ignore
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function ArtefactViewerScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('details');

  const artefact = {
    name: 'Sri Vadiraja Brindavana Model',
    category: 'Sacred Structure',
    year: '1600 AD',
    location: 'Sode',
    description:
      'The sacred Brindavana of Sri Vadiraja Tirtha Swamiji is one of the most revered structures in the Madhwa tradition. This detailed model represents the original Brindavana at Sode, showcasing the intricate architectural details and sacred symbolism.',
    history:
      'Sri Vadiraja Tirtha entered Brindavana in 1600 AD at Sode. The structure was later renovated and enhanced over centuries by successive pontiffs of the Sode Vadiraja Matha.',
    significance:
      'Devotees from across the world visit this sacred site seeking blessings. The Brindavana is believed to have divine powers that fulfill the wishes of sincere devotees.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artefact Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <FontAwesome5 name="share-alt" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <FontAwesome5 name="landmark" size={80} color={COLORS.primary} />
            <Text style={styles.placeholderText}>3D View Coming Soon</Text>
          </View>
          <View style={styles.imageControls}>
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="search-plus" size={16} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="expand" size={16} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="sync" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.artefactName}>{artefact.name}</Text>
            <View style={styles.badges}>
              <View style={styles.badge}>
                <FontAwesome5 name="tag" size={10} color={COLORS.secondary} />
                <Text style={styles.badgeText}>{artefact.category}</Text>
              </View>
              <View style={styles.badge}>
                <FontAwesome5 name="calendar" size={10} color={COLORS.accent} />
                <Text style={styles.badgeText}>{artefact.year}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabContainer}>
            {['details', 'history', 'significance'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.tabActive]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {selectedTab === 'details' && (
              <>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="map-marker-alt" size={16} color={COLORS.primary} />
                  <Text style={styles.infoText}>Location: {artefact.location}</Text>
                </View>
                <Text style={styles.descriptionText}>{artefact.description}</Text>
              </>
            )}
            {selectedTab === 'history' && (
              <Text style={styles.descriptionText}>{artefact.history}</Text>
            )}
            {selectedTab === 'significance' && (
              <Text style={styles.descriptionText}>{artefact.significance}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.audioButton}>
            <FontAwesome5 name="headphones" size={18} color={COLORS.white} />
            <Text style={styles.audioButtonText}>Listen to Audio Guide</Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome5 name="heart" size={18} color={COLORS.primary} />
              <Text style={styles.actionBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome5 name="download" size={18} color={COLORS.primary} />
              <Text style={styles.actionBtnText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome5 name="info-circle" size={18} color={COLORS.primary} />
              <Text style={styles.actionBtnText}>More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  shareButton: {
    padding: 8,
  },
  imageContainer: {
    backgroundColor: COLORS.cardBg,
    margin: SPACING.lg,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  imagePlaceholder: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
  },
  placeholderText: {
    marginTop: 12,
    color: COLORS.gray,
    fontSize: 14,
  },
  imageControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: SPACING.lg,
  },
  artefactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    ...SHADOWS.small,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginLeft: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.white,
  },
  tabContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  actionBtnText: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 6,
  },
});
