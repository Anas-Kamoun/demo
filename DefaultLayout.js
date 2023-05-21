import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton, Menu, MenuItem } from 'react-native-paper';
import axiosClient from './axios';
import Logo from './assets/logo.png';
import { useStateContext } from './ContextProvider'; // Importez votre contexte de l'état global

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext(); // Utilisez useContext pour extraire l'état global
    const navigation = useNavigation();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    useEffect(() => {
      axiosClient.get('/users')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.aside}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <View style={styles.link}>
            <Text style={styles.linkText}>Dashboard</Text>
          </View>
        </TouchableOpacity>

        {/* Répétez la structure pour les autres liens */}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>GRH</Text>
          </View>

          <View style={styles.profileContainer}>
            <IconButton onPress={handleMenuClick}>
              <Avatar.Image source={{ uri: user.avatar }} />
              <Text>{user.name}</Text>
            </IconButton>

            <Menu
              visible={Boolean(anchorEl)}
              onDismiss={handleMenuClose}
              anchor={
                <View>
                  <IconButton onPress={handleMenuClick}>
                    <Avatar.Image source={{ uri: user.avatar }} />
                    <Text>{user.name}</Text>
                  </IconButton>
                </View>
              }
            >
              <MenuItem onPress={handleProfileClick}>Profile</MenuItem>
              <MenuItem onPress={handleLogout}>Logout</MenuItem>
            </Menu>
          </View>
        </View>

        <View style={styles.main}>
          {/* Rendu de l'écran actuel */}
          <Outlet />
        </View>
      </View>

      {/* Afficher la notification si nécessaire */}
      {notification && (
        <View style={styles.notification}>
          <Text>{notification}</Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  aside: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    display: 'none',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    padding: 10,
  },
  notification: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
};
