import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/theme';

export default function RoomBookingScreen() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000), //  1 day later
    numRooms: '1',
    numGuests: '1',
    specialRequests: '',
  });
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [consentStorage, setConsentStorage] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!consentStorage) {
      Alert.alert('Error', 'Please consent to data storage');
      return;
    }

    const refNumber = `RB${Date.now().toString().slice(-8)}`;
    Alert.alert(
      'Booking Confirmed!',
      `Your booking reference number is: ${refNumber}\n\nAn email will be sent to office@sodematha.in with your booking details.`,
      [{ text: 'OK' }]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Room Booking - Sode</Text>
        <Text style={styles.subtitle}>Fill in your details to book rooms</Text>
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
          <Text style={styles.label}>Mobile *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit mobile"
            value={formData.mobile}
            onChangeText={(text: string) => setFormData({ ...formData, mobile: text })}
            keyboardType="phone-pad"
            maxLength={10}
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
          <Text style={styles.label}>Check-in Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCheckInPicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(formData.checkIn)}</Text>
          </TouchableOpacity>
          {showCheckInPicker && (
            <DateTimePicker
              value={formData.checkIn}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event: any, selectedDate: Date | undefined) => {
                setShowCheckInPicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setFormData({ ...formData, checkIn: selectedDate });
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Check-out Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCheckOutPicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(formData.checkOut)}</Text>
          </TouchableOpacity>
          {showCheckOutPicker && (
            <DateTimePicker
              value={formData.checkOut}
              mode="date"
              display="default"
              minimumDate={formData.checkIn}
              onChange={(event: any, selectedDate: Date | undefined) => {
                setShowCheckOutPicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setFormData({ ...formData, checkOut: selectedDate });
                }
              }}
            />
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Rooms *</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={formData.numRooms}
              onChangeText={(text: string) => setFormData({ ...formData, numRooms: text })}
              keyboardType="number-pad"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Guests *</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={formData.numGuests}
              onChangeText={(text: string) => setFormData({ ...formData, numGuests: text })}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Special Requests</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any special requirements or requests"
            value={formData.specialRequests}
            onChangeText={(text: string) => setFormData({ ...formData, specialRequests: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setConsentStorage(!consentStorage)}
        >
          <View style={[styles.checkbox, consentStorage && styles.checkboxChecked]}>
            {consentStorage && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            I consent to data storage for booking purposes *
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !consentStorage && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!consentStorage}
        >
          <Text style={styles.buttonText}>Submit Booking Request</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Note:</Text>
          <Text style={styles.infoText}>
            • Booking requests are sent to office@sodematha.in{'\n'}
            • You will receive confirmation via email/SMS{'\n'}
            • Room availability subject to confirmation{'\n'}
            • Cancellation policy applies
          </Text>
        </View>
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
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.black,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
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
  infoBox: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.black,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.black,
    lineHeight: 20,
  },
});
