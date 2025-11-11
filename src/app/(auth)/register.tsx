import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  StyleSheet
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import { RegisterApi } from '../api/apiRequest';
import LoadingModal from '../../components/LoadingModal';
import { useNavigation } from '@react-navigation/native';
// import { Checkbox } from 'react-native-paper';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

const navigator = useNavigation()
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
 
    try {
      const params = {
        email,
        password,
        confirmPassword,
        navigator,
      };

      const response = await RegisterApi(params, setLoading);

      if (response?.status == 1) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigate to create profile');
              // navigation.navigate(ScreenNameEnum.CreateProfile);
            },
          },
        ]);
      }
    } catch (error) {
      console.log('Registration error:', error);
      Alert.alert('Registration Failed', 'Failed to register. Please try again.');
    }
  };



  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      // For development purposes, show a dialog
      Alert.alert(
        'Google Sign-In',
        'This is a development placeholder for Google Sign-In',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Sign In',
            onPress: () => {
              // Simulate loading state
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                // Simulate a successful Google sign-in
                const mockGoogleUser = {
                  email: 'google.user@example.com',
                  name: 'Google User',
                  id: '123456789'
                };
                console.log("Google sign-in success:", mockGoogleUser);
                console.log('Navigate to create profile'); // Replace with your navigation
              }, 1500);
            }
          }
        ]
      );
    } catch (error) {
      console.log("Google sign in error:", error);
      Alert.alert('Google Sign-In Failed', 'Please try again.');
    }
  };

  // Handle Apple Sign-In
  const handleAppleSignIn = async () => {
    try {
      // In a real implementation, you would use AppleAuthentication here
      // For now, we'll show a development authentication dialog
      Alert.alert(
        'Apple Sign-In',
        'This is a development placeholder for Apple Sign-In',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Sign In',
            onPress: () => {
              // Simulate loading state
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                console.log('Navigate to create profile'); // Replace with your navigation
              }, 1500);
            }
          }
        ]
      );
    } catch (error) {
      console.log("Apple sign in error:", error);
      Alert.alert('Apple Sign-In Failed', 'Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <LoadingModal visible={loading}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* Auth Background Image */}
            <View style={styles.imageContainer}>
              <Image
                              source={require('../../assets/images/auth/bg.png')} // Update path as needed

                 style={styles.backgroundImage}
              />
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Let's get started by creating your account</Text>
              </View>
            </View>
            
            {/* Form Section */}
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email Address</Text>
         
       <CustomInput
                placeholder="Enter your email"
        
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
             
           
              />
              <Text style={styles.label}>Password</Text>
            
                 <CustomInput
                placeholder="Password"
              secureTextEntryToggle
             value={password}
                onChangeText={setPassword}
             
             
           
              />

              <Text style={styles.label}>Confirm Password</Text>
               <CustomInput
   placeholder="Confirm your password"              secureTextEntryToggle
            value={confirmPassword}
                onChangeText={setConfirmPassword}
             
           
              />
 

              <View style={styles.checkboxContainer}>
                {/* <Checkbox
                  status={termsAccepted ? 'checked' : 'unchecked'}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                  color="#6366F1"
                /> */}
                <Text style={styles.checkboxText}>
                  I agree to the{' '}
                  <Text style={styles.boldText}>Terms & Conditions</Text> and{' '}
                  <Text style={styles.boldText}>Privacy Policy</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
              
              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGoogleSignIn}
                >
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleAppleSignIn}
                >
                  <Image
                    source={require('../../assets/images/apple.png')} // Update path as needed
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigator.navigate("Login")}>
                  <Text style={styles.footerLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Custom TextInput component since we removed react-native-paper
const TextInput = ({ style, secureTextEntry, ...props }) => {
  return (
    <TextInput
      style={[styles.textInputBase, style]}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    position: 'relative',
    zIndex: 10,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    marginTop:10,
  },
  textInputBase: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    height: 56,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
    marginTop:13
  },
  boldText: {
    fontWeight: '600',
    color: '#111827',
  },
  button: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  footerLink: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
  },
});

export default RegisterScreen;