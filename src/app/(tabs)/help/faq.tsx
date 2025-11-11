import React, { useEffect, useState } from "react";
import {
  Image,
   ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import strings from "../../../Languages";
import { base_url } from "../../api";

export default function FAQScreen() {
  const navigation = useNavigation();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // 🧠 Fetch FAQs from API
  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_url}admin/faqs`);
      const json = await response.json();
      if (json.status === "success") {
        setFaqs(json.data);
      } else {
        setError("Failed to load FAQs.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }} 
	  
	  showsVerticalScrollIndicator={false}>
        {/* Header */}
   
<CustomHeader label={strings.frequently}/>
        {/* Loader */}
        {loading && (
          <ActivityIndicator size="30" color="black" style={{ marginTop: 50 }} />
        )}

         {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginVertical: 20,
              fontSize: 16,
            }}
          >
            {error}
          </Text>
        )}

        {/* FAQ List */}
        {!loading && !error && (
          <View style={{ marginHorizontal: 24,   marginTop:20}}>
            {faqs.map((faq, index) => (
              <View key={faq.id} style={{ marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={() => toggleFAQ(index)}
                  style={{
                backgroundColor: "white",
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 12,
  padding: 16,

  // iOS Shadow
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },

  // Android Shadow
  elevation: 4,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#334155",
                        fontSize: 16,
                        fontWeight: "600",
                        flex: 1,
                        paddingRight: 16,
                      }}
                    >
                      {faq.question}
                    </Text>
                    <Text style={{ color: "#2563EB", fontSize: 20, fontWeight: "bold" }}>
                      {expandedFAQ === index ? "−" : "+"}
                    </Text>
                  </View>

                  {expandedFAQ === index && (
                    <View
                      style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderColor: "#F1F5F9",
                      }}
                    >
                      <Text style={{ color: "#475569", fontSize: 14, lineHeight: 22 }}>
                        {faq.answer}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}

         
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}