import { StyleSheet, Text,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputText } from '../components/Inputs';
import { Icon,Spinner,View } from 'native-base';
import  Feather  from '@expo/vector-icons/Feather';
import { OutlineButton, SolidButton } from '../components/Buttons';
import axios from 'axios';
import { useStateContext } from '../ContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const URL = 'https://f4e6-197-11-155-66.ngrok-free.app/api'
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checkLoader,setCheckLoader] = useState(true)
  const {setUser,setToken} =useStateContext()

  useEffect(()=>{
   const checkUser = async() => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN')
    const jsonValue = await AsyncStorage.getItem('user')
    const u = jsonValue != null ? JSON.parse(jsonValue) : null;
   setUser(u)
    if(token){
     
      navigation.replace('TabNavigation')
    }else{
      setCheckLoader(false)
    }
   }
   checkUser()
  },[])


  const LoginHandler = async () => {
    setLoader(true)
   axios.post(`${URL}/login`,{
    email,
    password,
   
   }).then(async res => {
    setUser(res.data.user)
    await AsyncStorage.setItem('ACCESS_TOKEN',res.data.token)
    await AsyncStorage.setItem('user',JSON.stringify(res.data.user))
    setToken(res.data.token)
    navigation.replace('TabNavigation')
      setLoader(false)
   }).catch(err => {
    console.log(err)
    setLoader(false)

   })  }

if(checkLoader){
  return (
    <SafeAreaView style={{flex:1,}}>
     <View style={styles.container}>
      <Spinner  size='lg' color='indigo.600'/>
     </View>
     </SafeAreaView>)
}

  return (
    <SafeAreaView style={{flex:1,}}>
     <View style={styles.container}>
    <Text  style={{fontWeight:'700', fontSize:22, marginVertical : 15,textAlign:'center'}}>Login</Text>
    <View alignItems="center" px='4'>
    <InputText
            value={email}
            setValue={setEmail}
            placeholder="Mail address"
            InputLeftElement={
              <Icon
                as={Feather}
                name="mail"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
          />
          <InputText
            value={password}
            setValue={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
            InputLeftElement={
              <Icon
                as={Feather}
                name="lock"
                size={5}
                ml={2}
                color="muted.500"
              />
            }
            InputRightElement={
              showPassword ? (
                <Icon
                  onPress={() => setShowPassword(!showPassword)}
                  as={Feather}
                  name="eye-off"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              ) : (
                <Icon
                  onPress={() => setShowPassword(!showPassword)}
                  as={Feather}
                  name="eye"
                  size={5}
                  mr={2}
                  color="muted.500"
                />
              )
            }
          />
          
      <View mt='3' w="full">
        
          <SolidButton onPress={LoginHandler} isLoading={loader} isLoadingText='Connecting'>Login</SolidButton>
      </View>

</View>
     </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container : {
    backgroundColor:'white',
    flex:1,
    justifyContent:"center",
    marginTop:-30
  }
})