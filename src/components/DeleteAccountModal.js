import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import strings from "../Languages";
import { base_url } from "../app/api";
import { useNavigation } from "@react-navigation/native";
import { successToast } from "../app/api/customToast";
 
export default function DeleteAccountModal({
  visible,
  onClose,
  requireReason = false,
  title = "Delete Account",
  message = "Are you sure you want to delete your account? You’ll lose all your data and access permanently.",
}) {
  const [loading, setLoading] = useState(false);
   const userData = useSelector((state) => state.auth.userData);
 const navigation = useNavigation()

  const handleDelete = async () => {

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${base_url}user/delete/${userData?.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       });

      const result = await response.json();
      console.log("Delete account response:", result);

      if(result.statusCode ==200 ||201) {
        successToast(result.message ||"")
         navigation.replace('Login');
      }
    } finally {
      setLoading(false);
      setReason("");
    }
  };

  const handleClose = () => {
    if (!loading) {
 
      onClose && onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <SafeAreaView style={styles.modalCard}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
 

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelBtn]}
                  onPress={handleClose}
                  disabled={loading}
                >
                  <Text style={[styles.buttonText, styles.cancelText]}>
                    {strings?.Cancel || "Cancel"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.deleteBtn, loading && styles.buttonDisabled]}
                  onPress={handleDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={[styles.buttonText, styles.deleteText]}>
                      {strings?.Delete || "Delete"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 16,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center", color: "#333" },
  message: { fontSize: 16, color: "#555", marginBottom: 16, textAlign: "center", lineHeight: 22 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 90,
    marginBottom: 20,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  button: { minWidth: 100, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", marginLeft: 10 },
  cancelBtn: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#aaa" },
  deleteBtn: { backgroundColor: "#e53935" },
  buttonText: { fontSize: 16, fontWeight: "600" },
  cancelText: { color: "#333" },
  deleteText: { color: "#fff" },
  buttonDisabled: { opacity: 0.7 },
});