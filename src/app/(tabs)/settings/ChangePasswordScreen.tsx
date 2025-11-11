import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../components/StatusBarComponent';
import { errorToast, successToast } from '../../api/customToast';
import { base_url } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const userData: any = useSelector((state: any) => state.auth.userData);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // State for validation messages
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChangePassword = async () => {
    // Reset previous errors
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    // Validate fields
    let isValid = true;

    if (!currentPassword.trim()) {
      setCurrentPasswordError('Please enter your current password.');
      isValid = false;
    }

    if (!newPassword.trim()) {
      setNewPasswordError('Please enter your new password.');
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError('New password must be at least 6 characters long.');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your new password.');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('New password and confirm password do not match.');
      isValid = false;
    }

    if (!isValid) return;

    // API call
    try {
      setLoading(true);

      const tokenData = await AsyncStorage.getItem('token');
      let token = tokenData;

      try {
        const parsed = JSON.parse(tokenData || '{}');
        if (parsed?.token) token = parsed.token;
      } catch (e) {}

      if (!token) {
        errorToast('User token not found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${base_url}user/change-password/${userData?.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        successToast(result?.message || 'Password changed successfully.');
        navigation.goBack();
      } else {
        errorToast(result?.message || 'Failed to change password.');
      }
    } catch (error) {
      errorToast('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image
              source={require('../../../assets/images/icons/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              style={styles.input}
              secureTextEntry
            />
            {currentPasswordError ? (
              <Text style={styles.errorText}>{currentPasswordError}</Text>
            ) : null}
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              style={styles.input}
              secureTextEntry
            />
            {newPasswordError ? (
              <Text style={styles.errorText}>{newPasswordError}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              style={styles.input}
              secureTextEntry
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Change Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 24,
    paddingTop: 30,
    marginBottom: 32,
    position: 'relative',
  },
  backButton: { position: 'absolute', left: 15 },
  backIcon: { width: 36, height: 36, resizeMode: 'stretch' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#334155' },
  formContainer: { paddingHorizontal: 15 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginBottom: 8 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    padding: 16,
    color: '#334155',
    height: 57,
    fontSize:15,
  },
  errorText: { color: 'red', fontSize: 14, marginTop: 8,marginBottom:5 },
  submitButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    height: 55,
  },
  submitButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});