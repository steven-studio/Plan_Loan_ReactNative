import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import strings from '../Languages';
import StatusBarComponent from '../components/StatusBarComponent';
import CustomHeader from '../components/CustomHeader';
import { base_url } from './api';

const LegalPoliciesScreen = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

   const fetchTerms = async () => {
    try {
      const response = await axios.get(`${base_url}admin/terms/active`);
       if (response.data?.success && response.data?.data?.content) {
        setContent(response.data.data.content);
      } else {
        setError('Failed to load terms & conditions.');
      }
    } catch (err) {
      console.log('API Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
<CustomHeader label={strings.terms}/>

       
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {loading ? (
          <ActivityIndicator size="30" color="black" style={{ marginTop: 50 }} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : content ? (
          <HTML
            source={{ html: content }}
            contentWidth={width}
            tagsStyles={styles.htmlStyles}
          />
        ) : (
          <Text style={styles.bodyText}>No terms available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// 🔧 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 11,
    paddingBottom: 15,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334155',
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 40, 
    marginTop:20
  },
  htmlStyles: {
    p: {
      fontSize: 14,
      color: '#333',
      lineHeight: 24,
      fontWeight: '500',
      marginTop: 8,
    },
    h1: {
      fontSize: 22,
      color: '#000',
      marginBottom: 10,
    },
    h2: {
      fontSize: 18,
      color: '#222',
      marginBottom: 8,
      marginTop: 12,
    },
    a: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
    li: {
      fontSize: 14,
      color: '#333',
      lineHeight: 22,
    },
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default LegalPoliciesScreen;