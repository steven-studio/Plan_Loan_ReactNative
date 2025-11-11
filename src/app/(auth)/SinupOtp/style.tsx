import { Platform, StyleSheet } from "react-native";
 


export const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFF',
    padding: 15,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 15,

  },
  backButton: {
    marginTop: 8,
    width: '15%',
  },
  backIcon: {
    height: 32,
    width: 32,
  },
   txtHeading: {
     fontSize: 24,
    lineHeight: 36,
    color: 'rgba(0, 0, 0, 1)',
    marginTop: 7,
    textAlign:'left'
  },
   txtDes:{
        color:'#9DB2BF',
        fontSize:14,
         marginTop:15,
        textAlign:'left'
      },
  headerSection: {
     marginTop: 5,
    justifyContent:"center",
   },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 36,
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(157, 178, 191, 1)',
    lineHeight: 24,
    marginTop: 10,
  },
  otpFieldContainer: {
  marginTop: 20,
  justifyContent: 'center',
  },
  cellWrapper: {
  width: 55,
  height: 55,
   borderRadius: 10,
  backgroundColor: '#E9E9E9',
  justifyContent: 'center', // centers vertically
  alignItems: 'center',     // centers horizontally
    
   },
   focusCellWrapper: {
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#1E3A8A',
},

cellText: {
  fontSize: 24,
  color: '#000',
  textAlign: 'center',
  textAlignVertical: 'center', // works mainly on Android
  includeFontPadding: false,   // helps fix alignment on Android
  paddingTop: Platform.OS === 'ios' ? 4 : 0, // fine-tune for iOS
},

focusCellText: {
  color: '#000',
    fontSize: 24,

},

  cell: {
    width: 55,
    height: 60,
    fontSize: 24,
    lineHeight: 38,
    borderWidth: 1.5,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    textAlignVertical: 'center',
     justifyContent:"center" ,
    alignItems:"center" ,
  },
  focusCell: {
    borderColor: "#1E3A8A",
    backgroundColor: 'white',
    textAlignVertical: 'center',
     justifyContent:"center" ,
    alignItems:"center" ,
   },
  errorText: {
    color: 'red',
    marginTop: 18,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
     marginTop: 30,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    alignSelf:'center'
  },
});