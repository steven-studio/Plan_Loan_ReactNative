import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import strings from '../../Languages';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  mainImage: any;
}

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: "最簡單的\n貸款管理\n方式",
      description: "透過 AI 風險評估系統，即時審核您的貸款。快速、安全、可靠",
      mainImage: require('../../assets/images/onboarding/card.png')
    },
    {
      id: 2,
      title: "智慧風險\n評估系統",
      description: "透過先進的 AI 演算法分析您的個人資料，提供專屬的貸款建議",
      mainImage: require('../../assets/images/onboarding/card2.png')
    },
    {
      id: 3,
      title: "安全且\n可靠的\n平台",
      description: "銀行等級的安全機制，確保您的財務資訊始終受到保護",
      mainImage: require('../../assets/images/onboarding/phone.png')
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    // React Navigation push to Login screen
    navigation.navigate('Login'); // Make sure "Login" is registered in your Stack.Navigator
  };

  const currentSlideData = slides[currentSlide];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Background Stars */}
        <View style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {[...Array(20)].map((_, index) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                width: 2,
                height: 2,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 1,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 90 + 5}%`,
              }}
            />
          ))}
        </View>

        {/* Skip Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 48, paddingHorizontal: 24, zIndex: 10 }}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{strings?.skip}</Text>
          </TouchableOpacity>
        </View>

        {/* Side Flowers */}
        <View style={{ position: 'absolute', top: 80, left: -16, zIndex: 5 }}>
          <Image source={require('../../assets/images/onboarding/flower.png')} style={{ width: 96, height: 128 }} resizeMode="contain" />
        </View>

        <View style={{ position: 'absolute', top: 112, right: -16, zIndex: 5 }}>
          <Image source={require('../../assets/images/onboarding/flower2.png')} style={{ width: 112, height: 144 }} resizeMode="contain" />
        </View>

        {/* Main Content */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, zIndex: 10 }}>
          <View style={{ marginBottom: 48 }}>
            <Image
              source={currentSlideData.mainImage}
              style={currentSlide === 2 ? { width: 320, height: 384 } : { width: 320, height: 192 }}
              resizeMode="contain"
            />
          </View>

          {/* Pagination Dots */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={{
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  width: index === currentSlide ? 32 : 8,
                  backgroundColor: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Curved Section */}
      <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 24, paddingVertical: 32 }}>
        <Text style={{ color: '#1e293b', fontSize: 28, fontWeight: 'bold', marginBottom: 16, lineHeight: 36 }}>
          {currentSlideData.title}
        </Text>
        <Text style={{ color: '#6b7280', fontSize: 16, marginBottom: 32, lineHeight: 24 }}>
          {currentSlideData.description}
        </Text>

        <TouchableOpacity onPress={handleNext} style={{ backgroundColor: '#1e40af', borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {currentSlide === slides.length - 1 ?  strings?.getStarted :  strings.next}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}