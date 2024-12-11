import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { router } from "expo-router";
import { Button, TextInput } from "react-native-paper";

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  // if user is Signed in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/(tabs)");
      // if (user) setUser(user);
    });
  });

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // If statement
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };
  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // If statement
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  return (
    <SafeAreaView>
      {user ? (
        router.replace("/(tabs")
      ) : (
        <>
          <View>
            <Text style={{ color: "coral" }}>Sign In or Create Account</Text>
            <TextInput
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              placeholder="Email Address..."
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              placeholder="Password..."
              onChangeText={(text) => setPassword(text)}
            />
            <Button mode="contained" onPress={signUp}>
              <Text>Sign Up</Text>
            </Button>
            <Button mode="contained" onPress={signIn}>
              <Text>Sign In</Text>
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
