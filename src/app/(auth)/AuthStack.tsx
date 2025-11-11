// navigation/AuthStack.js
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './splash';
import OnboardingScreen from './onboarding';
import CreateProfileScreen from './create-profile';
import RegisterScreen from './register';
import UploadCameraScreen from './upload-camera';
import UploadGalleryScreen from './upload-gallery-new';
 
import ChangePasswordScreen from '../(tabs)/settings/ChangePasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './login';
import PasswordReset from './PasswordReset/PasswordReset';
import OtpScreen from './OTPScreen/OtpScreen';
import CreatePassword from './CreateNewPassword/CreateNewPassword';
import TabLayout from '../(tabs)/BottomTabs';
import NotificationsScreen from '../(tabs)/notifications';
import EditProfileScreen from '../(tabs)/profile/EditProfileScreen';
import HowToUseScreen from '../(tabs)/help/how-to-use';
import HelpFeedbackScreen from '../(tabs)/help/feedback';
import LegalPoliciesScreen from '../LegalPoliciesScreen';
import BottomTabs from '../(tabs)/BottomTabs';
import ApplyLoanScreen from '../ApplyLoanScreen';
import ApplyLoan from '../(tabs)/loan/ApplyLoan';
import { loadLanguage } from '../../Languages';
import { ActivityIndicator, View } from 'react-native';
import PrivacyPolicyScreen from '../(tabs)/settings/PrivacyPolicyScreen';
import RepayLoanScreen from '../(tabs)/loan/RepayLoanScreen';
import ChatScreen from '../(tabs)/help/chat';
import Toast from 'react-native-toast-message';
import toastConfig from '../api/customToast';
import { Provider } from 'react-redux';
import { persistor, store } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import FAQScreen from '../(tabs)/help/faq';
import SinupOtp from './SinupOtp/SinupOtp';
 
 
const Stack = createStackNavigator();
 
export default function AuthStack() {
  
 
  return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
     <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={PasswordReset} />  
<Stack.Screen name="OTP" component={OtpScreen} />
  <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
  <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="HowToUseScreen" component={HowToUseScreen} />
    <Stack.Screen name="HelpFeedback" component={HelpFeedbackScreen} />
    <Stack.Screen name="LegalPoliciesScreen" component={LegalPoliciesScreen} />
    <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
    <Stack.Screen name="RepayLoan" component={RepayLoanScreen} />
    <Stack.Screen name="FAQScreen" component={FAQScreen} />
  <Stack.Screen name="CreatePassword" component={CreatePassword} />  
  <Stack.Screen name="TabLayout" component={BottomTabs} />
  <Stack.Screen name="SinupOtp" component={SinupOtp} />
  <Stack.Screen name="ApplyLoanScreen" component={ApplyLoan} />
  
    </Stack.Navigator>
     <Toast config={toastConfig} />
    </NavigationContainer>
         </PersistGate>
    </Provider>
  );
}