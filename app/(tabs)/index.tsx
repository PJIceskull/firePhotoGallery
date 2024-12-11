import { Button, Image, StyleSheet } from "react-native";
import { useState } from "react";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { db } from "@/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { router, useNavigation } from "expo-router";

import * as ImagePicker from "expo-image-picker";

export default function home() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      alert("Sign In Failed! " + err.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      alert("Sign In Failed! " + err.message);
    }
  };

  const addUser = async () => {
    const userObj = {
      name: userName,
    };
    await addDoc(collection(db, "ReactUser"), userObj)
      .then((docRef) => {
        setUserName("");
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
  };

  const deleteName = async function (id) {
    console.log("delete: ", id);
    try {
      await deleteDoc(doc(db, "ReactUser", id));
    } catch (error) {
      console.error("Error deleting names: ", error.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image</Text>
      <View>
        <FontAwesome name="upload" size={75} color={Colors.orange} />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.polyBlue,
  },
  image: {
    width: 200,
    height: 200,
  },
});
