import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import CallLogs from 'react-native-call-log';
 
export default function CallLogsScreen() {
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
        const result = await CallLogs.load(10); // last 30 logs
        console.log("result22",result)
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

  const getCallTypeIcon = type => {
    switch (type) {
      case 'OUTGOING':
        return {icon: 'call-outline', color: '#4CAF50'};
      case 'INCOMING':
        return {icon: 'call-received-outline', color: '#2196F3'};
      case 'MISSED':
        return {icon: 'call-missed-outline', color: '#F44336'};
      default:
        return {icon: 'call-outline', color: '#9E9E9E'};
    }
  };

  const handleCall = number => {
    if (!number) return;
    Linking.openURL(`tel:${number}`);
  };

  const renderItem = ({item}) => {
    const {icon, color} = getCallTypeIcon(item.type);
    return (
      <TouchableOpacity
        onPress={() => handleCall(item.phoneNumber)}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          marginHorizontal: 15,
          marginVertical: 6,
          padding: 15,
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}>
        {/* Icon */}
        <View
          style={{
            backgroundColor: color + '20',
            borderRadius: 50,
            padding: 10,
            marginRight: 15,
          }}>
          {/* <Icon name={icon} size={26} color={color} /> */}
        </View>

        {/* Details */}
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#222'}}>
            {item.name || 'Unknown'}
          </Text>
          <Text style={{fontSize: 14, color: '#555'}}>
            {item.phoneNumber || 'Not Available'}
          </Text>
          <Text style={{fontSize: 12, color: '#888', marginTop: 3}}>
            📅 {item.dateTime} • ⏱ {item.duration}s
          </Text>
        </View>

        {/* Call Icon */}
        <TouchableOpacity
          onPress={() => handleCall(item.phoneNumber)}
          style={{
            backgroundColor: '#E8F5E9',
            borderRadius: 50,
            padding: 8,
          }}>
          {/* <Icon name="call" size={22} color="#4CAF50" /> */}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F9F9F9', paddingTop: 10}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 10,
          color: '#333',
        }}>
        📞 Call History
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{marginTop: 40}} />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 40, color: '#777'}}>
              No call logs found
            </Text>
          }
        />
      )}
    </View>
  );
}