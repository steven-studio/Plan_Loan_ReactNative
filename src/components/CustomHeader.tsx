import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 

interface IconProps {
  type: 'svg' | 'png';
  icon: any;
  onPress: () => void;
  textstyle:any
}

interface Props {
  label?: string;
  leftIcon?: any;
  leftType?: 'svg' | 'png';
  leftPress?: () => void;
  rightIcons?: IconProps[];
}

const  CustomHeader: React.FC<Props> = ({
  label = '',
  leftIcon,
  leftType = 'png',
  leftPress,
  rightIcons = [],
  textstyle
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Left Icon */}
      <View style={styles.sideContainer}>
      
          <TouchableOpacity
            onPress={leftPress ? leftPress : () => navigation.goBack()}
            style={styles.iconWrap}
          >
          <Image    source ={(require("../assets/images/home/topBack.png"))}style={styles.icon} resizeMode="contain" /> 
          </TouchableOpacity>
      </View>
      {/* Title */}
      <View style={styles.centerContainer}>
        <Text allowFontScaling={false} style={[styles.txtHeading,textstyle]}>
          {label}
        </Text>
      </View>

      {/* Right Icons */}
      <View style={styles.sideContainerRight}>
        {rightIcons.map((item, index) => (
          <TouchableOpacity key={index.toString()} onPress={item.onPress} style={styles.rightIconWrap}>
            {item.type === 'svg' ? <item.icon width={24} height={24} /> : <Image source={item.icon} style={styles.icon} resizeMode="contain" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
 
    paddingHorizontal: 5,
  },
  sideContainer: {
    width: 50,
    justifyContent: 'center',
  },
  sideContainerRight: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    padding: 8,
  },
  rightIconWrap: {
    marginLeft: 12,
    padding: 8,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode:"cover"
  },
  txtHeading: {
    fontSize: 16,
     color: '#000',
     fontWeight:"600" ,
     
  },
});

export default CustomHeader;