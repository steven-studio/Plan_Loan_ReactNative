import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useCreateNewPassword } from './useCreateNewPassword';
import LoadingModal from '../../../components/LoadingModal';
import strings from '../../../Languages';

export default function CreatePassword() {
  const {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isLoading,
    handlePassText,
    handleCPassText,
    handleSetPassword,
  } = useCreateNewPassword();

  return (
    <SafeAreaView style={styles.container}>
 
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader />
   <LoadingModal visible={isLoading}/>
        <View style={{ marginHorizontal: 14 }}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text allowFontScaling={false} style={styles.title}>
             {strings?.newPassword}
            </Text>
            <Text allowFontScaling={false} style={styles.description}>
            {strings?.newDep}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text
              allowFontScaling={false}
              style={{
                color: "#49454F",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {strings?.passwordNew}
            </Text>
            <CustomInput
              placeholder=  {strings?.passwordNew}
              value={password}
              onChangeText={handlePassText}
              secureTextEntryToggle
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Text
              allowFontScaling={false}
              style={{
                color: "#49454F",
                fontSize: 14,
                fontWeight: "600",
                marginTop: 18,
              }}
            >
              {strings?.confirmPassword}
            </Text>
            <CustomInput
              placeholder=   {strings?.confirmPassword}
              value={confirmPassword}
              onChangeText={handleCPassText}
              secureTextEntryToggle
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={{ marginHorizontal: 14, marginBottom: 20 }}>
        <CustomButton
          title={strings?.save}
          onPress={handleSetPassword}
          loading={isLoading} // If CustomButton supports a loading state
        />
      </View>
    </SafeAreaView>
  );
}