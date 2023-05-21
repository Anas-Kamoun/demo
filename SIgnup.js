// // import React, { useRef, useState } from "react";
// // import { View, Text, TextInput, Button , TouchableOpacity} from "react-native";
// // import axiosClient from "./axios";
// // import { useStateContext } from "./ContextProvider";
// // import { IconButton } from "react-native-paper";
// // // import Visibility from '@mui/icons-material/Visibility';
// // // import VisibilityOff from '@mui/icons-material/VisibilityOff';
// // // import { IconButton } from "react-native-paper";
// // import { MaterialCommunityIcons } from '@expo/vector-icons';
// // import { Link } from 'react-router-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// // export default function Signup() {
// //   const nameRef = useRef();
// //   const emailRef = useRef();
// //   const passwordRef = useRef();
// //   const passwordConfirmationRef = useRef();
// //   const [errors, setErrors] = useState(null);
// //   const { setUser, setToken } = useStateContext();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigation = useNavigation();
// //   const onSubmit = () => {
// //     const payload = {
// //       name: nameRef.current.value,
// //       email: emailRef.current.value,
// //       password: passwordRef.current.value,
// //       password_confirmation: passwordConfirmationRef.current.value,
// //     };
// //     console.log(payload);
// //     axiosClient
// //       .post("/signup", payload)
// //       .then(({ data }) => {
// //         setUser(data.user);
// //         setToken(data.token);
// //       })
// //       .catch((err) => {
// //         const response = err.response;
// //         if (response && response.status === 422) {
// //           setErrors(response.data.errors);
// //           console.log(response.data.errors);
// //         }
// //       });
// //   };
// //   const GoToSignUp = () => {
// //     navigation.navigate('Login');
// //   };

// //   const handleClickShowPassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   return (
// //     <View>
// //          <KeyboardAwareScrollView
// //                    style={{ flex: 1, width: '100%' }}
// //                    keyboardShouldPersistTaps="always">
                  
                  
// //       <View>
// //         <Text>Sign Up</Text>
// //         {errors && (
// //           <View>
// //             {Object.keys(errors).map((key) => (
// //               <Text key={key}>{errors[key][0]}</Text>
// //             ))}
// //           </View>
// //         )}
     
// // <TextInput
// //                     style={styles.input}
// //                     placeholder='Name'
// //                     placeholderTextColor="#aaaaaa"
                    
// //                     underlineColorAndroid="transparent"
// //                     autoCapitalize="none"
// //                     ref={nameRef}
// //                 />


// // <TextInput
// //                     style={styles.input}
// //                     placeholder='E-mail'
// //                     placeholderTextColor="#aaaaaa"
                  
// //                     underlineColorAndroid="transparent"
// //                     autoCapitalize="none"
// //                     ref={emailRef}
// //                 />
// // <TextInput
// //                     style={styles.input}
// //                     placeholderTextColor="#aaaaaa"
// //                     secureTextEntry={!showPassword}
// //                     placeholder='Password'
                    
// //                     underlineColorAndroid="transparent"
// //                     autoCapitalize="none"
// //                     ref={passwordRef}
// //                 />
// //         <TextInput
// //           ref={passwordConfirmationRef}
// //           placeholder="Password Confirmation"
// //           secureTextEntry={!showPassword}
// //           style={styles.input}
// //         />

// // <TextInput
// //                     style={styles.input}
// //                     placeholderTextColor="#aaaaaa"
// //                     secureTextEntr={!showPassword}
// //                     placeholder='Confirm Password'
                   
// //                     underlineColorAndroid="transparent"
// //                     autoCapitalize="none"
// //                     ref={passwordConfirmationRef}
// //                 />

// //         <IconButton
// //     onPress={handleClickShowPassword}
// //     style={styles.passwordIcon}
// //   >
// //     {showPassword ? (
// //       <MaterialCommunityIcons name="eye-off" size={24} color="black" />
// //     ) : (
// //       <MaterialCommunityIcons name="eye" size={24} color="black" />
// //     )}
// //   </IconButton>
        
// //     <TouchableOpacity
// //                     style={styles.button}
// //                     onPress={() => GoToSignUp()}>
// //                     <Text style={styles.buttonTitle}>Login</Text>
// //                 </TouchableOpacity>


// //                 <Text style={styles.text}>
// //         Not Registered?{" "}
// //         <TouchableOpacity style={styles.buttonRegister} onPress={GoToSignUp}>
// //       <Text style={styles.buttonTextR}>Sign in</Text>
// //     </TouchableOpacity>
// //       </Text>


      
// //       </View>
// //       </KeyboardAwareScrollView>

// //     </View>
// //   );
// // }

// // const styles = {
// //     input: {
// //         height: 48,
// //         borderRadius: 5,
// //         borderWidth: 1,
// //         borderColor: 'black',
// //         marginVertical: 10,
// //         padding: 10,
// //         marginLeft: 30,
// //         marginRight: 30,
// //       },
// //       passwordIcon: {
// //         position: 'absolute',
// //         top: 36,
// //         right: 15,
// //       },
            
// //       button: {
// //         backgroundColor: '#788eec',
// //         marginLeft: 30,
// //         marginRight: 30,
// //         marginTop: 20,
// //         height: 48,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //       },
// //       buttonTextR: {
// //         color: '#788eec',
// //         fontWeight: 'bold',
// //       },
            
// // };
// import React, { useRef, useState } from "react";
// import { View, Text, TextInput, Button , TouchableOpacity} from "react-native";
// import axiosClient from "./axios";
// import { useStateContext } from "./ContextProvider";
// import { IconButton } from "react-native-paper";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Link } from 'react-router-native';
// import { useNavigation } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default function Signup() {
// const nameRef = useRef();
// const emailRef = useRef();
// const passwordRef = useRef();
// const passwordConfirmationRef = useRef();
// const [errors, setErrors] = useState(null);
// const { setUser, setToken } = useStateContext();
// const [showPassword, setShowPassword] = useState(false);
// const navigation = useNavigation();
// const onSubmit = () => {
// const payload = {
// name: nameRef.current.value,
// email: emailRef.current.value,
// password: passwordRef.current.value,
// password_confirmation: passwordConfirmationRef.current.value,
// };
// console.log(payload);
// axiosClient
// .post("/signup", payload)
// .then(({ data }) => {
// setUser(data.user);
// setToken(data.token);
// })
// .catch((err) => {
// const response = err.response;
// if (response && response.status === 422) {
// setErrors(response.data.errors);
// console.log(response.data.errors);
// }
// });
// };
// const GoToSignUp = () => {
// navigation.navigate('Login');
// };

// const handleClickShowPassword = () => {
// setShowPassword(!showPassword);
// };

// return (
// <View>
// <KeyboardAwareScrollView
// style={{ flex: 1, width: '100%' }}
// keyboardShouldPersistTaps="always"
// >
// <View>
// <Text>Sign Up</Text>
// {errors && (
// <View>
// {Object.keys(errors).map((key) => (
// <Text key={key}>{errors[key][0]}</Text>
// ))}
// </View>
// )}
//       <TextInput
//         style={styles.input}
//         placeholder='Name'
//         placeholderTextColor="#aaaaaa"
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         ref={nameRef}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder='E-mail'
//         placeholderTextColor="#aaaaaa"
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         ref={emailRef}
//       />

//       <TextInput
//         style={styles.input}
//         placeholderTextColor="#aaaaaa"
//         secureTextEntry={!showPassword}
//         placeholder='Password'
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         ref={passwordRef}
//       />

//       <TextInput
//         style={styles.input}
//         placeholderTextColor="#aaaaaa"
//         secureTextEntry={!showPassword}
//         placeholder='Confirm Password'
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         ref={passwordConfirmationRef}
//       />

// <TouchableOpacity onPress={handleClickShowPassword} style={styles.passwordVisibilityIcon}>
//             <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
//           </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={onSubmit}
//       >
//         <Text style={styles.buttonTitle}>Sign Up</Text>
//       </TouchableOpacity>

//       <Text style={styles.text}>
//         Already have an account?{' '}
//         <TouchableOpacity style={styles.buttonRegister} onPress={GoToSignUp}>
//           <Text style={styles.buttonTextR}>Sign In</Text>
//         </TouchableOpacity>
//       </Text>

//     </View>
//   </KeyboardAwareScrollView>
// </View>
// );
// }

// const styles = {
// input: {
// height: 48,
// borderRadius: 5,
// borderWidth: 1,
// borderColor: 'black',
// marginVertical: 10,
// padding: 10,
// marginLeft: 30,
// marginRight: 30,
// },
// passwordIcon: {
// position: 'absolute',
// top: 36,
// right: 15,
// },
// button: {
// backgroundColor: '#788eec',
// marginLeft: 30,
// marginRight: 30,
// marginTop: 20,
// height: 48,
// borderRadius: 5,
// alignItems: 'center',
// justifyContent: 'center',
// },
// buttonTextR: {
// color: '#788eec',
// fontWeight: 'bold',
// },
// };

import React, { useRef, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import axiosClient from "./axios";
import { useStateContext } from "./ContextProvider";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "react-router-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const onSubmit = () => {
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    console.log(payload);
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          console.log(response.data.errors);
        }
      });
  };
  const GoToSignUp = () => {
    navigation.navigate("Login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <Text>Sign Up</Text>
          {errors && (
            <View>
              {Object.keys(errors).map((key) => (
                <Text key={key}>{errors[key][0]}</Text>
              ))}
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            ref={nameRef}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
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
              placeholder="Password"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref={passwordRef}
            />

            <TouchableOpacity
              onPress={handleClickShowPassword}
              style={styles.passwordVisibilityIcon}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry={!showPassword}
            placeholder="Confirm Password"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            ref={passwordConfirmationRef}
          />

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            Already have an account?{" "}
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={GoToSignUp}
            >
              <Text style={styles.buttonTextR}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = {
  input: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordVisibilityIcon: {
    position: "absolute",
    top: 20,
    right: 15,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextR: {
    color: "#788eec",
    fontWeight: "bold",
  },
};
