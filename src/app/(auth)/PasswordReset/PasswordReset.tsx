import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import React from 'react';
 
import { SafeAreaView } from 'react-native-safe-area-context';
 import { styles } from './style';
import { usePasswordReset } from './usePasswordReset';
 
 import { StatusBar } from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import strings from '../../../Languages';
import LoadingModal from '../../../components/LoadingModal';
export default function PasswordReset() {
  const {
    email,
    phone,
    emailError,
    loading,
    handleIdentityText,
    setPhone,
    passFunction,
    navigation
  } = usePasswordReset();
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
         <StatusBar barStyle="dark-content" />
   
            <CustomHeader label="" />
   <LoadingModal visible={loading}/>
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* <CustomBackHeader menuIcon={imageIndex.back} label={"Back"} /> */}
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text allowFontScaling={false} style={styles.titleText}>{strings?.PasswordReset}</Text>
            <Text allowFontScaling={false} style={styles.descriptionText}>{strings?.pleaseputgmail}</Text>
          </View>
        </View>
        <View style={{
          marginTop: 14
        }}>
          <CustomInput
            placeholder={strings?.EnteryourEmail}
            // leftIcon={<Image source={imageIndex.Email}  style={{
            //   height:20,
            //   width:20,
            //   resizeMode:"contain"
            // }} />}
            value={email}
            onChangeText={handleIdentityText}
            keyboardType='email-address'

          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        </View>
      <Image   source ={(require("../../../assets/images/home/gmail.png"))} style={{ width: 327, top: 40, height: 280, alignSelf: 'center', marginTop: 30 }} /> */}

      </ScrollView>
<View style={{
    marginHorizontal:15
}}>
      <CustomButton title={strings?.Send}
        onPress={passFunction}
        // onPress={() => navigation.navigate("OTP")}         
        style={{ marginBottom: 25 ,  
}} />
</View>
    </SafeAreaView>
  );
}