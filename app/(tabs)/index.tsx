import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { signOut, getAuth } from "firebase/auth";
import { router, useNavigation } from "expo-router";

export default function TabOneScreen() {
  const auth = getAuth();
  const navigation = useNavigation();

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
