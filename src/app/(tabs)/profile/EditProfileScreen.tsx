import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import PhotoPickerModal from '../../../components/PhotoPickerModal';
import strings from '../../../Languages';
import StatusBarComponent from '../../../components/StatusBarCompoent';

const Navbar = require('../../../components/Navbar').default;

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('John Smith');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('1990-12-19');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date('1990-12-19'));
  const [phoneNumber, setPhoneNumber] = useState('+123 4567890');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('United States');
  const [gender, setGender] = useState('Male');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.replace('LoginScreen'),
      },
    ]);
  };

  const handleCamera = () => {
    setShowPhotoModal(false);
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.7,
        saveToPhotos: true,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets?.[0].uri || null);
        }
      }
    );
  };

  const handleGallery = () => {
    setShowPhotoModal(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets?.[0].uri || null);
        }
      }
    );
  };

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <SafeAreaView style={styles.container}>
            <StatusBarComponent/>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image
              source={require('../../../assets/images/icons/back.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{strings.EditProfile}</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => setShowPhotoModal(true)} style={{ marginBottom: 24 }}>
            <Image
              source={imageUri ? { uri: imageUri } : require('../../../assets/images/profile/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.editOverlay}>
              <Text style={styles.editText}>✎</Text>
            </View>
          </TouchableOpacity>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings?.FuName}</Text>
              <TextInput
                placeholder= {strings?.fullname}
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Password */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings?.Password}</Text>
              <TextInput
                placeholder={strings?.Enteryourpassword}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Date of Birth */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings.DateBirth}</Text>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={[
                    styles.inputText,
                    dateOfBirth ? styles.inputTextFilled : styles.inputTextPlaceholder,
                  ]}
                >
                  {dateOfBirth || 'Select your DOB'}
                </Text>
              </TouchableOpacity>

              {/* iOS Modal */}
              {Platform.OS === 'ios' && showDatePicker && (
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      value={tempDate}
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setTempDate(selectedDate);
                        }
                      }}
                    />
                    <View style={styles.modalButtons}>
                      <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.cancelBtn}>
                        <Text style={styles.cancelText}>{strings.Cancel}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const formattedDate = tempDate.toISOString().split('T')[0];
                          setDateOfBirth(formattedDate);
                          setShowDatePicker(false);
                        }}
                        style={styles.doneBtn}
                      >
                        <Text style={styles.doneText}>{strings?.Done}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Android Picker */}
              {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={new Date(dateOfBirth)}
                  maximumDate={new Date()}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formattedDate = selectedDate.toISOString().split('T')[0];
                      setDateOfBirth(formattedDate);
                    }
                  }}
                />
              )}
            </View>

            {/* Gender */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings?.Gender}</Text>
              <Dropdown
                style={styles.dropdown}
                data={genderOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={(item) => setGender(item.value)}
                placeholderStyle={styles.inputTextPlaceholder}
                selectedTextStyle={styles.inputTextFilled}
              />
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings?.PhoneNumber}</Text>
              <TextInput
                placeholder={strings?.PhoneNumber}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Address */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{strings?.Address}</Text>
              <TextInput
                placeholder={strings?.Address}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={4}
                style={[styles.input, { height: 96, textAlignVertical: 'top' }]}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Country */}
            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                placeholder="Enter your country"
                value={country}
                onChangeText={setCountry}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View> */}

            {/* Save Button */}
         
          </View>
        </View>
      </ScrollView>
   <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => {
                Alert.alert('Profile updated successfully!');
                navigation.goBack();
              }}
            >
              <Text style={styles.saveBtnText}>{strings?.SaveChanges}</Text>
            </TouchableOpacity>
 
      {/* Photo Picker Modal */}
      <PhotoPickerModal
        visible={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onCamera={handleCamera}
        onGallery={handleGallery}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { paddingBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 16, marginBottom: 40 },
  backBtn: { marginRight: 16 },
  backIcon: { width: 36, height: 36 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#374151' },
  avatarContainer: { alignItems: 'center', marginHorizontal: 15 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 4,
  },
  editText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  form: { width: '100%' },
  formGroup: { marginBottom: 16, },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937', 
    height:55
  },
  datePicker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
     height:55 ,
  },
  inputText: { flex: 1, fontSize: 16 },
  inputTextFilled: {    
 color: '#1F2937' ,alignItems:"center" },
  inputTextPlaceholder: { color: '#9CA3AF' },
  saveBtn: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    height:50 ,
    justifyContent:"center" ,
    marginHorizontal:16
   },
  saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  // iOS Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  cancelBtn: { padding: 10 },
  doneBtn: { padding: 10 },
  cancelText: { color: '#9CA3AF', fontSize: 16, fontWeight: '600' },
  doneText: { color: '#1E3A8A', fontSize: 16, fontWeight: '600' },
});