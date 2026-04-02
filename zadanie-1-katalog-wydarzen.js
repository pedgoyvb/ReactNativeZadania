import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const DATA = [
  {
    id: "1",
    title: "Konferencja IT",
    date: "12.04",
    category: "Nauka",
    location: "Katowice",
    favorite: false,
  },
  {
    id: "2",
    title: "Mecz piłki",
    date: "15.04",
    category: "Sport",
    location: "Gliwice",
    favorite: false,
  },
  {
    id: "3",
    title: "Koncert rockowy",
    date: "20.04",
    category: "Muzyka",
    location: "Kraków",
    favorite: false,
  },
  {
    id: "4",
    title: "Seans filmowy",
    date: "22.04",
    category: "Film",
    location: "Zabrze",
    favorite: false,
  },
];

const categories = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film"];

const EventCard = ({ item, onToggle }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.date} • {item.location}</Text>
    <Text>{item.category}</Text>

    <Pressable onPress={() => onToggle(item.id)} style={styles.button}>
      <Text style={styles.buttonText}>
        {item.favorite ? "★ Ulubione" : "☆ Dodaj"}
      </Text>
    </Pressable>
  </View>
);

export default function App() {
  const [events, setEvents] = useState(DATA);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [onlyFav, setOnlyFav] = useState(false);

  const toggleFavorite = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, favorite: !e.favorite } : e
      )
    );
  };

  const filtered = events.filter((e) => {
    const matchesText = e.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === "Wszystkie" || e.category === selectedCategory;
    const matchesFav = !onlyFav || e.favorite;

    return matchesText && matchesCategory && matchesFav;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Katalog wydarzeń</Text>

      <TextInput
        placeholder="Szukaj..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <View style={styles.filters}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.filterBtn,
              selectedCategory === cat && styles.active,
            ]}
          >
            <Text>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => setOnlyFav(!onlyFav)} style={styles.favToggle}>
        <Text>⭐ Tylko ulubione</Text>
      </Pressable>

      <Text style={styles.count}>
        Wyniki: {filtered.length}
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard item={item} onToggle={toggleFavorite} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 10,
  },

  filterBtn: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
  },

  active: {
    backgroundColor: "#ddd",
  },

  favToggle: {
    marginBottom: 10,
  },

  count: {
    marginBottom: 10,
    fontWeight: "bold",
  },

  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    marginTop: 5,
  },

  buttonText: {
    color: "blue",
  },
});
