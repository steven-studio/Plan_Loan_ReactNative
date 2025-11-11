import React, { useState } from 'react';
import { 
  Alert, 
   ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Linking, 
  StyleSheet, 
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your custom components
import Navbar from '../../../components/Navbar';
import HamburgerMenu from '../../../components/HamburgerMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../../../Languages';
import StatusBarComponent from '../../../components/StatusBarComponent';

export default function HelpScreen() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  

  const openURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", `Cannot open this URL: ${url}`);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };
 const handleCallPress = async (number) => {
    const url = `tel:${number}`; // iOS/Android dono ke liye kaam karta hai
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Error', 'Phone dialer is not available on this device');
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.error('Failed to open dialer', err);
      Alert.alert('Error', 'Could not open phone dialer');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
            <StatusBarComponent/>

      <ScrollView  
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
      >
        {/* Header */}
        	<View style={{
				  flexDirection: 'row',
				  alignItems: 'center',
				  justifyContent: 'space-between',
				  marginHorizontal: 16,
				  marginTop: 16,
				  marginBottom: 24,
				  paddingVertical: 8
				}}>
				  {/* Left side - Hamburger menu */}
				  <TouchableOpacity
					style={{
					  borderWidth: 1,
					  borderColor: '#FACC15',
					  borderRadius: 12,
					  padding: 8
					}}
					onPress={() => setShowHamburgerMenu(true)}
				  >
					<Image
					  source={require('../../../assets/images/icons/menu.png')}
					  resizeMode="contain"
					  style={{ width: 24, height: 24 }}
					/>
				  </TouchableOpacity>
		
				  {/* Center - Title */}
				  <Text style={{ color: '#374061', fontSize: 24, fontWeight: 'bold' }}>
					 {strings.Help}
				  </Text>
		
				  {/* Right side - Action buttons */}
				  <View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
					  style={{
						borderWidth: 1,
						borderColor: '#FACC15',
						borderRadius: 12,
						padding: 8,
						marginRight: 16
					  }}
				 onPress={() => handleCallPress("904834")}

					>
					  <Image
						source={require('../../../assets/images/icons/call.png')}
						resizeMode="contain"
						style={{ width: 24, height: 24 }}
					  />
					</TouchableOpacity>
					<TouchableOpacity
					  style={{
						borderWidth: 1,
						borderColor: '#FACC15',
						borderRadius: 12,
						padding: 8
					  }}
					  onPress={() => navigation.navigate('Notifications')}
					>
					  <Image
						source={require('../../../assets/images/icons/notification.png')}
						resizeMode="contain"
						style={{ width: 24, height: 24 }}
					  />
					</TouchableOpacity>
				  </View>
				</View>

        {/* Help Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => openURL('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/qlwaq00b_expires_30_days.png')}>
            <Text style={styles.optionText}>{strings.HelpCenter}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => openURL('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/y5npt4d5_expires_30_days.png')}>
            <Text style={styles.optionText}>{strings?.FAQ}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => openURL('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/jahr92jf_expires_30_days.png')}>
            <Text style={styles.optionText}>{strings?.ContactSupport}</Text>
          </TouchableOpacity>
        </View>

        {/* Request Support */}
        <View style={styles.supportContainer}>
          <Text style={styles.sectionTitle}>{strings?.RequestSupport}</Text>

          <Text style={styles.label}>{strings?.Subject}</Text>
          <TextInput
            placeholder={strings?.Entersubject}
            value={subject}
            onChangeText={setSubject}
            style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>{strings?.Message}</Text>
          <TextInput
            placeholder={strings?.EnterMess}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholderTextColor="#9CA3AF"
          />  

          <TouchableOpacity style={styles.submitButton} onPress={() => alert('Support request submitted!')}>
            <Text style={styles.submitButtonText}>{strings?.Continue}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar & Hamburger */}
      {/* <Navbar onLogout={handleLogout} /> */}
      <HamburgerMenu visible={showHamburgerMenu} onClose={() => setShowHamburgerMenu(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 8
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#FACC15',
    borderRadius: 12,
    padding: 8
  },
  rightIcons: {
    flexDirection: 'row'
  },
  rightIconSpacing: {
    marginRight: 16
  },
  headerTitle: {
    color: '#374061',
    fontSize: 24,
    fontWeight: 'bold'
  },
  optionsContainer: {
    marginHorizontal: 16,
    marginBottom: 16
  },
  optionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    elevation: 3 
  },
  optionText: { 
    flex: 1, 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#000000' 
  },
  supportContainer: {
    marginHorizontal: 16,
    marginBottom: 64
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 16
  },
  input: {  
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#EAEAEA', 
    borderRadius: 12, 
    padding: 12, 
    fontSize: 16, 
    color: '#1F2937' 
  },
  submitButton: { 
    backgroundColor: '#1E3A8A', 
    borderRadius: 12, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginTop: 24 ,
    height:55 ,
    justifyContent:"center"
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  }
});