import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
 import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import strings from '../../Languages';

// For development only - OTP storage
export const otpStore = new Map();

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  OTP: { identifier: string; isPhone: string };
  ForgotPassword: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    // if (!email) {
    //   Alert.alert(strings.Error, strings.PleaseEnterEmail);
    //   return;
    // }

    // if (!password) {
    //   Alert.alert(strings.Error, strings.PleaseEnterPassword);
    //   return;
    // }

    navigation.navigate('TabLayout', { identifier: email, isPhone: 'false' });

    // try {
    //   setLoading(true);

    //   if (email === 'test@example.com' && password === 'password') {
    //     navigation.replace('Tabs');
    //     setLoading(false);
    //     return;
    //   }

    //   const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //   otpStore.set(email, {
    //     otp,
    //     createdAt: new Date(),
    //     attempts: 0,
    //   });

    //   console.log(`OTP for ${email}: ${otp}`);
    //   Alert.alert('Development Mode', `Your OTP is: ${otp}`);

    //   navigation.push('OTP', { identifier: email, isPhone: 'false' });
    //   setLoading(false);
    // } catch (error) {
    //   Alert.alert('Login Failed', 'Failed to login. Please try again.');
    //   setLoading(false);
    // }
  };

  const handleGoogleSignIn = async () => {
    Alert.alert('Google Sign-In', 'Development placeholder', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign In',
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigation.replace('Tabs');
          }, 1500);
        },
      },
    ]);
  };

  const handleAppleSignIn = async () => {
    Alert.alert('Apple Sign-In', 'Development placeholder', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign In',
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigation.replace('Tabs');
          }, 1500);
        },
      },
    ]);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            {/* Background Image */}
            <View style={{ height: 288, position: 'relative' }}>
              <Image
                source={require('../../assets/images/auth/bg.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View style={{  backgroundColor: 'rgba(0,0,0,0.2)' }} />
              <View
                style={{
                  position: 'absolute',
                  bottom: 32,
                  left: 24,
                  right: 24,
                }}
              >
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
                  {strings.WelcomeBack}
                </Text>
                <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
                  {strings.LoginSubtitle}
                </Text>
              </View>
            </View>

            {/* Form */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                marginTop: -24,
                paddingHorizontal: 24,
                paddingVertical: 32,
                zIndex: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#4B5563', marginBottom: 8 }}>
                {strings.Email}
              </Text>
         <CustomInput
              placeholder={strings?.EnteryourEmail}
               value={email}
        onChangeText={setEmail}
              
              />
              <Text style={{ marginTop:11, fontSize: 16, fontWeight: '500', color: '#4B5563', marginBottom: 8 }}>
                {strings.PasswordLabel}
              </Text>
                <CustomInput
              placeholder={strings?.Password}
              secureTextEntryToggle
                 value={password}
                onChangeText={setPassword}
             
             
           
              />
              
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginBottom: 20 }}
                onPress={() => navigation.push('ForgotPassword')}
              >
                <Text style={{ color: '#2563EB', marginTop:15 ,fontSize: 14, fontWeight: '500' }}>{strings.ForgotPassword}</Text>
              </TouchableOpacity>
{/* 
              <Button
                mode="contained"
                onPress={handleLogin}
                style={{ marginTop: 8, borderRadius: 12, height: 56, backgroundColor: '#1E40AF' }}
                contentStyle={{ height: 56 }}
                loading={loading}
                disabled={loading}
                labelStyle={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              >
                登入
              </Button> */}
<CustomButton title={strings?.LogIn}    onPress={handleLogin}/>
              {/* Divider */}
              <View style={{  flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
                <Text style={{ marginHorizontal: 16, color: '#6B7280', fontSize: 12 }}>
                  {strings.OtherSignIn}
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
              </View>

              {/* Social Login */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 56,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    backgroundColor: '#fff',
                    marginHorizontal: 4,
                  }}
                  onPress={handleGoogleSignIn}
                >
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={{ width: 24, height: 24, marginRight: 12 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#4B5563', fontSize: 14, fontWeight: '500' }}>{strings.Google}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 56,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    backgroundColor: '#fff',
                    marginHorizontal: 4,
                  }}
                  onPress={handleAppleSignIn}
                >
                  <Image
                    source={require('../../assets/images/apple.png')}
                    style={{ width: 24, height: 24, marginRight: 12 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#4B5563', fontSize: 14, fontWeight: '500' }}>{strings.Apple}</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
                <Text style={{ color: '#6B7280', fontSize: 14 }}>{strings.NoAccount} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={{ color: '#1E40AF', fontSize: 14, fontWeight: '600' }}>{strings.SignUp}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8', // optional
  },
  input: {
    height: 56,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
