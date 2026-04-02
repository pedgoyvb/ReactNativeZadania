import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

function SettingsRow({ label, value, onPress, danger, theme }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.settingsRow,
        { backgroundColor: theme.card, borderColor: theme.border },
        danger && { backgroundColor: theme.dangerBg, borderColor: theme.danger },
      ]}
    >
      <Text
        style={[
          styles.settingsLabel,
          { color: danger ? theme.danger : theme.text },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.settingsValue,
          { color: danger ? theme.danger : theme.muted },
        ]}
      >
        {value}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const bioLimit = 120;

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  const [form, setForm] = useState({
    name: "Karolina",
    email: "karolina@example.com",
    city: "Gliwice",
    bio: "Studentka interesująca się aplikacjami mobilnymi i UI.",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const theme = darkMode
    ? {
        bg: "#111827",
        card: "#1f2937",
        text: "#f9fafb",
        muted: "#9ca3af",
        border: "#374151",
        inputBg: "#111827",
        primary: "#60a5fa",
        success: "#34d399",
        error: "#f87171",
        danger: "#f87171",
        dangerBg: "#2a1616",
      }
    : {
        bg: "#f3f4f6",
        card: "#ffffff",
        text: "#111827",
        muted: "#6b7280",
        border: "#d1d5db",
        inputBg: "#ffffff",
        primary: "#2563eb",
        success: "#059669",
        error: "#dc2626",
        danger: "#dc2626",
        dangerBg: "#fef2f2",
      };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Imię nie może być puste.";
    }

    if (!form.email.includes("@")) {
      return "E-mail musi zawierać znak @.";
    }

    if (form.bio.length > bioLimit) {
      return `Bio nie może przekraczać ${bioLimit} znaków.`;
    }

    return "";
  };

  const handleSave = () => {
    const error = validateForm();

    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setMessage({ type: "success", text: "Dane zostały zapisane poprawnie." });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.screenTitle, { color: theme.text }]}>
        Panel użytkownika
      </Text>

      <View
        style={[
          styles.profileCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>
            {form.name.trim() ? form.name.trim()[0].toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={[styles.profileName, { color: theme.text }]}>
          {form.name || "Brak imienia"}
        </Text>
        <Text style={[styles.profileCity, { color: theme.muted }]}>
          {form.city || "Brak miasta"}
        </Text>
        <Text style={[styles.profileBio, { color: theme.text }]}>
          {form.bio || "Brak opisu użytkownika."}
        </Text>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Edycja danych
        </Text>

        <Text style={[styles.label, { color: theme.text }]}>Imię</Text>
        <TextInput
          value={form.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Wpisz imię"
          placeholderTextColor={theme.muted}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
        <TextInput
          value={form.email}
          onChangeText={(value) => updateField("email", value)}
          placeholder="Wpisz e-mail"
          placeholderTextColor={theme.muted}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Miasto</Text>
        <TextInput
          value={form.city}
          onChangeText={(value) => updateField("city", value)}
          placeholder="Wpisz miasto"
          placeholderTextColor={theme.muted}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Bio</Text>
        <TextInput
          value={form.bio}
          onChangeText={(value) => updateField("bio", value)}
          placeholder="Napisz coś o sobie"
          placeholderTextColor={theme.muted}
          multiline
          style={[
            styles.input,
            styles.bioInput,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <Text
          style={[
            styles.counter,
            {
              color: form.bio.length > bioLimit ? theme.error : theme.muted,
            },
          ]}
        >
          {form.bio.length}/{bioLimit}
        </Text>

        {message.text ? (
          <Text
            style={[
              styles.message,
              { color: message.type === "error" ? theme.error : theme.success },
            ]}
          >
            {message.text}
          </Text>
        ) : null}

        <Pressable
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Ustawienia
        </Text>

        <SettingsRow
          label="Powiadomienia"
          value={notificationsEnabled ? "Włączone" : "Wyłączone"}
          onPress={() => setNotificationsEnabled((prev) => !prev)}
          theme={theme}
        />

        <SettingsRow
          label="Prywatność"
          value={privacyMode ? "Prywatny profil" : "Profil publiczny"}
          onPress={() => setPrivacyMode((prev) => !prev)}
          theme={theme}
        />

        <SettingsRow
          label="Ciemny motyw"
          value={darkMode ? "Włączony" : "Wyłączony"}
          onPress={() => setDarkMode((prev) => !prev)}
          theme={theme}
        />

        <SettingsRow
          label="O aplikacji"
          value="Wersja 1.0"
          onPress={() =>
            setMessage({
              type: "success",
              text: "To przykładowy ekran panelu użytkownika.",
            })
          }
          theme={theme}
        />
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Konto
        </Text>

        <SettingsRow
          label="Wyloguj"
          value="Naciśnij"
          onPress={() =>
            setMessage({
              type: "success",
              text: "Symulacja wylogowania wykonana.",
            })
          }
          danger
          theme={theme}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  profileCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
  },
  profileCity: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  bioInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  counter: {
    alignSelf: "flex-end",
    marginBottom: 12,
    fontSize: 13,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  settingsRow: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  settingsValue: {
    fontSize: 14,
  },
});
