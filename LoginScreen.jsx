import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username === "" || password === "") {
      Alert.alert("peringatan", "isi semua data");
      return;
    }
    Alert.alert("Login berhasil", `selamat datang, ${username}!`);
  }

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-2xl font-bold mb-4">Login</Text>

      <TextInput
        className="border p-3 mb-3 rounded"
        placeholder="Masukkan Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="border p-3 mb-3 rounded"
        placeholder="Masukkan Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={handleLogin} className="bg-blue-500 p-3 rounded">
        <Text className="text-white text-center font-bold">Login</Text>
      </Pressable>
    </View>
  );
}
