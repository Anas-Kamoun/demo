import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../ContextProvider';

const Demandes = () => {
    const { user } = useStateContext();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <Text>{user.name}</Text>
    </SafeAreaView>
  )
}

export default Demandes

const styles = StyleSheet.create({})