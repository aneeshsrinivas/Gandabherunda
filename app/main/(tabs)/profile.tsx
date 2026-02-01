import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/theme';

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [wantVolunteer, setWantVolunteer] = useState(false);
  const [consentData, setConsentData] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!consentData) {
      Alert.alert('Error', 'Please consent to data storage');
      return;
    }
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Devotee Registration</Text>
        <Text style={styles.subtitle}>Update your profile information</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text: string) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text: string) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChangeText={(text: string) => setFormData({ ...formData, mobile: text })}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={(text: string) => setFormData({ ...formData, address: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={formData.city}
            onChangeText={(text: string) => setFormData({ ...formData, city: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your state"
            value={formData.state}
            onChangeText={(text: string) => setFormData({ ...formData, state: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit pincode"
            value={formData.pincode}
            onChangeText={(text: string) => setFormData({ ...formData, pincode: text })}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setReceiveUpdates(!receiveUpdates)}
        >
          <View style={[styles.checkbox, receiveUpdates && styles.checkboxChecked]}>
            {receiveUpdates && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Receive updates and notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setWantVolunteer(!wantVolunteer)}
        >
          <View style={[styles.checkbox, wantVolunteer && styles.checkboxChecked]}>
            {wantVolunteer && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>I want to volunteer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setConsentData(!consentData)}
        >
          <View style={[styles.checkbox, consentData && styles.checkboxChecked]}>
            {consentData && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            I consent to data storage for communications *
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !consentData && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!consentData}
        >
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
