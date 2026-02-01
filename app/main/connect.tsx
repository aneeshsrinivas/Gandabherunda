import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';

const { width } = Dimensions.get('window');

const donationAmounts = [101, 251, 501, 1001, 2501, 5001];

const volunteerRoles = [
  { id: '1', title: 'Event Volunteer', icon: 'calendar', desc: 'Help organize events' },
  { id: '2', title: 'Temple Service', icon: 'om', desc: 'Assist in daily rituals' },
  { id: '3', title: 'Food Service', icon: 'utensils', desc: 'Prasadam distribution' },
  { id: '4', title: 'Tech Support', icon: 'laptop', desc: 'Help with digital initiatives' },
];

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', color: '#1877F2', url: 'https://facebook.com' },
  { name: 'Instagram', icon: 'instagram', color: '#E4405F', url: 'https://instagram.com' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000', url: 'https://youtube.com' },
  { name: 'Twitter', icon: 'twitter', color: '#1DA1F2', url: 'https://twitter.com' },
];

export default function ConnectScreen() {
  const [selectedAmount, setSelectedAmount] = useState(501);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connect</Text>
        <Text style={styles.headerSubtitle}>Support and stay connected with us</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.donationSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="hand-holding-heart" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Make a Donation</Text>
          </View>
          <Text style={styles.sectionDesc}>
            Your contributions help maintain the Matha and support spiritual activities
          </Text>

          <View style={styles.amountsGrid}>
            {donationAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountCard,
                  selectedAmount === amount && styles.amountCardActive,
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[
                  styles.amountText,
                  selectedAmount === amount && styles.amountTextActive
                ]}>
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.customAmountContainer}>
            <TextInput
              style={styles.customAmountInput}
              placeholder="Enter custom amount"
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
            />
          </View>

          <TouchableOpacity style={styles.donateButton}>
            <FontAwesome5 name="donate" size={18} color={COLORS.white} />
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.volunteerSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="hands-helping" size={24} color={COLORS.secondary} />
            <Text style={styles.sectionTitle}>Volunteer</Text>
          </View>
          <View style={styles.rolesGrid}>
            {volunteerRoles.map((role) => (
              <TouchableOpacity key={role.id} style={styles.roleCard}>
                <View style={styles.roleIcon}>
                  <FontAwesome5 name={role.icon} size={20} color={COLORS.secondary} />
                </View>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDesc}>{role.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.volunteerButton}>
            <Text style={styles.volunteerButtonText}>Register as Volunteer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="address-card" size={24} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Contact Us</Text>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <FontAwesome5 name="map-marker-alt" size={18} color={COLORS.primary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>Sode Sri Vadiraja Matha, Sode, Udupi District, Karnataka - 576227</Text>
              </View>
            </View>
            <View style={styles.contactDivider} />
            <View style={styles.contactItem}>
              <FontAwesome5 name="phone" size={18} color={COLORS.secondary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>+91 99999 99999</Text>
              </View>
            </View>
            <View style={styles.contactDivider} />
            <View style={styles.contactItem}>
              <FontAwesome5 name="envelope" size={18} color={COLORS.accent} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@sodematha.org</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialGrid}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.name}
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => Linking.openURL(social.url)}
              >
                <FontAwesome5 name={social.icon} size={22} color={COLORS.white} />
              </TouchableOpacity>
            ))}
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
  donationSection: {
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    borderRadius: 20,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginLeft: 10,
  },
  sectionDesc: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: SPACING.md,
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountCard: {
    width: (width - 80) / 3 - 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  amountCardActive: {
    backgroundColor: COLORS.primary,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  amountTextActive: {
    color: COLORS.white,
  },
  customAmountContainer: {
    marginTop: SPACING.sm,
  },
  customAmountInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  donateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 10,
  },
  volunteerSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  roleCard: {
    width: (width - 48) / 2 - 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  roleDesc: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
  },
  volunteerButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  volunteerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  contactSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  contactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 2,
  },
  contactDivider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 4,
  },
  socialSection: {
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    ...SHADOWS.small,
  },
});
