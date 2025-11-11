// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
 import { loadLanguage } from '../../Languages';
import { restoreLogin } from '../../redux/feature/authSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        // 🔹 Load saved language (your existing function)
        await loadLanguage();

        // 🔹 Optional splash delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 🔹 Check login data in AsyncStorage
        const savedAuth = await AsyncStorage.getItem('authData');

        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          if (parsed?.token) {
            // ✅ Restore user session in Redux
            dispatch(restoreLogin(parsed));

            // ✅ Navigate to main TabLayout
            navigation.replace('TabLayout');
            return;
          }
        }

        // ❌ Not logged in → go to onboarding screen
        navigation.replace('Onboarding');
      } catch (error) {
        console.error('Splash Error:', error);
        navigation.replace('Onboarding');
      }
    };

    initApp();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topSpacer} />
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A', // bg-blue-900
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  topSpacer: {
    height: 200,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 200,
  },
  logo: {
    width: 240,
    height: 240,
  },
});

export default SplashScreen;