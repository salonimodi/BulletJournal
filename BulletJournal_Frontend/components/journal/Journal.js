import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Render item for each day on the agenda
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  // Render empty item for days without any entries
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No entries for this day</Text>
      </View>
    );
  };

  // Change selected date when day is pressed
  const dayPressHandler = (day) => {
    setSelectedDate(day.timestamp);
  };

  return (
    <View style={styles.container}>
      <Agenda
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={dayPressHandler}
        style={styles.agenda}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  agenda: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Journal;
