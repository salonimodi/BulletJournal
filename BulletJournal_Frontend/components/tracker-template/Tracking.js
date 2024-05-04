import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Checkbox from "expo-checkbox";

const Tracking = ({ token }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trackers, setTrackers] = useState([]);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    fetchTrackers();
    fetchSavedData(selectedDate); 
  }, [selectedDate]); 

  const fetchTrackers = async () => {
    try {
      const response = await axios.get(`http://192.168.1.41:3000/api/tracker/`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const allTrackers = response.data?.trackers;
      const filteredTrackers = allTrackers.filter(tracker => {
        if (tracker.frequency === "weekly") {
          return parseInt(tracker.selectedDay) === selectedDate.getDay();
        } else if (tracker.frequency === "monthly") {
          return parseInt(tracker.selectedDate) === selectedDate.getDate();
        } else {
          return true;
        }
      });

      setTrackers(filteredTrackers);
      initializeFormData(filteredTrackers);

    } catch (error) {
      console.error('Failed to fetch trackers:', error);
    }
  };

  const initializeFormData = (trackers) => {
    const data = {};
    trackers.forEach(tracker => {
      data[tracker._id] = { isChecked: false, value: '' };
    });
    setFormData(data);
  };

  const handleChange = (trackerId, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [trackerId]: {
        ...prevState[trackerId],
        [field]: value,
      },
    }));
  };

  const saveDataToDatabase = async () => {
    try {
      const dataToSend = [];
      Object.keys(formData).forEach(trackerId => {
        dataToSend.push({
          trackerId,
          isChecked: formData[trackerId]?.isChecked || false,
          value: formData[trackerId]?.value || '',
        });
      });
  
      await axios.post(`http://192.168.1.41:3000/api/tracker/save`, {
        data: dataToSend,
        date: selectedDate.toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Data saved successfully!');
      setSavedData(prevState => ({
        ...prevState,
        [selectedDate.toISOString().split('T')[0]]: dataToSend.reduce((acc, obj) => {
          acc[obj.trackerId] = { isChecked: obj.isChecked, value: obj.value };
          return acc;
        }, {})
      }));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const fetchSavedData = async (date) => {
    try {
      const response = await axios.get(`http://192.168.1.41:3000/api/tracker/fetch/${date.toISOString().split('T')[0]}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data.trackerEntries)
      const savedDataForDate = response.data.trackerEntries.reduce((acc, entry) => {
        acc[entry.trackerId] = { isChecked: entry.isChecked, value: entry.value };
        return acc;
      }, {});
  
      if (Object.keys(savedDataForDate).length > 0) {
        setSavedData(prevState => ({
          ...prevState,
          [date.toISOString().split('T')[0]]: savedDataForDate
        }));
        setFormData(savedDataForDate);
      } else {
        setSavedData(prevState => ({
          ...prevState,
          [date.toISOString().split('T')[0]]: {}
        }));
        setFormData({});
      }
  
      console.log('Saved data fetched successfully:', savedDataForDate);
    } catch (error) {
      console.error('Failed to fetch saved data:', error);
    }
  };
  

  const renderTrackers = () => {
    return trackers.map(tracker => (
      <View key={tracker._id} style={styles.trackerContainer}>
        <Text style={styles.trackerName}>{tracker.trackerName}</Text>
        <View style={styles.inputContainer}>
          <Checkbox
            value={formData[tracker._id]?.isChecked || false}
            onValueChange={newValue => handleChange(tracker._id, 'isChecked', newValue)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter data"
            value={formData[tracker._id]?.value || ''}
            onChangeText={text => handleChange(tracker._id, 'value', text)}
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => setSelectedDate(date)}
        />
      </View>
      <View style={styles.entriesContainer}>
        {renderTrackers()}
      </View>
      <Button title="Save" onPress={saveDataToDatabase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  trackerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackerName: {
    fontSize: 16,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 150,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
});

export default Tracking;
