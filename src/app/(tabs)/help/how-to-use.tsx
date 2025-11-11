import React from 'react';
import { Image,      ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../../../Languages';
import StatusBarComponent from '../../../components/StatusBarComponent';

export default function HowToUseScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarComponent/>

      <ScrollView  showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 24, marginBottom: 32 }}>
          <TouchableOpacity onPress={handleBackPress} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
            <Image
  source={require('../../../assets/images/icons/back.png')}              resizeMode="stretch"
              style={{ width: 36, height: 36 }}
            />
          </TouchableOpacity>
          <Text style={{ color: '#374151', fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
              {strings.howToUse}
          </Text>
          <View style={{ width: 36, height: 36 }} />
        </View>

        {/* Content */}
        <View style={{ marginHorizontal: 24 }}>
          {/* Introduction */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#374151', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
             {strings?.welcomehow} Risk
            </Text>
            <Text style={{ color: '#4B5563', fontSize: 16, lineHeight: 24 }}>
              {strings?.depLoan}
            </Text>
          </View>

          {/* Steps */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#374151', fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>
             {strings?.gettingStarted}
            </Text>

            {/* Step 1 */}
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={{ width: 32, height: 32, backgroundColor: '#2563EB', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 4 }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>1</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                 {strings?.createProfile}
                </Text>
                <Text style={{ color: '#4B5563', fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
                  {strings?.startby}
                 </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditProfileScreen')} // replace with your screen name
                  style={{ backgroundColor: '#DBEAFE', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: 'bold' }}>{strings?.goto}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Step 2 */}
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={{ width: 32, height: 32, backgroundColor: '#2563EB', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 4 }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                 {strings?.exploreLoan}
                </Text>
                <Text style={{ color: '#4B5563', fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
                {strings?.exploreLoandep}
                 </Text>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Loan')}
                  style={{ backgroundColor: '#DCFCE7', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#16A34A', fontSize: 12, fontWeight: 'bold' }}>{strings?.viewLoans}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Step 3 */}
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={{ width: 32, height: 32, backgroundColor: '#2563EB', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 4 }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>3</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                  {strings?.ApplyforLoa}
                </Text>
                <Text style={{ color: '#4B5563', fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
                  {strings?.appyLoanDep}
                 </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ApplyLoanScreen')}
                  style={{ backgroundColor: '#EDE9FE', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#7C3AED', fontSize: 12, fontWeight: 'bold' }}>{strings.applyNow}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Step 4 */}
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={{ width: 32, height: 32, backgroundColor: '#2563EB', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16, marginTop: 4 }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>4</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                 {strings?.trackYour}
                </Text>
                <Text style={{ color: '#4B5563', fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
                  {strings?.trackdep}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}
                  style={{ backgroundColor: '#FFEDD5', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#F97316', fontSize: 12, fontWeight: 'bold' }}>{strings?.viewNot}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* You can continue converting Features, Tips, and Support sections the same way */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}