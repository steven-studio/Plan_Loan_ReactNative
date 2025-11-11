import React, { useState, useEffect } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import strings, { loadLanguage, changeAppLanguage } from '../Languages';
import DeleteAccountModal from './DeleteAccountModal';
import { Alert } from 'react-native';
import { logout } from '../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = async ({ reason }) => {
    // Example: show confirm native alert before doing network call (optional)
    // You can call your API here. Example with fetch:
    const confirmed = await new Promise(resolve => {
      Alert.alert(
        "Final confirm",
        "This will permanently delete your account. Continue?",
        [
          { text: "No", onPress: () => resolve(false), style: "cancel" },
          { text: "Yes", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
    if (!confirmed) throw new Error("User cancelled final confirmation");

    // simulate async API:
    await new Promise(res => setTimeout(res, 1500));

    // Call real API:
    // await fetch('https://api.example.com/delete-account', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ...' },
    //   body: JSON.stringify({ reason }),
    // });

    // after success:
    Alert.alert("Deleted", "Your account has been deleted.");
    // navigate or reset app state as needed
    // navigation.replace("Auth");
  };

  useEffect(() => {
    const initLang = async () => {
      await loadLanguage();
      setIsReady(true);
    };
    initLang();
  }, []);

  // Navigation handler
  const handleNavigation = (route: string) => {
    onClose();
    navigation.navigate(route);
  };
  const userData: any = useSelector((state: any) => state.auth.userData);
   const dispatch = useDispatch()
  // Logout handlers
  const handleLogoutPress = () => setShowLogoutModal(true);
  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    onClose();
     dispatch(logout());
    await AsyncStorage.removeItem('authData');
    navigation.replace('Login');
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  // Language handlers
  const handleLanguagePress = () => setShowLanguageModal(true);

  const handleLanguageSelect = async (lang: 'en' | 'zh') => {
    await changeAppLanguage(lang);
    setShowLanguageModal(false);

  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      {/* Main Hamburger Menu */}
      <Modal
        visible={visible && !showLogoutModal && !showLanguageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Menu Content */}
          <View style={{
            width: '85%',
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 20,
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2
          }}>
            <ScrollView
              contentContainerStyle={{
                paddingTop: 60,
                paddingBottom: 30
              }}
              showsVerticalScrollIndicator={false}
            >

              {/* Profile Section */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 16,
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#F0F0F0'
              }}>
                <View style={{
                  width: 45,
                  height: 45,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,

                    }}
                    source={{ uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png" }} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 6 }}>{userData?.fullName}</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{userData?.email}</Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#F3F4F6',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 10 }}>
                {[
                  { key: 'home', label: strings.home, icon: '🏠' },
                  { key: 'HelpFeedback', label: strings.helpFeedback, icon: '❓' },
                  { key: 'FAQScreen', label: strings.faq, icon: '❓' },

                  { key: 'LegalPoliciesScreen', label: strings.terms, icon: '📄' },
                  { key: 'HowToUseScreen', label: strings.howToUse, icon: '🎯', },

                  // {
                  //   key: 'PrivacyPolicyScreen', label: strings.PrivacyPolicy, icon: '🎯',

                  // },
                  {
                    key: 'ChangePasswordScreen', label: strings.ChangePasswordScreen, icon: '🎯',

                  },

                  { key: 'language', label: strings.changeLanguage, icon: '🌐', action: handleLanguagePress }
                ].map((item, index) => (
                  <TouchableOpacity
                    key={item.key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 15,
                      paddingHorizontal: 12,
                      borderRadius: 12,
                      backgroundColor: "white",
                      borderBottomWidth: 0.8,


                    }}
                    onPress={item.action || (() => handleNavigation(item.key))}
                  >
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(true)} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: "white",
                  // Android shadow
                  // iOS shadow

                  paddingVertical: 15,
                  paddingHorizontal: 17,

                }}
              >
                <Text style={{ color: '#DC2626', fontSize: 17, fontWeight: '600' }}>{strings.DeleteAccount}</Text>
              </TouchableOpacity>
              {/* Logout Button */}

              {/* App Version */}

            </ScrollView>
            <TouchableOpacity
              onPress={handleLogoutPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
                marginHorizontal: 15,
                marginBottom: 20,
                paddingVertical: 15,
                paddingHorizontal: 16,

              }}
            >
              <Text style={{ color: '#DC2626', fontSize: 17, fontWeight: '600' }}>{strings.logout}</Text>
            </TouchableOpacity>

          </View>

          {/* Overlay */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={onClose}
            activeOpacity={1}
          />
          <DeleteAccountModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={handleDelete}
            requireReason={true}
            title={strings?.DeleteAccount}
            message={strings?.deleteText}
          />
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent animationType="fade" onRequestClose={handleLogoutCancel}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 24,
            width: 320,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 10
          }}>
            {/* Icon */}
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#FEF2F2',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12
              }}>
                <Text style={{ fontSize: 28 }}>🚪</Text>
              </View>
            </View>

            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: 8
            }}>
              {strings.logoutConfirmTitle}
            </Text>
            <Text style={{
              fontSize: 15,
              color: '#6B7280',
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 20
            }}>
              {strings.logoutConfirmMessage}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={handleLogoutCancel}
                style={{ flex: 1, marginRight: 8 }}
              >
                <View style={{
                  backgroundColor: '#F3F4F6',
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    {strings.no}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogoutConfirm}
                style={{ flex: 1, marginLeft: 8 }}
              >
                <View style={{
                  backgroundColor: '#DC2626',
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: 'center'
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600'
                  }}>
                    {strings.yes}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal visible={showLanguageModal} transparent animationType="fade" onRequestClose={() => setShowLanguageModal(false)}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 24,
            width: 320,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 10
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 20,
              textAlign: 'center'
            }}>
              {strings?.selectLanguage}
            </Text>
            {[
              { lang: 'en', label: strings.english, flag: '🇺🇸' },
              { lang: 'zh', label: strings.chinese, flag: '🇨🇳' },
              { lang: 'tw', label: strings.taiwanese, flag: '🇹🇼' },
            ].map((language) => (
              <TouchableOpacity
                key={language.lang}
                onPress={() => handleLanguageSelect(language.lang as 'en' | 'zh')}
                style={{ marginBottom: 12 }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: '#F8F9FA',
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <Text style={{ fontSize: 20, marginRight: 12 }}>{language.flag}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>
                    {language.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setShowLanguageModal(false)}
              style={{ marginTop: 8 }}
            >
              <View style={{
                paddingVertical: 14,
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#F3F4F6',
                borderWidth: 1,
                borderColor: '#E5E7EB'
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  {strings.close}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </>
  );
};

export default HamburgerMenu;