import React from 'react';
import {
  Alert,
  Image,
   ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../../../Languages';
import StatusBarComponent from '../../../components/StatusBarCompoent';
 
export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBarComponent/>

      <ScrollView 
	  
	 showsVerticalScrollIndicator={false}
	 style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 16,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/icons/back.png')}
               style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#334155' }}>
 {strings?.Profile}
           </Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => alert('Settings pressed!')}
              style={{
                borderWidth: 1,
                borderColor: '#F59E0B',
                borderRadius: 12,
                padding: 8,
                marginRight: 8,
              }}
            >
              <Image
                source={require('../../../assets/images/icons/call.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={{
                borderWidth: 1,
                borderColor: '#F59E0B',
                borderRadius: 12,
                padding: 8,
              }}
            >
              <Image
                source={require('../../../assets/images/icons/notification.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Content */}
        <View style={{ marginHorizontal: 8 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={require('../../../assets/images/profile/avatar.png')}
               style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#334155' }}>
              John Smith
            </Text>
          </View>

          {/* Social Media Cards */}
          <View style={{ width: '100%', marginBottom: 20 }}>
            {[strings.Facebook, 'Instagram', '上傳更多文案'].map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F5F3FF',
                  borderWidth: 1,
                  borderColor: '#DDD6FE',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#DBEAFE',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: '#3B82F6', fontWeight: 'bold' }}>A</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', color: '#1F2937' }}>{item}</Text>
                  <Text style={{ color: '#6B7280', fontSize: 12 }}>Subhead</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: '#9CA3AF',
                      marginRight: 4,
                    }}
                  />
                  <View
                    style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#9CA3AF' }}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Profile Information Card */}
          <View
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#CBD5E1',
              borderRadius: 12,
              paddingVertical: 12,
              marginBottom: 20,
            }}
          >
            {[
              { label: strings.Gender, value: 'Male' },
              { label: strings.Dob, value: '19-12-1990' },
              { label: strings.Age, value: '18 years old' },
              { label: strings.PhoneNumber, value: '+123 4567890' },
              { label: strings.Address, value: 'Lorem Ipsum Dolor Dorsi' },
              { label:strings.State, value: 'New York' },
            ].map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 16,
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#334155' }}>{item.label}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#9CA3AF' }}>{item.value}</Text>
                </View>
                {index !== 5 && (
                  <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16 }} />
                )}
              </View>
            ))}
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileScreen')}
            style={{
              backgroundColor: '#1E3A8A',
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: 'center',
              marginHorizontal: 5,
              height:50 ,
              justifyContent:"center"
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
               {strings?.EditProfile}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      {/* <Navbar onLogout={handleLogout} /> */}
    </SafeAreaView>
  );
}