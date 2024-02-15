// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegistrationScreen";
// import MainScreen from "./screens/MainScreen";

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <View style={styles.container}>
//       {isLoggedIn ? (
//         <MainScreen />
//       ) : (
//         <>
//           <LoginScreen onLogin={() => setIsLoggedIn(true)} />
//           <RegisterScreen />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });


// import React, { createContext, useState, useContext } from "react";
// import { StyleSheet, View } from "react-native";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegistrationScreen";
// import MainScreen from "./screens/MainScreen";

// // Create an authentication context
// const AuthContext = createContext();

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   }
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login,  register}}>
//       <View style={styles.container}>
//         <AuthenticationGuard />
//       </View>
//     </AuthContext.Provider>
//   );
// }

// // AuthenticationGuard component to manage authentication state
// function AuthenticationGuard() {
//   const { isLoggedIn } = useContext(AuthContext);

//   return isLoggedIn ? <MainScreen /> : <LoginAndRegisterScreens />;
// }

// // LoginAndRegisterScreens component to display login and registration screens
// function LoginAndRegisterScreens() {
//   return (
//     <>
//       <LoginScreen onLogin={handleLogin} />
//       <RegisterScreen onRegister={handleLogin}/>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

// import React, { createContext, useState, useContext } from "react";
// import { StyleSheet, View } from "react-native";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegistrationScreen";
// import MainScreen from "./screens/MainScreen";

// const AuthContext = createContext();

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login }}>
//       <View style={styles.container}>
//         <AuthenticationGuard />
//       </View>
//     </AuthContext.Provider>
//   );
// }

// function AuthenticationGuard() {
//   const { isLoggedIn } = useContext(AuthContext);

//   return isLoggedIn ? <MainScreen /> : <LoginAndRegisterScreens />;
// }

// function LoginAndRegisterScreens() {
//   return (
//     <>
//       <LoginScreen />
//       <RegisterScreen/>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name ="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
