// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
// import axios from "axios";

// const BASE_URL = "http://192.168.1.41:3000/api";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/login`, { email, password });
//       const { token } = response.data;
//       onLogin();
//     } catch (error) {
//       Alert.alert("Error", "Invalid email or password");
//     }
//   };

//   // return (
//   //   <View style={styles.container}>
//   //     <TextInput
//   //       placeholder="Email"
//   //       value={email}
//   //       onChangeText={(text) => setEmail(text)}
//   //       style={styles.input}
//   //     />
//   //     <TextInput
//   //       placeholder="Password"
//   //       value={password}
//   //       onChangeText={(text) => setPassword(text)}
//   //       secureTextEntry
//   //       style={styles.input}
//   //     />
//   //     <Button title="Login" onPress={handleLogin} />
//   //   </View>
//   // );

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Login</Text>
//       <TextInput placeholder="email/Email" />
//       <TextInput placeholder="Password" secureTextEntry={true} />
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text>Don't have an account yet? Register Here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('email and password are required');
      return;
    }

    const credentials = {
      email: email,
      password: password
    };

    fetch('http://192.168.1.41:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      Alert.alert('Login successful');
      navigation.navigate('MainScreen');
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Login failed. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account yet? Register Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16
  },
  registerLink: {
    marginTop: 20,
    color: '#008080'
  }
});