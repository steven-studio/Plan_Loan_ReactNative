import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { successToast, errorToast } from "../app/api/customToast";
import { base_url } from "../app/api";

 
const DeviceInfoScreen = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all device information
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = {
          brand: DeviceInfo.getBrand(),
          model: DeviceInfo.getModel(),
          systemName: DeviceInfo.getSystemName(),
          systemVersion: DeviceInfo.getSystemVersion(),
          deviceId: DeviceInfo.getDeviceId(),
          deviceType: DeviceInfo.getDeviceType(),
          appVersion: DeviceInfo.getVersion(),
          buildNumber: DeviceInfo.getBuildNumber(),
          bundleId: DeviceInfo.getBundleId(),
          readableVersion: DeviceInfo.getReadableVersion(),
          isTablet: DeviceInfo.isTablet(),
          isEmulator: await DeviceInfo.isEmulator(),
          manufacturer: await DeviceInfo.getManufacturer(),
          uniqueId: await DeviceInfo.getUniqueId(),
        };

        setDeviceInfo(info);
        // Call API after fetching info
        callDeviceInfoApi(info);
      } catch (err) {
         errorToast("Failed to get device info");
      }
    };

    fetchInfo();
  }, []);

   const callDeviceInfoApi = async (info: any) => {
    setLoading(true);
    try {
      const tokenData = await AsyncStorage.getItem("token");
      let token = tokenData;

      // Handle if token is JSON object
      try {
        const parsed = JSON.parse(tokenData || "{}");
        if (parsed?.token) {
          token = parsed.token;
        }
      } catch (e) {}

      if (!token) {
        throw new Error("Token missing");
      }
      const response = await fetch(`${base_url}user/device-info`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deviceInfo: info }),
      });

      const parsedResponse = await response.json();
       if (parsedResponse?.statusCode == 201 ||200 ) {
        // successToast(parsedResponse.message);
      } else {
        errorToast(parsedResponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("API error", error);
      errorToast("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    </>
  );
};

export default DeviceInfoScreen;

 