import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import strings from '../../../Languages';
import { base_url } from '../../api';
import { successToast, errorToast } from '../../api/customToast'; // ✅ make sure this import is correct

export const useOtpVerification = (cellCount: number = 6) => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { email } = route.params || {};

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // 🔹 handle typing in OTP input
  const handleChangeText = (text: string) => {
    setValue(text);
    if (text.length < cellCount) {
      setErrorMessage(strings?.enterCode);
    } else {
      setErrorMessage('');
    }
  };

  // 🔹 handle OTP verification API call
  const handleVerifyOTP = async () => {
    if (value.length !== cellCount) {
      setErrorMessage(strings?.enterCode);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${base_url}user/verify-reset-otp`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: value,
        }),
      });

      const parsedResponse = await response.json();
 console.log("parsedResponse",parsedResponse)
      if (parsedResponse?.statusCode == 200 || parsedResponse?.statusCode == 201) {
        successToast(parsedResponse.message || 'OTP verified successfully');
        navigation.navigate('CreatePassword', { user:parsedResponse?.data }); // ✅ Navigate to next screen
      } else {
        errorToast(parsedResponse.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('❌ OTP verification error:', error);
      errorToast('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    email,
  };
};