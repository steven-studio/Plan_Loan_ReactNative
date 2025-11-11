import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { base_url } from '../../api';
import { errorToast, successToast } from '../../api/customToast';
import strings from '../../../Languages';

export const useCreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route: any = useRoute();
  const { user } = route?.params || {};

 
  const handlePassText = (text: string) => {
    setPassword(text);
    if (!text || text.length < 6) {
      setPasswordError(strings.pasCharacters ||"");
    } else {
      setPasswordError('');
    }

    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordError(strings?.passwordMatch ||"");
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleCPassText = (text: string) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setConfirmPasswordError(strings?.passwordMatch ||"");
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSetPassword = async () => {
    if (!password) {
      setPasswordError(strings?.passwordrequired ||"");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError(strings?.confirmrequired ||"");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(strings?.passwordMatch ||"");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${base_url}user/reset-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          password,
          confirmPassword,
          resetToken: user?.resetToken,
        }),
      });

      const parsedResponse = await response.json();
      console.log("parsedResponse", parsedResponse);

      if (parsedResponse?.statusCode === 200 || parsedResponse?.statusCode === 201) {
        successToast(parsedResponse.message || 'Password reset successfully');
        navigation.navigate('Login'); // ✅ Navigate to Login screen
      } else {
        errorToast(parsedResponse.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('❌ Reset password error:', error);
      errorToast('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isLoading,
    handlePassText,
    handleCPassText,
    handleSetPassword,
    navigation,
  };
};