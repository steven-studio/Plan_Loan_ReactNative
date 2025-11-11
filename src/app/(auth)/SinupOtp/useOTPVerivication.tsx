import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import strings from '../../../Languages';
import { Verifyotp } from '../../api/apiRequest';
 

export const useOtpVerification = (cellCount: number = 6) => {
  const navigation = useNavigation();
  const route :any= useRoute();
  const { email } = route.params || {};

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const handleChangeText = (text: string) => {
    setValue(text);
    setErrorMessage(text.length < cellCount ? strings?.enterCode : '');
  };

  const handleVerifyOTP = async () => {
    if (value.length !== cellCount) {
      setErrorMessage(strings?.enterCode);
      return;
    }

    setIsLoading(true);
    try {
      const params = {  email ,value,  };
      await Verifyotp(params, setIsLoading,navigation);
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
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
    email
  };
};