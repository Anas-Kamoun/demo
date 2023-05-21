// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet , Image} from 'react-native';
// import axiosClient from './axios';
// import { useStateContext } from './ContextProvider';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default function Login() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [errors, setErrors] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const { setUser, setToken } = useStateContext();
//   const navigation = useNavigation();

//   const onSubmit = () => {
//     const payload = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };
//     setErrors(null);
//     axiosClient
//       .post('/login', payload)
//       .then(({ data }) => {
//         setUser(data.user);
//         setToken(data.token);
//         navigation.navigate(`Users`);
//       })
//       .catch((err) => {
//         const response = err.response;
//         if (response && response.status === 422) {
//           if (response.data.errors) {
//             setErrors(response.data.errors);
//           } else {
//             setErrors({
//               email: [response.data.message],
//             });
//           }
//         }
//       });
//   };

//   const GoToLogin = () => {
//     navigation.navigate('Signup');
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <View style={styles.container}>
//       <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
//         <View style={styles.form}>
//           <Text style={styles.title}>Login into your account</Text>
//           {errors && (
//             <View style={styles.alert}>
//               {Object.keys(errors).map((key) => (
//                 <Text key={key}>{errors[key][0]}</Text>
//               ))}
//             </View>
//           )}
//           <TextInput
//             style={styles.input}
//             placeholder='E-mail'
//             placeholderTextColor="#aaaaaa"
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//             ref={emailRef}
//           />
//           <TextInput
//             style={styles.input}
//             placeholderTextColor="#aaaaaa"
//             secureTextEntry={!showPassword}
//             placeholder='Password'
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//             ref={passwordRef}
//           />
//           <TouchableOpacity onPress={handleClickShowPassword} style={styles.passwordVisibilityIcon}>
//             <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={onSubmit}>
//             <Text style={styles.buttonTitle}>Log in</Text>
//           </TouchableOpacity>
//           <Text style={styles.text}>
//             Not Registered?{' '}
//             <TouchableOpacity style={styles.buttonRegister} onPress={GoToLogin}>
//               <Text style={styles.buttonTextR}>Sign in</Text>
//             </TouchableOpacity>
//           </Text>
//         </View>
//       </KeyboardAwareScrollView>
//     </View>
//   );
// }




// const styles = StyleSheet.create({
  
//   container: {
//     flex: 1,
//     alignItems: 'center'
// },
// title: {

// },
// logo: {
//     flex: 1,
//     height: 120,
//     width: 90,
//     alignSelf: "center",
//     margin: 30
// },
// input: {
//     height: 48,
//     borderRadius: 5,
//     overflow: 'hidden',
//     backgroundColor: 'white',
//     marginTop: 10,
//     marginBottom: 10,
//     marginLeft: 30,
//     marginRight: 30,
//     paddingLeft: 16
// },
// button: {
//     backgroundColor: '#788eec',
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 20,
//     height: 48,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: 'center'
// },
// buttonTitle: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: "bold"
// },
// footerView: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 20
// },
// footerText: {
//     fontSize: 16,
//     color: '#2e2e2d'
// },
// footerLink: {
//     color: "#788eec",
//     fontWeight: "bold",
//     fontSize: 16
// }
// });


// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
// import axiosClient from './axios';
// import { useStateContext } from './ContextProvider';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default function Login() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [errors, setErrors] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const { setUser, setToken } = useStateContext();
//   const navigation = useNavigation();

//   const onSubmit = () => {
//     const payload = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };
//     setErrors(null);
//     axiosClient
//       .post('/login', payload)
//       .then(({ data }) => {
//         setUser(data.user);
//         setToken(data.token);
//         navigation.navigate(`Users`);
//       })
//       .catch((err) => {
//         const response = err.response;
//         if (response && response.status === 422) {
//           if (response.data.errors) {
//             setErrors(response.data.errors);
//           } else {
//             setErrors({
//               email: [response.data.message],
//             });
//           }
//         }
//       });
//   };

//   const GoToLogin = () => {
//     navigation.navigate('Signup');
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <View style={styles.container}>
//       <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
//         <View style={styles.form}>
//           <Text style={styles.title}>Login into your account</Text>
//           {errors && (
//             <View style={styles.alert}>
//               {Object.keys(errors).map((key) => (
//                 <Text key={key}>{errors[key][0]}</Text>
//               ))}
//             </View>
//           )}
//           <TextInput
//             style={styles.input}
//             placeholder='E-mail'
//             placeholderTextColor="#aaaaaa"
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//             ref={emailRef}
//           />
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.input}
//               placeholderTextColor="#aaaaaa"
//               secureTextEntry={!showPassword}
//               placeholder='Password'
//               underlineColorAndroid="transparent"
//               autoCapitalize="none"
//               ref={passwordRef}
//             />
//             <TouchableOpacity onPress={handleClickShowPassword} style={styles.passwordVisibilityIcon}>
//               <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.button} onPress={onSubmit}>
//             <Text style={styles.buttonTitle}>Log in</Text>
//           </TouchableOpacity>
//           <Text style={styles.text}>
//             Not Registered?{' '}
//             <TouchableOpacity style={styles.buttonRegister} onPress={GoToLogin}>
//               <Text style={styles.buttonTextR}>Sign in</Text>
//             </TouchableOpacity>
//           </Text>
//         </View>
//       </KeyboardAwareScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center'
//   },
//   title: {

//   },
//   logo: {
//     flex: 1,
//     height: 120,
//     width: 90,
//     alignSelf: "center",
//     margin: 30
//   },
//   input: {
//     height: 48,
//     borderRadius: 5,
//     overflow: 'hidden',
//     backgroundColor: 'white',
//     marginTop: 10,
//     marginBottom: 10,
//     marginLeft: 30,
//     marginRight: 10,
//     paddingLeft: 16,
//     flex: 1
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 30,
//     marginRight: 30,
//   },
//   passwordVisibilityIcon: {
//     marginLeft: -30,
//     marginRight: 10
//   },
//   button: {
//     backgroundColor: '#788eec',
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 20,
//     height: 48,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: 'center'
//   },
//   buttonTitle: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   footerView: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 20
//   },
//   footerText: {
//     fontSize: 16,
//     color: '#2e2e2d'
//   },
//   footerLink: {
//     color: "#788eec",
//     fontWeight: "bold",
//     fontSize: 16
//   }
// });

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import axiosClient from './axios';
import { useStateContext } from './ContextProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useStateContext();
  const navigation = useNavigation();

  const onSubmit = () => {
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);
    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigation.navigate(`Users`);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  const GoToLogin = () => {
    navigation.navigate('Signup');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
        <View style={styles.form}>
          <Text style={styles.title}>Login into your account</Text>
          {errors && (
            <View style={styles.alert}>
              {Object.keys(errors).map((key) => (
                <Text key={key}>{errors[key][0]}</Text>
              ))}
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            ref={emailRef}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry={!showPassword}
              placeholder='Password'
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref={passwordRef}
            />
            <TouchableOpacity onPress={handleClickShowPassword} style={styles.passwordVisibilityIcon}>
              <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Not Registered?{' '}
            <TouchableOpacity style={styles.buttonRegister} onPress={GoToLogin}>
              <Text style={styles.buttonTextR}>Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {

  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  passwordVisibilityIcon: {
    marginLeft: -30,
    marginRight: 10
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});
