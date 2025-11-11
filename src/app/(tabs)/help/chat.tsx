import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../components/StatusBarComponent';

const Navbar = require('../../../components/Navbar').default;

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.replace('Login'); // Replace with your login screen name
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
            <StatusBarComponent/>
 
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/2m6xv8gh_expires_30_days.png" }}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customer Support</Text>
        </View>

        {/* Support Agent Info */}
        <View style={styles.agentContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/3ltzus9w_expires_30_days.png" }}
            style={styles.agentImage}
          />
          <View>
            <Text style={styles.agentName}>John Smith</Text>
            <Text style={styles.agentEmail}>johnsmith@example.com</Text>
          </View>
        </View>

        {/* Agent Message */}
        <View style={styles.messageRow}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/hjefwoxc_expires_30_days.png" }}
            style={styles.messageAvatar}
          />
          <View style={styles.agentMessage}>
            <Text style={styles.agentMessageText}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit maecenas porta fermentum,
            </Text>
          </View>
        </View>
        <Text style={styles.timeTextLeft}>6:05 PM</Text>

        {/* User Message */}
        <View style={styles.userMessageRow}>
          <View style={styles.userMessageContainer}>
            <View style={styles.userMessage}>
              <Text style={styles.userMessageText}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit maecenas porta fermentum,
              </Text>
            </View>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/fgf7h6h7_expires_30_days.png" }}
              style={styles.messageAvatar}
            />
          </View>
          <Text style={styles.timeTextRight}>8:05 PM</Text>
        </View>

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/wufde4mn_expires_30_days.png" }}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Write a message..."
              value={message}
              onChangeText={setMessage}
              style={styles.textInput}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/ai4iacox_expires_30_days.png" }}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X3KVUEZWgu/civ2yl4o_expires_30_days.png" }}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <Navbar onLogout={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  backIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#334155',
  },
  agentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  agentImage: {
    width: 68,
    height: 68,
    marginRight: 12,
    borderRadius: 12,
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 2,
  },
  agentEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
  },
  messageRow: {
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 4,
  },
  messageAvatar: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 24,
  },
  agentMessage: {
    backgroundColor: '#F3F4F6',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: '70%',
  },
  agentMessageText: {
    fontSize: 12,
    color: '#4B5563',
  },
  timeTextLeft: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 80,
    marginBottom: 8,
  },
  userMessageRow: {
    marginBottom: 8,
    marginLeft: 120,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  userMessage: {
    backgroundColor: '#334155',
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    maxWidth: '70%',
  },
  userMessageText: {
    fontSize: 12,
    color: 'white',
  },
  timeTextRight: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginRight: 64,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 28,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 12,
  },
});