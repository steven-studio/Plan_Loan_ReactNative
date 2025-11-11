import React from 'react';
import { 
  Image, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../components/StatusBarComponent';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
                  <StatusBarComponent/>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image
              source={require('../../../assets/images/icons/back.png')}
              style={styles.backIcon}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            This Privacy Policy describes how we collect, use, and protect your personal information when you use our loan risk assessment application.
          </Text>

          <Text style={styles.subTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information you provide directly to us, such as when you create an account, apply for a loan, or contact us for support. This may include your name, email address, phone number, financial information, and other personal details.
          </Text>

          <Text style={styles.subTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect to provide, maintain, and improve our services, process loan applications, communicate with you, and comply with legal obligations.
          </Text>

          <Text style={styles.subTitle}>3. Information Sharing</Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
          </Text>

          <Text style={styles.subTitle}>4. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>

          <Text style={styles.subTitle}>5. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.
          </Text>

          <Text style={styles.subTitle}>6. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact us at privacy@loanrisk.com or through our support channels.
          </Text>

          <Text style={styles.footer}>Last updated: January 2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    marginBottom: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#334155', // slate-700
  },
  content: {
    marginHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: '#475569', // slate-600
    marginBottom: 12,
    lineHeight: 22,
  },
  footer: {
    fontSize: 12,
    color: '#94a3b8', // slate-500
    textAlign: 'center',
    marginBottom: 16,
  },
});