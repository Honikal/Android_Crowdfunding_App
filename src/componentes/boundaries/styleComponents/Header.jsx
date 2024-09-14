// src/componentes/boundaries/styleComponents/Header.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

//Importamos el logo
import Logo from '../../../../assets/logo.png';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.logoText}>Crowdfounder</Text>
      </View>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search projects, categories..."
      />
      
      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.category}>Technology</Text>
        <Text style={styles.category}>Art and Culture</Text>
        <Text style={styles.category}>Entrepreneurship</Text>
        {/* Add more categories as needed */}
      </View>
      
      {/* Create Project Button */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Project</Text>
      </TouchableOpacity>
      
      {/* User Profile Section */}
      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.profileText}>Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ECF7FD',  // Color blanco de la paleta
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#75A1DE',  // Azul más oscuro
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#ffffff',  // Fondo blanco
    padding: 10,
    borderRadius: 10,
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  category: {
    marginHorizontal: 5,
    fontSize: 14,
    color: '#75A1DE',  // Azul más oscuro para las categorías
  },
  createButton: {
    backgroundColor: '#A8CEFF',  // Azul más claro para el botón de crear proyecto
    padding: 10,
    borderRadius: 10,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#75A1DE',  // Azul más oscuro para el botón de perfil
    padding: 10,
    borderRadius: 10,
  },
  profileText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Header;
