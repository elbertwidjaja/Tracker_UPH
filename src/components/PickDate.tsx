import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function PickDate({ onDateChange }: any) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (text: React.SetStateAction<string>) => {
    if (/^\d*$/.test(text)) {
      setDay(text);
    }
  };

  const handleMonthChange = (text: React.SetStateAction<string>) => {
    if (/^\d*$/.test(text)) {
      setMonth(text);
    }
  };

  const handleYearChange = (text: React.SetStateAction<string>) => {
    if (/^\d*$/.test(text)) {
      setYear(text);
    }
  };

  const formatDate = () => {
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");
    const formattedYear = year.padStart(4, "0");
    const date = `${formattedYear}-${formattedMonth}-${formattedDay}`;
    return date;
  };

  const handleBlur = () => {
    const date = formatDate();
    if (day && month && year && day <= 31 && month <= 12) {
      onDateChange(date);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="DD"
        keyboardType="number-pad"
        maxLength={2}
        value={day}
        onChangeText={handleDayChange}
        onBlur={handleBlur}
      />
      <TextInput
        style={styles.input}
        placeholder="MM"
        keyboardType="number-pad"
        maxLength={2}
        value={month}
        onChangeText={handleMonthChange}
        onBlur={handleBlur}
      />
      <TextInput
        style={styles.input}
        placeholder="YYYY"
        keyboardType="number-pad"
        maxLength={4}
        value={year}
        onChangeText={handleYearChange}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    width: 60,
    height: 40,
  },
});
