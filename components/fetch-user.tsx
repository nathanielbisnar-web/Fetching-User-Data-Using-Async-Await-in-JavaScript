import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type User = {
  name: string;
  email: string;
  address: { city: string };
};

export default function FetchUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as User;
      setUser(data);
    } catch (err: any) {
      setError(err?.message ?? 'Unknown error');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Remote user</ThemedText>
      {loading && <ActivityIndicator style={styles.indicator} />}
      {error && <ThemedText type="default" style={styles.error}>Error: {error}</ThemedText>}
      {user && (
        <ThemedView style={styles.card}>
          <ThemedText><ThemedText type="defaultSemiBold">Name:</ThemedText> {user.name}</ThemedText>
          <ThemedText><ThemedText type="defaultSemiBold">Email:</ThemedText> {user.email}</ThemedText>
          <ThemedText><ThemedText type="defaultSemiBold">City:</ThemedText> {user.address.city}</ThemedText>
        </ThemedView>
      )}
      <Pressable onPress={load} style={styles.button}>
        <ThemedText type="defaultSemiBold">Refresh</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    gap: 8,
  },
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  indicator: {
    marginVertical: 6,
  },
  error: {
    color: '#b00020',
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
