import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DataTable } from 'react-native-paper'

const CreateWorkoutScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const { surname } = route.params;
  const { age } = route.params;
  const { userDailyActivityLevel } = route.params;
  const { height } = route.params;
  const { weight } = route.params;
  const { gender } = route.params;
  const { selectedDays } = route.params;

  const [exerciseLevel, setExerciseLevel] = useState("intermediate");
  const [selectedExercises, setSelectedExercises] = useState([]);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, Exercises.length);

  // User Information -> {name} {surname} {age} {dailyActivityLevel} {height} {weight} {gender}
  const [Exercises] = useState([

    {
      name: "Incline Hammer Curls",
      gif_url: "https://www.inspireusafoundation.org/wp-content/uploads/2023/02/dumbbell-incline-hammer-curl.gif",
      image_url: "https://i.pinimg.com/originals/2e/f1/2c/2ef12c69560426956d1240a4972e5e59.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "dumbbell",
      difficulty: "beginner",
      instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
    },
    {
      name: "Wide-grip barbell curl",
      gif_url: "https://gymvisual.com/img/p/1/0/0/9/4/10094.gif",

      image_url: "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638183377952-LJZ8PDJYO558HFQV31KX/Standing%2BEZ%2BBar%2BCurls.jpeg",
      type: "strength",
      muscle: "biceps",
      equipment: "barbell",
      difficulty: "beginner",
      instructions: "Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions.  Variations:  You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
    },
    {
      name: "EZ-bar spider curl",
      gif_url: "https://fitliferegime.com/wp-content/uploads/2023/08/How-To-Do-Spider-Curl.gif",

      image_url: "https://www.lyfta.app/thumbnails/16281201.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "barbell",
      difficulty: "intermediate",
      instructions: "Start out by setting the bar on the part of the preacher bench that you would normally sit on. Make sure to align the barbell properly so that it is balanced and will not fall off. Move to the front side of the preacher bench (the part where the arms usually lay) and position yourself to lay at a 45 degree slant with your torso and stomach pressed against the front side of the preacher bench. Make sure that your feet (especially the toes) are well positioned on the floor and place your upper arms on top of the pad located on the inside part of the preacher bench. Use your arms to grab the barbell with a supinated grip (palms facing up) at about shoulder width apart or slightly closer from each other. Slowly begin to lift the barbell upwards and exhale. Hold the contracted position for a second as you squeeze the biceps. Slowly begin to bring the barbell back to the starting position as your breathe in. . Repeat for the recommended amount of repetitions.  Variation: You can also use dumbbells when performing this exercise. Just make sure you place the dumbbells on the part of the preacher bench where you would normally sit properly."
    },
    {
      name: "Hammer Curls",
      gif_url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",

      image_url: "https://i.pinimg.com/originals/2e/f1/2c/2ef12c69560426956d1240a4972e5e59.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "dumbbell",
      difficulty: "intermediate",
      instructions: "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso. The palms of the hands should be facing your torso. This will be your starting position. Now, while holding your upper arm stationary, exhale and curl the weight forward while contracting the biceps. Continue to raise the weight until the biceps are fully contracted and the dumbbell is at shoulder level. Hold the contracted position for a brief moment as you squeeze the biceps. Tip: Focus on keeping the elbow stationary and only moving your forearm. After the brief pause, inhale and slowly begin the lower the dumbbells back down to the starting position. Repeat for the recommended amount of repetitions.  Variations: There are many possible variations for this movement. For instance, you can perform the exercise sitting down on a bench with or without back support and you can also perform it by alternating arms; first lift the right arm for one repetition, then the left, then the right, etc."
    },
    {
      name: "EZ-Bar Curl",
      gif_url: "https://static.wixstatic.com/media/00b9a7_10520757ce4145aeb32f5f4d174b3e60~mv2.gif",

      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Re4Woqi1JroSCJEcS4Auyzq86n24fnnggPaR4Qn1aw&s",
      type: "strength",
      muscle: "biceps",
      equipment: "e-z_curl_bar",
      difficulty: "intermediate",
      instructions: "Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward due to the shape of the bar. Keep your elbows close to your torso. This will be your starting position. Now, while keeping your upper arms stationary, exhale and curl the weights forward while contracting the biceps. Focus on only moving your forearms. Continue to raise the weight until your biceps are fully contracted and the bar is at shoulder level. Hold the top contracted position for a moment and squeeze the biceps. Then inhale and slowly lower the bar back to the starting position. Repeat for the recommended amount of repetitions.  Variations: You can also perform this movement using an E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
    },
    {
      name: "Zottman Curl",
      gif_url: "https://i.pinimg.com/originals/4b/e4/68/4be46841032506b311d43b8d49c6a58a.gif",

      image_url: "https://images.squarespace-cdn.com/content/v1/5e9f8e841520b34d121c63f2/1631682597694-TN6NR4DYVJMWV7KYAMA4/zottman-curl.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "None",
      difficulty: "intermediate",
      instructions: "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Make sure the palms of the hands are facing each other. This will be your starting position. While holding the upper arm stationary, curl the weights while contracting the biceps as you breathe out. Only the forearms should move. Your wrist should rotate so that you have a supinated (palms up) grip. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Now during the contracted position, rotate your wrist until you now have a pronated (palms facing down) grip with the thumb at a higher position than the pinky. Slowly begin to bring the dumbbells back down using the pronated grip. As the dumbbells close your thighs, start rotating the wrist so that you go back to a neutral (palms facing your body) grip. Repeat for the recommended amount of repetitions."
    },
    {
      name: "Biceps curl to shoulder press",
      gif_url: "https://gymvisual.com/img/p/2/0/9/5/4/20954.gif",

      image_url: "https://ginasiovirtual.com/wp-content/uploads/2021/06/curl-de-bicep-com-press-de-ombros.webp",
      type: "strength",
      muscle: "biceps",
      equipment: "dumbbell",
      difficulty: "beginner",
      instructions: "Begin in a standing position with a dumbbell in each hand. Your arms should be hanging at your sides with your palms facing forward. Look directly ahead, keeping your chest up, with your feet shoulder-width apart. This will be your starting position. Initiate the movement by flexing the elbows to curl the weight. Do not use momentum or flex through the shoulder, instead use a controlled motion. Execute the pressing movement by extending the arm, flexing and abducting the shoulder to rotate the arm as you press above your head. Pause at the top of the motion before reversing the movement to return to the starting position. Complete the desired number of repetitions before switching to the opposite side."
    },
    {
      name: "Barbell Curl",
      gif_url: "https://gymvisual.com/img/p/1/0/0/9/4/10094.gif",
      image_url:  "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638183377952-LJZ8PDJYO558HFQV31KX/Standing%2BEZ%2BBar%2BCurls.jpeg",
      type: "strength",
      muscle: "biceps",
      equipment: "barbell",
      difficulty: "intermediate",
      instructions: "Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions.  Variations:  You can also perform this movement using a straight bar attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
    },
    {
      name: "Concentration curl",
      gif_url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif",
      image_url: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/concentration-curl-benefits.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "dumbbell",
      difficulty: "intermediate",
      instructions: "Sit down on a flat bench with one dumbbell in front of you between your legs. Your legs should be spread with your knees bent and feet on the floor. Use your right arm to pick the dumbbell up. Place the back of your right upper arm on the top of your inner right thigh. Rotate the palm of your hand until it is facing forward away from your thigh. Tip: Your arm should be extended and the dumbbell should be above the floor. This will be your starting position. While holding the upper arm stationary, curl the weights forward while contracting the biceps as you breathe out. Only the forearms should move. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Tip: At the top of the movement make sure that the little finger of your arm is higher than your thumb. This guarantees a good contraction. Hold the contracted position for a second as you squeeze the biceps. Slowly begin to bring the dumbbells back to starting position as your breathe in. Caution: Avoid swinging motions at any time. Repeat for the recommended amount of repetitions. Then repeat the movement with the left arm.  Variations: This exercise can be performed standing with the torso bent forward and the arm in front of you. In this case, no leg support is used for the back of your arm so you will need to make extra effort to ensure no movement of the upper arm. This is a more challenging version of the exercise and is not recommended for people with lower back issues."
    },
    {
      name: "Flexor Incline Dumbbell Curls",
      gif_url: "https://i.pinimg.com/originals/b4/30/64/b43064d9ad9f42493dbcf37e653ab87c.gif",
      image_url : "https://www.aleanlife.com/wp-content/uploads/2022/12/incline-dumbbell-curl-1.jpg",
      type: "strength",
      muscle: "biceps",
      equipment: "dumbbell",
      difficulty: "expert",
      instructions: "Hold the dumbbell towards the side farther from you so that you have more weight on the side closest to you. (This can be done for a good effect on all bicep dumbbell exercises). Now do a normal incline dumbbell curl, but keep your wrists as far back as possible so as to neutralize any stress that is placed on them. Sit on an incline bench that is angled at 45-degrees while holding a dumbbell on each hand. Let your arms hang down on your sides, with the elbows in, and turn the palms of your hands forward with the thumbs pointing away from the body. Tip: You will keep this hand position throughout the movement as there should not be any twisting of the hands as they come up. This will be your starting position. Curl up the two dumbbells at the same time until your biceps are fully contracted and exhale. Tip: Do not swing the arms or use momentum. Keep a controlled motion at all times. Hold the contracted position for a second at the top. As you inhale, slowly go back to the starting position. Repeat for the recommended amount of repetitions.  Caution: Do not extend your arms totally as you could injure your elbows if you hyperextend them. Also, make sure that on the way down you move slowly to avoid injury. Variations: You can use cables for this movement as well."
    }

  ])



  const calculateExerciseLevel = () => {
    let BMR;
    let totalCalory;

    if (gender === "female") {
      BMR = 88.362 + (13.397 * weight) + (3.799 * height) - (5.677 * age);
    } else {
      BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    totalCalory = BMR * userDailyActivityLevel;

    if (totalCalory < 1500) {
      setExerciseLevel("beginner");
    } else if (totalCalory >= 1500 && totalCalory < 3500) {
      setExerciseLevel("intermediate");
    } else {
      setExerciseLevel("expert");
    }

    console.log(userDailyActivityLevel);
  }

  const handleCheckboxToggle = (isChecked, item) => {
    if (isChecked) {
      setSelectedExercises(prevItems => [...prevItems, item]);
    } else {
      setSelectedExercises(prevItems => prevItems.filter(element => element.name !== item.name));
    }


  }

  console.log(exerciseLevel, "level");
  return (
    <View style={tw`flex-1 justify-center items-center bg-teal-600`}>
      
    </View>
  );
};


export default CreateWorkoutScreen;

const styles = StyleSheet.create({

});