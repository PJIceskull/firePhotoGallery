import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { db } from "@/firebaseConfig.js";

export default function profile() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHolder}>
        <FontAwesome name="user-circle-o" size={150} color={Colors} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileHolder: {
    height: 150,
    width: 150,
    // backgroundColor: "red",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
