import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../../../Languages';
import { errorToast, successToast } from '../../api/customToast';
import { base_url } from '../../api';

export const usePasswordReset = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
 
  // Fetch selected role from AsyncStorage
 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validate email input
  const handleIdentityText = (value) => {
    const trimmed = value.trim();
    setEmail(trimmed);

    if (trimmed === '' || !emailRegex.test(trimmed)) {
      setEmailError(strings?.gmailError || 'Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  // Forgot password API call
  const callForgotPasswordAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}user/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
         },
        body: JSON.stringify({
          email: email,
         }),
      });

      const parsedResponse = await response.json();
 
      if (parsedResponse?.statusCode == 200 || parsedResponse?.statusCode == 201) {
        successToast(parsedResponse.message || 'OTP sent successfully');
        navigation.navigate('OTP', { email }); // Pass email to OTP screen
      } else {
        errorToast(parsedResponse.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Forgot Password API Error:', error);
      errorToast('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Validate and trigger API
  const passFunction = async () => {
    if (email.trim() === '') {
      setEmailError(strings?.gmailError || 'Please enter your email');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setEmailError(strings?.gmailError || 'Please enter a valid email');
      return;
    }

    setEmailError('');
    await callForgotPasswordAPI();
  };

  return {
    email,
    setEmail,
    phone,
    setPhone,
    emailError,
    loading,
    handleIdentityText,
    passFunction,
    navigation,
  };
};