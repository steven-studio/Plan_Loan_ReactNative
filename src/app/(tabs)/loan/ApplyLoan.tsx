// import React, { useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const Navbar = require("../../../components/Navbar").default;

// export default function ApplyLoan() {
//   const navigation = useNavigation();
//   const [loanAmount, setLoanAmount] = useState("10000");
//   const [sliderValue, setSliderValue] = useState(10000);
//   const [selectedTerm, setSelectedTerm] = useState(12);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const termOptions = [3, 6, 12, 18, 24];

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleLogout = () => {
//     navigation.replace("Login"); // Adjust the route name according to your stack
//   };

//   const handleLoanApplication = () => {
//     const loanData = {
//       amount: sliderValue.toLocaleString(),
//       term: selectedTerm,
//       monthlyPayment: calculateMonthlyPayment(),
//       interestRate: calculateInterestRate(),
//     };

//     Alert.alert("Processing your loan application...");

//     // setTimeout(() => {
//     //   const isApproved = Math.random() > 0.3;

//     //   const notificationService = require("../../../services/notificationService").default;

//     //   if (isApproved) {
//     //     notificationService.sendLoanNotification("loan_approved", {
//     //       amount: loanData.amount,
//     //     });
//     //     Alert.alert(
//     //       "Loan Approved!",
//     //       `Your loan of $${loanData.amount} has been approved. You'll receive a notification shortly.`
//     //     );
//     //   } else {
//     //     notificationService.sendLoanNotification("loan_rejected");
//     //     Alert.alert(
//     //       "Loan Rejected",
//     //       "Your loan application was not approved. You'll receive a notification with more details."
//     //     );
//     //   }
//     // }, 2000);
//   };

//   const calculateInterestRate = () => {
//     const baseRate = 8.5;
//     const amountFactor = sliderValue > 50000 ? 1.5 : sliderValue > 20000 ? 1.2 : 1.0;
//     const termFactor = selectedTerm === 12 ? 0.8 : selectedTerm === 6 ? 0.9 : 1.0;
//     return parseFloat((baseRate * amountFactor * termFactor).toFixed(1));
//   };

//   const calculateMonthlyPayment = () => {
//     const principal = sliderValue;
//     const monthlyRate = calculateInterestRate() / 100 / 12;
//     const numPayments = selectedTerm;
//     const monthlyPayment =
//       (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
//       (Math.pow(1 + monthlyRate, numPayments) - 1);
//     return Math.round(monthlyPayment);
//   };

//   const handleSliderChange = (value) => {
//     setSliderValue(value);
//     setLoanAmount(value.toString());
//   };

//   const handleTextInputChange = (text) => {
//     const numericValue = parseInt(text.replace(/[^0-9]/g, "")) || 0;
//     if (numericValue <= 100000) {
//       setLoanAmount(text);
//       setSliderValue(numericValue);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
//         {/* Header */}
//         <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16, paddingHorizontal: 16 }}>
//           <TouchableOpacity onPress={handleBackPress}>
//             <Image
//               source={require("../../../assets/images/icons/back.png")}
//               resizeMode="contain"
//               style={{ width: 37, height: 36, marginRight: 88 }}
//             />
//           </TouchableOpacity>
//           <Text style={{ color: "#374061", fontSize: 24, fontWeight: "bold" }}>Apply Loan</Text>
//         </View>

//         <View style={{ marginHorizontal: 24, marginBottom: 300 }}>
//           <View style={{ marginBottom: 32 }}>
//             <Text style={{ color: "#262626", fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
//               Apply for a Loan
//             </Text>

//             {/* Loan Amount */}
//             <View style={{ marginBottom: 16 }}>
//               <Text style={{ color: "#262626", fontWeight: "bold", marginBottom: 8 }}>Loan Amount</Text>
//               <TextInput
//                 placeholder="Enter loan amount"
//                 value={loanAmount}
//                 onChangeText={handleTextInputChange}
//                 keyboardType="numeric"
//                 style={{
//                   color: "#374061",
//                   borderColor: "#374061",
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   padding: 12,
//                   fontSize: 16,
//                 }}
//               />
//             </View>

//             {/* Slider */}
//             <View style={{ marginVertical: 16 }}>
//               <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
//                 <Text style={{ color: "#9CA3AF", fontSize: 12 }}>NT $5,000</Text>
//                 <Text style={{ color: "#9CA3AF", fontSize: 12 }}>NT $100,000</Text>
//               </View>

//               <View style={{ height: 8, backgroundColor: "#E5E7EB", borderRadius: 8 }}>
//                 <View
//                   style={{
//                     height: 8,
//                     backgroundColor: "#374061",
//                     borderRadius: 8,
//                     width: `${((sliderValue - 5000) / (100000 - 5000)) * 100}%`,
//                   }}
//                 />
//               </View>

//               <Text style={{ textAlign: "center", color: "#374061", fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
//                 NT ${sliderValue.toLocaleString()}
//               </Text>
//             </View>

//             {/* Interest Rate */}
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
//               <Text style={{ color: "#262626", fontSize: 18, fontWeight: "bold" }}>Preview Interest Rate</Text>
//               <Text style={{ color: "#374061", fontSize: 20, fontWeight: "bold" }}>
//                 {calculateInterestRate()}% p.a.
//               </Text>
//             </View>

//             {/* Monthly Payment */}
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
//               <Text style={{ color: "#262626", fontSize: 18, fontWeight: "bold" }}>Monthly Payment</Text>
//               <Text style={{ color: "#F59E0B", fontSize: 20, fontWeight: "bold" }}>
//                 NT ${calculateMonthlyPayment().toLocaleString()}
//               </Text>
//             </View>

//             {/* Repayment Term Dropdown */}
//             <View style={{ position: "relative" }}>
//               <Text style={{ color: "#262626", fontWeight: "bold", marginBottom: 8 }}>Repayment Term</Text>
//               <TouchableOpacity
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   borderColor: "#B0B0B0",
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   paddingVertical: 12,
//                   paddingHorizontal: 12,
//                 }}
//                 onPress={() => setShowDropdown(!showDropdown)}
//               >
//                 <Text style={{ flex: 1, color: "#262626", fontSize: 16 }}>{selectedTerm} Months</Text>
//                 <Image
//                   source={require("../../../assets/images/icons/dropdown.png")}
//                   resizeMode="contain"
//                   style={{
//                     width: 24,
//                     height: 24,
//                     transform: [{ rotate: showDropdown ? "180deg" : "0deg" }],
//                   }}
//                 />
//               </TouchableOpacity>

//               {showDropdown && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 60,
//                     left: 0,
//                     right: 0,
//                     backgroundColor: "#fff",
//                     borderWidth: 1,
//                     borderColor: "#E5E7EB",
//                     borderRadius: 8,
//                     elevation: 5,
//                   }}
//                 >
//                   {termOptions.map((term) => (
//                     <TouchableOpacity
//                       key={term}
//                       style={{
//                         padding: 12,
//                         borderBottomWidth: term !== termOptions[termOptions.length - 1] ? 1 : 0,
//                         borderBottomColor: "#E5E7EB",
//                       }}
//                       onPress={() => {
//                         setSelectedTerm(term);
//                         setShowDropdown(false);
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: selectedTerm === term ? "#374061" : "#262626",
//                           fontWeight: selectedTerm === term ? "bold" : "normal",
//                         }}
//                       >
//                         {term} Months
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               )}
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={handleLoanApplication}
//             style={{
//               backgroundColor: "#374061",
//               borderRadius: 12,
//               alignItems: "center",
//               paddingVertical: 14,
//             }}
//           >
//             <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Apply for Loan</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <Navbar onLogout={handleLogout} />
//     </SafeAreaView>
//   );
// }
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
 
  Modal,
  FlatList,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider"; // ✅ custom slider
import { useNavigation } from "@react-navigation/native";
import strings from "../../../Languages";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../components/StatusBarCompoent";
 
export default function ApplyLoan() {
  const [loanAmount, setLoanAmount] = useState("");
  const [sliderValue, setSliderValue] = useState(50000);
  const [repaymentTerm, setRepaymentTerm] = useState("12 Months");
  const [showDropdown, setShowDropdown] = useState(false);

  const repaymentOptions = ["6 Months", "12 Months", "18 Months", "24 Months"];
const navagtion = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */} 
              <StatusBarComponent/>

      
      <View style={{
        marginHorizontal:15
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{
          navagtion.goBack()
        }}  >
  <Image
                         source={require('../../../assets/images/icons/back.png')}

                        style={{
                          height:30,
                          width:30,
                          resizeMode:"contain"
                        }}
        />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{strings?.ApplyforLoa}</Text>
      </View>

      {/* Loan Amount Input */}
      <TextInput
        style={styles.input}
        placeholder={strings?.EnterAmount}
        keyboardType="numeric"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />

      {/* Custom Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1000}
          maximumValue={100000}
          step={1000}
          minimumTrackTintColor="#0A3D91"
          maximumTrackTintColor="#C8C8C8"
          thumbTintColor="#0A3D91"
          value={sliderValue}
          onValueChange={setSliderValue}
        />
        <Text style={styles.sliderValue}>₹{sliderValue.toLocaleString()}</Text>
      </View>

      {/* Interest Rate */}
      <View style={styles.interestContainer}>
        <Text style={styles.label}>{strings?.PreviewInterestRate}</Text>
        <Text style={styles.interestText}>8.5% p.a.</Text>
      </View>

      {/* Custom Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={styles.dropdownText}>{repaymentTerm}</Text>
         <Image
                        source={require('../../../assets/images/home/arrow-down.png')}

                        style={{
                          height:15,
                          width:15
                        }}
        />
      </TouchableOpacity>
      

      {/* Dropdown Modal */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={repaymentOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    setRepaymentTerm(item);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>{strings?.Confirm}</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
   },

  backArrow: {
    fontSize: 16,
    color: "#0A3D91",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000", 
    marginLeft:15 ,
    textAlign:"center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10, 
    height:55 ,
    marginTop:8
  },
  sliderContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop:15
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  interestContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  interestText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    height:55
  },
  dropdownText: {
    fontSize: 15,
    color: "#000",
  },
  dropdownArrow: {
    fontSize: 14,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    elevation: 5,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#0A3D91",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});