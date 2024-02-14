// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import Checkbox from 'expo-checkbox';

// const TrackerTemplate = () => {
//   const [firstTime, setFirstTime] = useState(true);
//   const [meal, setMeal] = useState(false);
//   const [gym, setGym] = useState(false);
//   const [periods, setPeriods] = useState(false);
//   const [custom, setCustom] = useState("");
//   const [customTrackerType, setCustomTrackerType] = useState("Checkbox");

//   const handleStartTracking = () => {
//     setFirstTime(false);
//     // Here you can send the selected options to your backend or store them locally
//   };

//   return (
//     <View style={styles.overlay}>
//     <View style={styles.container}>
//       {firstTime ? (
//         <View style={styles.content}>
//           <Text style={styles.title}>What would you like to track?</Text>
//           <View style={s tyles.options}>
//             <View style={styles.option}>
//               <Checkbox value={meal} onValueChange={() => setMeal(!meal)} />
//               <Text style={styles.optionText}>Meal</Text>
//             </View>
//             <View style={styles.option}>
//               <Checkbox value={gym} onValueChange={() => setGym(!gym)} />
//               <Text style={styles.optionText}>Gym</Text>
//             </View>
//             <View style={styles.option}>
//               <Checkbox value={periods} onValueChange={() => setPeriods(!periods)} />
//               <Text style={styles.optionText}>Periods</Text>
//             </View>
//             <View style={styles.customInput}>
//               <TextInput
//                 placeholder="Enter custom option"
//                 value={custom}
//                 onChangeText={(text) => setCustom(text)}
//                 style={styles.customInputText}
//               />
//             </View>
//             <View style={styles.trackerType}>
//               <Text style={styles.trackerTypeText}>Tracker Type:</Text>
//               <View style={styles.trackerTypeOptions}>
//                 <Text style={styles.trackerTypeOptionText}>Checkbox</Text>
//                 <Checkbox
//                   value={customTrackerType === "Checkbox"}
//                   onValueChange={() => setCustomTrackerType("Checkbox")}
//                 />
//                 <Text style={styles.trackerTypeOptionText}>Notes</Text>
//                 <Checkbox
//                   value={customTrackerType === "notes"}
//                   onValueChange={() => setCustomTrackerType("notes")}
//                 />
//               </View>
//             </View>
//             <Button title="Start Tracking" onPress={handleStartTracking} style={styles.startButton} />
//           </View>
//         </View>
//       ) : (
//         <View>
//           <Text>Tracker is ready to use!</Text>
//           {/* Display tracked options here */}
//         </View>
//       )}
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   options: {
//     marginTop: 20,
//   },
//   option: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   optionText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   customInput: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   customInputText: {
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 10,
//     borderRadius: 5,
//   },
//   trackerType: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   trackerTypeText: {
//     marginRight: 10,
//     fontSize: 16,
//   },
//   trackerTypeOptions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   trackerTypeOptionText: {
//     marginRight: 10,
//     fontSize: 16,
//   },
//   startButton: {
//     alignSelf: "center",
//   },
//   overlay: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     flex: 1,
//     width: '100%'
//   },
// });

// export default TrackerTemplate;



import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const JournalEntryScreen = ({ onSave }) => {
  const [entry, setEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const saveEntry = () => {
    onSave({ entry, selectedDate });
    setEntry('');
  };

  return (
    <View style={styles.overlay}>
    <View style={styles.container}>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event, date) => setSelectedDate(date)}
      />
      <TextInput
        multiline
        numberOfLines={4}
        value={entry}
        onChangeText={setEntry}
        placeholder="Write about your day..."
        style={styles.input}
      />
      <Button title="Save Entry" onPress={saveEntry} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    width: "100%",
  },
});

export default JournalEntryScreen;

