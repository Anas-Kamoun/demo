import React, { useEffect } from 'react';
import axios from 'axios';
import { View } from 'react-native-web';

const MyComponent = () => {
  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        console.log(response.data);
        // Le backend est accessible, vous pouvez voir les données des utilisateurs dans la console
      })
      .catch(error => {
        console.error(error);
        // Le backend n'est pas accessible, une erreur est affichée dans la console
      });
  }, []);

  return (
    <View>hellooo</View>
  );
};

export default MyComponent;
