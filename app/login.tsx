import { useRouter } from 'expo-router';
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
import { COLORS } from '../constants/theme';

export default function LoginScreen() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleSendOTP = () => {
        if (phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number');
            return;
        }
        if (!agreedToTerms) {
            Alert.alert('Error', 'Please agree to Terms & Conditions and Privacy Policy');
            return;
        }
        setShowOtp(true);
        Alert.alert('Success', `OTP sent to +91${phoneNumber}`);
    };

    const handleVerifyOTP = () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }
        router.replace('/main/(tabs)/home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.omSymbol}>ॐ</Text>
                    <Text style={styles.title}>Sode Sri Vadiraja Matha</Text>
                    <Text style={styles.subtitle}>Login to Continue</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.phoneInput}>
                            <Text style={styles.countryCode}>+91</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter 10-digit number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                                maxLength={10}
                                editable={!showOtp}
                            />
                        </View>
                    </View>

                    {showOtp && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter OTP</Text>
                            <TextInput
                                style={[styles.input, styles.fullInput]}
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </View>
                    )}

                    {!showOtp && (
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setAgreedToTerms(!agreedToTerms)}
                        >
                            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                                {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                I agree to the{' '}
                                <Text style={styles.link}>Terms & Conditions</Text> and{' '}
                                <Text style={styles.link}>Privacy Policy</Text>
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.button, (!agreedToTerms && !showOtp) && styles.buttonDisabled]}
                        onPress={showOtp ? handleVerifyOTP : handleSendOTP}
                        disabled={!agreedToTerms && !showOtp}
                    >
                        <Text style={styles.buttonText}>
                            {showOtp ? 'Verify OTP' : 'Send OTP'}
                        </Text>
                    </TouchableOpacity>

                    {showOtp && (
                        <TouchableOpacity onPress={handleSendOTP}>
                            <Text style={styles.resendText}>Resend OTP</Text>
                        </TouchableOpacity>
                    )}
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
    content: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    omSymbol: {
        fontSize: 48,
        color: COLORS.primary,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.gray,
    },
    form: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 8,
    },
    phoneInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
        color: COLORS.black,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    fullInput: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
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
    link: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
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
    resendText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
