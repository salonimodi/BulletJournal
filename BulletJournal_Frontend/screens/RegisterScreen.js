// // RegisterScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from "axios";

// const RegisterScreen = ({ navigation }) => {
//   const [username, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = ({ navigation }) => {
//     axios.post("http://192.168.1.41:3000/api/register", { username, email, password })
//       .then(response => {
//         const token = response.data.token;
//         onRegister()
//       })
//       .catch(error => {
//         Alert.alert("Registration Failed", "Failed to register. Please try again.");
//       });
//   };

//   // return (
//   //   <View style={styles.container}>
//   //     <Text>Register</Text>
//   //     <TextInput
//   //       style={styles.input}
//   //       placeholder="UserName"
//   //       value={username}
//   //       onChangeText={setUserName}
//   //     />
//   //     <TextInput
//   //       style={styles.input}
//   //       placeholder="Email"
//   //       value={email}
//   //       onChangeText={setEmail}
//   //     />
//   //     <TextInput
//   //       style={styles.input}
//   //       placeholder="Password"
//   //       secureTextEntry
//   //       value={password}
//   //       onChangeText={setPassword}
//   //     />
//   //     <Button title="Register" onPress={handleRegister} />
//   //   </View>
//   // );
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Register</Text>
//       <TextInput placeholder="Full Name" />
//       <TextInput placeholder="Username" />
//       <TextInput placeholder="Email Address" />
//       <TextInput placeholder="Password" secureTextEntry={true} />
//       <TextInput placeholder="Confirm Password" secureTextEntry={true} />
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text>Register</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text>Already have an account? Login Here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     marginVertical: 10,
//     width: '80%',
//   },
// });

// export default RegisterScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Validate form fields
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Create user object
    const newUser = {
      fullName: fullName,
      username: username,
      email: email,
      password: password
    };

    // Make API call to register user
    fetch('http://192.168.1.41:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      Alert.alert('Registration successful');
      navigation.navigate('Login'); 
    })
    .catch(error => {
      // Handle registration error
      console.error('Error:', error);
      Alert.alert('Registration failed. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login Here</Text>
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
  loginLink: {
    marginTop: 20,
    color: '#008080'
  }
});