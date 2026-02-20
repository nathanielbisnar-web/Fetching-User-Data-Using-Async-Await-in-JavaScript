import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    getUsers();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      {error ? (
        <Text>Error: {error}</Text>
      ) : (
        users.map((user) => (
          <View key={user.id} style={{ marginBottom: 15 }}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>City: {user.address.city}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}