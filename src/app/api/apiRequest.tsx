

import { loginSuccess, logout } from '../../redux/feature/authSlice';
import { errorToast, successToast } from './customToast';
import { base_url } from './index';
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 const handleLogout = async (dispatch: any) => {
  try {
     dispatch(logout());    // reset Redux state
   } catch (error) {
    console.error('Error during logout:', error);
  }
};

 const saveAuthData = async (userData:any, token:any) => {
  try {
    await AsyncStorage.setItem('authData', JSON.stringify({ userData, token }));
    console.log('Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};
 const getAuthData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('authData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading auth data:', error);
    return null;
  }
};


  const LoginApi = async (
  param: any,
  setLoading: (loading: boolean) => void,
  dispatch: any,
) => {
  setLoading(true);

  try {
    const response = await fetch(`${base_url}user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: param?.email || '',
        password: param?.password || '',
      }),
    });

    const parsedResponse = await response.json();
 
    if (parsedResponse?.statusCode == 200) {
      const userData = parsedResponse?.data?.user || {};
      const token = parsedResponse?.data?.token || '';

      // ✅ Save to Redux
      param.dispatch(loginSuccess({ userData, token }));

       await AsyncStorage.setItem(
        'authData',
        JSON.stringify({ userData, token }),
      );
 await AsyncStorage.setItem('token', token);


      successToast(parsedResponse.message || 'Login successful');
      param.navigation.replace('TabLayout');

      return parsedResponse;
    } else {
      errorToast(parsedResponse.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};



const RegisterApi = async (param: any, setLoading: (loading: boolean) => void) => {
  setLoading(true);

  try {
    const response = await fetch(`${base_url}user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: param?.email || '',
        password: param?.password || '',
        confirmPassword: param?.confirmPassword || '',
      }),
    });

    const parsedResponse = await response.json();
    console.log('Register Response:', parsedResponse);

    if (parsedResponse?.statusCode == 201) {
 param.navigator.navigate('SinupOtp', {
  email: param?.email,
});

      successToast(parsedResponse.message);
      return parsedResponse;
    } else {
      errorToast(parsedResponse.message);
      return parsedResponse;
    }
  } catch (error) {
    console.error('Register error:', error);
    errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


const Verifyotp = async ( param: any,
    setLoading: (loading: boolean) => void,
   navigation: any,) => {
 
  try {
    const response = await fetch(`${base_url}user/verify-otp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
     body: JSON.stringify({
        email: param?.email || '',
          otp: param?.value || '',
       }),
    });

    const parsedResponse = await response.json();
    console.log('Register Response:', parsedResponse);

    if (parsedResponse?.statusCode == 200) {
 navigation.navigate('Login');

      successToast(parsedResponse.message);
      return parsedResponse;
    } else {
      errorToast(parsedResponse.message);
      return parsedResponse;
    }
  } catch (error) {
    console.error('Register error:', error);
    errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};
 

const Resend_otp = async (param: any, setLoading: any) => {
  setLoading(true);
  try {
    // ✅ Create FormData
    const formdata = new FormData();
    formdata.append('countryCode', param?.code || '');
    formdata.append('phoneNumber', param?.phone || '');

    console.log('FormData:', {
      countryCode: param?.code,
      phoneNumber: param?.phone,
    });

    // ✅ Send FormData
    const response = await fetch(`${base_url}/resend-otp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // ❌ Do NOT set Content-Type manually for FormData
      },
      body: formdata,
    });

    const textResponse = await response.text();

    // ✅ Parse safely
    let parsedResponse: any;
    try {
      parsedResponse = JSON.parse(textResponse);
    } catch (error) {
      errorToast('Invalid server response');
      return;
    }

    console.log('parsedResponse', parsedResponse);

    // ✅ Handle response
    if (parsedResponse?.status === 1) {
      successToast(parsedResponse?.message);
    } else {
      errorToast(parsedResponse?.message);
    }

  } catch (error: any) {
    console.error('Resend OTP error:', error);
    errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

 const UpdateProfile = async (
  param: any,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");

    const formdata = new FormData();

    if (param.username) formdata.append("firstName", param.username);
    if (param.email) formdata.append("email", param.email);
    if (param.address) formdata.append("address", param.address);

    // ✅ Append image only if exists
    if (param.imagePrfoile && param.imagePrfoile.uri) {
      const fileName = param.imagePrfoile.fileName || "profile.jpg";
      const fileType = param.imagePrfoile.type || "image/jpeg";

      formdata.append("imageFile", {
        uri: param.imagePrfoile.uri,
        name: fileName,
        type: fileType,
      });
    }

    // ✅ Do NOT manually set 'Content-Type' header
    const headers: any = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    // ✅ Use POST (most servers expect POST for FormData upload)
    const response = await fetch(`${base_url}/setup-profile`, {
      method: "POST",
      headers,
      body: formdata,
    });

    const textResponse = await response.text();
    let parsedResponse;

    try {
      parsedResponse = JSON.parse(textResponse);
    } catch {
      throw new Error("Invalid server response");
    }

    if (parsedResponse.status == "1") {
      successToast(parsedResponse.message);
      return parsedResponse;
    } else {
      errorToast(parsedResponse.message);
      return parsedResponse;
    }
  } catch (error) {
    console.error("UpdateProfile error:", error);
    errorToast("Something went wrong. Please try again.");
    return null;
  } finally {
    setLoading(false);
  }
};

  
    
const GetProfileApi = async (
  setLoading: (loading: boolean) => void
): Promise<any | null> => {
  setLoading(true);
  const token = await AsyncStorage.getItem('token');
  console.log("token", token);
  try {
    const response = await fetch(`${base_url}/setup-profile`, {
      method: 'GET',  // agar get ho toh GET use karna
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    console.log("responseData", responseData);

    if (responseData.status === "1" || responseData.status === 1) {
      return responseData;
    } else {
      Toast(responseData.error || responseData.message || "Something went wrong", color.red, 10);
      return null;
    }
  } catch (error) {
    console.error("API call error:", error);
    errorToast("Network error");
    return null;
  } finally {
    setLoading(false);
  }
};

 
 const Privacypolicy = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${base_url}/privacy-policy`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status === 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    } else {
      errorToast(parsedResponse?.message);
      return null; // Optional: return null on failure
    }

  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};


 const Termsconditions = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${base_url}/terms-and-conditions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status === 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    } else {
      errorToast(parsedResponse?.message);
      return null; // Optional: return null on failure
    }

  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

 

 
 

const CalllogApi = async (
  param: any,
  setLoading: (loading: boolean) => void,
) => {
  setLoading(true);
  try {
     const tokenData = await AsyncStorage.getItem('token');
    let token = tokenData;
     try {
      const parsed = JSON.parse(tokenData || '{}');
      if (parsed?.token) {
        token = parsed.token;
      }
    } catch (e) {
     }
    if (!token) {
      throw new Error('Token missing');
    }
    const response = await fetch(`${base_url}user/call-logs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        logs: param,
      }),
    });
    const parsedResponse = await response.json();
     if (parsedResponse?.statusCode == 201 || 200) {
            successToast(parsedResponse.message || 'successfully');

      } else {
      errorToast(parsedResponse.message || 'Something went wrong');
     }
  } catch (error) {
     errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


const DeviceInfoApi = async (
  param: any,
  setLoading: (loading: boolean) => void,
) => {
  setLoading(true);
  try {
     const tokenData = await AsyncStorage.getItem('token');
    let token = tokenData;
     try {
      const parsed = JSON.parse(tokenData || '{}');
      if (parsed?.token) {
        token = parsed.token;
      }
    } catch (e) {
     }
    if (!token) {
      throw new Error('Token missing');
    }
    const response = await fetch(`${base_url}user/call-logs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        logs: param,
      }),
    });
    const parsedResponse = await response.json();
    if (parsedResponse?.statusCode == 200) {
      successToast(parsedResponse.message || 'Logs saved successfully');
     } else {
      errorToast(parsedResponse.message || 'Something went wrong');
     }
  } catch (error) {
     errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

 

 export {
  RegisterApi,  
   Verifyotp,
LoginApi,
handleLogout,
getAuthData,
Termsconditions,
saveAuthData,
Resend_otp,
     GetProfileApi,  
 Privacypolicy,
UpdateProfile ,
CalllogApi ,
DeviceInfoApi
 
}  