import { View, Text, ImageBackground, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Banner from '../assets/bannerWorkout.png';
import tw from "twrnc";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import ExerciseImage from '../assets/Exercise.png';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FIREBASE_AUTH, db } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { err } from 'react-native-svg';

const CurrentWorkout = ({ navigation, route }) => {
    // const { Exercises } = route.params;

    const mockExercises = [
        {
            "name": "Incline Hammer Curls",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2023/02/dumbbell-incline-hammer-curl.gif",
            "image_url": "https://i.pinimg.com/originals/2e/f1/2c/2ef12c69560426956d1240a4972e5e59.jpg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_longhead",
            "equipment": "dumbbell",
            "difficulty": "beginner",
            "instructions": "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
        },
        {
            "name": "Wide-grip barbell curl",
            "gif_url": "https://gymvisual.com/img/p/1/0/0/9/4/10094.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638183377952-LJZ8PDJYO558HFQV31KX/Standing%2BEZ%2BBar%2BCurls.jpeg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions.  Variations:  You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
        },
        {
            "name": "EZ-bar spider curl",
            "gif_url": "https://fitliferegime.com/wp-content/uploads/2023/08/How-To-Do-Spider-Curl.gif",
            "image_url": "https://www.lyfta.app/thumbnails/16281201.jpg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Start out by setting the bar on the part of the preacher bench that you would normally sit on. Make sure to align the barbell properly so that it is balanced and will not fall off. Move to the front side of the preacher bench (the part where the arms usually lay) and position yourself to lay at a 45 degree slant with your torso and stomach pressed against the front side of the preacher bench. Make sure that your feet (especially the toes) are well positioned on the floor and place your upper arms on top of the pad located on the inside part of the preacher bench. Use your arms to grab the barbell with a supinated grip (palms facing up) at about shoulder width apart or slightly closer from each other. Slowly begin to lift the barbell upwards and exhale. Hold the contracted position for a second as you squeeze the biceps. Slowly begin to bring the barbell back to the starting position as your breathe in. . Repeat for the recommended amount of repetitions.  Variation: You can also use dumbbells when performing this exercise. Just make sure you place the dumbbells on the part of the preacher bench where you would normally sit properly."
        },
        {
            "name": "Hammer Curls",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",
            "image_url": "https://cdn.shopify.com/s/files/1/1876/4703/files/shutterstock_419477203_480x480.jpg?v=1636560233",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_brachialis",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso. The palms of the hands should be facing your torso. This will be your starting position. Now, while holding your upper arm stationary, exhale and curl the weight forward while contracting the biceps. Continue to raise the weight until the biceps are fully contracted and the dumbbell is at shoulder level. Hold the contracted position for a brief moment as you squeeze the biceps. Tip: Focus on keeping the elbow stationary and only moving your forearm. After the brief pause, inhale and slowly begin the lower the dumbbells back down to the starting position. Repeat for the recommended amount of repetitions.  Variations: There are many possible variations for this movement. For instance, you can perform the exercise sitting down on a bench with or without back support and you can also perform it by alternating arms; first lift the right arm for one repetition, then the left, then the right, etc."
        },
        {
            "name": "EZ-Bar Curl",
            "gif_url": "https://static.wixstatic.com/media/00b9a7_10520757ce4145aeb32f5f4d174b3e60~mv2.gif",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Re4Woqi1JroSCJEcS4Auyzq86n24fnnggPaR4Qn1aw&s",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "e-z_curl_bar",
            "difficulty": "intermediate",
            "instructions": "Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward due to the shape of the bar. Keep your elbows close to your torso. This will be your starting position. Now, while keeping your upper arms stationary, exhale and curl the weights forward while contracting the biceps. Focus on only moving your forearms. Continue to raise the weight until your biceps are fully contracted and the bar is at shoulder level. Hold the top contracted position for a moment and squeeze the biceps. Then inhale and slowly lower the bar back to the starting position. Repeat for the recommended amount of repetitions.  Variations: You can also perform this movement using an E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
        },
        {
            "name": "Zottman Curl",
            "gif_url": "https://i.pinimg.com/originals/4b/e4/68/4be46841032506b311d43b8d49c6a58a.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/5e9f8e841520b34d121c63f2/1631682597694-TN6NR4DYVJMWV7KYAMA4/zottman-curl.jpg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Make sure the palms of the hands are facing each other. This will be your starting position. While holding the upper arm stationary, curl the weights while contracting the biceps as you breathe out. Only the forearms should move. Your wrist should rotate so that you have a supinated (palms up) grip. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Now during the contracted position, rotate your wrist until you now have a pronated (palms facing down) grip with the thumb at a higher position than the pinky. Slowly begin to bring the dumbbells back down using the pronated grip. As the dumbbells close your thighs, start rotating the wrist so that you go back to a neutral (palms facing your body) grip. Repeat for the recommended amount of repetitions."
        },
        {
            "name": "Barbell Curl",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2023/02/barbell-cheat-curl.gif",
            "image_url": "https://s3.amazonaws.com/prod.skimble/assets/1816221/image_iphone.jpg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions.  Variations:  You can also perform this movement using a straight bar attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes."
        },
        {
            "name": "Concentration curl",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/concentration-curl-benefits.jpg",
            "type": "strength",
            "muscle": "biceps",
            "muscle_target": "biceps_shorthead",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Sit down on a flat bench with one dumbbell in front of you between your legs. Your legs should be spread with your knees bent and feet on the floor. Use your right arm to pick the dumbbell up. Place the back of your right upper arm on the top of your inner right thigh. Rotate the palm of your hand until it is facing forward away from your thigh. Tip: Your arm should be extended and the dumbbell should be above the floor. This will be your starting position. While holding the upper arm stationary, curl the weights forward while contracting the biceps as you breathe out. Only the forearms should move. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Tip: At the top of the movement make sure that the little finger of your arm is higher than your thumb. This guarantees a good contraction. Hold the contracted position for a second as you squeeze the biceps. Slowly begin to bring the dumbbells back to starting position as your breathe in. Caution: Avoid swinging motions at any time. Repeat for the recommended amount of repetitions. Then repeat the movement with the left arm.  Variations: This exercise can be performed standing with the torso bent forward and the arm in front of you. In this case, no leg support is used for the back of your arm so you will need to make extra effort to ensure no movement of the upper arm. This is a more challenging version of the exercise and is not recommended for people with lower back issues."
        },
        {
            "name": "Triceps dip",
            "gif_url": "https://gymvisual.com/img/p/2/3/9/8/5/23985.gif",
            "image_url": "https://cdn.shopify.com/s/files/1/1283/2557/files/Triceps_Dips_Muscles_Worked_1024x1024.jpg?v=1678165383",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_lateralhead",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "To get into the starting position, hold your body at arm's length with your arms nearly locked above the bars. Now, inhale and slowly lower yourself downward. Your torso should remain upright and your elbows should stay close to your body. This helps to better focus on tricep involvement. Lower yourself until there is a 90 degree angle formed between the upper arm and forearm. Then, exhale and push your torso back up using your triceps to bring your body back to the starting position. Repeat the movement for the prescribed amount of repetitions.  Variations: If you are new at this exercise and do not have the strength to perform it, use a dip assist machine if available. These machines use weight to help you push your bodyweight. Otherwise, a spotter holding your legs can help. More advanced lifters can add weight to the exercise by using a weight belt that allows the addition of weighted plates."
        },
        {
            "name": "Decline EZ-bar skullcrusher",
            "gif_url": "https://gymvisual.com/img/p/4/7/6/6/4766.gif",
            "image_url": "https://weighttraining.guide/wp-content/uploads/2018/06/decline-ez-bar-skull-crusher-resized.png",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_lateralhead",
            "equipment": "e-z_curl_bar",
            "difficulty": "intermediate",
            "instructions": "Secure your legs at the end of the decline bench and slowly lay down on the bench. Using a close grip (a grip that is slightly less than shoulder width), lift the EZ bar from the rack and hold it straight over you with your arms locked and elbows in. The arms should be perpendicular to the floor. This will be your starting position. Tip: In order to protect your rotator cuff, it is best if you have a spotter help you lift the barbell off the rack. As you breathe in and you keep the upper arms stationary, bring the bar down slowly by moving your forearms in a semicircular motion towards you until you feel the bar slightly touch your forehead. Breathe in as you perform this portion of the movement. Lift the bar back to the starting position by contracting the triceps and exhaling. Repeat until the recommended amount of repetitions is performed.  Variations: You can use a straight bar or dumbbells to perform this movement. You can also perform it on a flat bench as well."
        },

        {
            "name": "Cable V-bar push-down",
            "gif_url": "https://gymvisual.com/img/p/4/9/7/4/4974.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638252558515-OSL1DPH49GL4EUKNUZNF/Standing%2BTwo%2BArm%2BOverhead%2BDumbbell%2BTriceps%2BExtensions.png",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_shorthead",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "Attach a V-Bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width. Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the bar. The thumbs should be higher than the small finger. This is your starting position. Using the triceps, bring the bar down until it touches the front of your thighs and the arms are fully extended perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement. After a second hold at the contracted position, bring the V-Bar slowly up to the starting point. Breathe in as you perform this step. Repeat for the recommended amount of repetitions.  Variations: There are many variations to this movement. For instance you can use an E-Z bar attachment as well as a straight cable bar attachment for different variations of the exercise. Also, you can attach a rope to the pulley as well as using a reverse grip on the bar exercises. Just like the Triceps Pushdown but with the V-Bar attachment."
        },
        {
            "name": "Weighted bench dip",
            "gif_url": "https://gymvisual.com/img/p/5/5/5/2/5552.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638260966540-876TFLNOQLTMNZG5QUGQ/Weighted%2BBench%2BTriceps%2BDips.png",
            "type": "strength",
            "muscle": "triceps",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "For this exercise you will need to place a bench behind your back and another one in front of you. With the benches perpendicular to your body, hold on to one bench on its edge with the hands close to your body, separated at shoulder width. Your arms should be fully extended. The legs will be extended forward on top of the other bench. Your legs should be parallel to the floor while your torso is to be perpendicular to the floor. Have your partner place the dumbbell on your lap. Note: This exercise is best performed with a partner as placing the weight on your lap can be challenging and cause injury without assistance. This will be your starting position. Slowly lower your body as you inhale by bending at the elbows until you lower yourself far enough to where there is an angle slightly smaller than 90 degrees between the upper arm and the forearm. Tip: Keep the elbows as close as possible throughout the movement. Forearms should always be pointing down. Using your triceps to bring your torso up again, lift yourself back to the starting position while exhaling. Repeat for the recommended amount of repetitions.  Caution: By placing your legs on top of another flat bench in front of you, the exercise becomes more challenging. It is best to attempt this exercise without any weights at first in order to get used to the movements required for good form. If that variation also becomes easy, then you can have a partner place plates on top of your lap. Make sure that in this case the partner ensures that the weights stay there throughout the movement."
        },
        {
            "name": "EZ-Bar Skullcrusher",
            "gif_url": "https://gymvisual.com/img/p/1/8/2/4/3/18243.gif",
            "image_url": "https://s3.amazonaws.com/prod.skimble/assets/2399221/image_iphone.jpg",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_lateralhead",
            "equipment": "e-z_curl_bar",
            "difficulty": "intermediate",
            "instructions": "Using a close grip, lift the EZ bar and hold it with your elbows in as you lie on the bench. Your arms should be perpendicular to the floor. This will be your starting position. Keeping the upper arms stationary, lower the bar by allowing the elbows to flex. Inhale as you perform this portion of the movement. Pause once the bar is directly above the forehead. Lift the bar back to the starting position by extending the elbow and exhaling. Repeat."
        },
        {
            "name": "Reverse Grip Triceps Pushdown",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Reverse-Grip-Pushdown.gif",
            "image_url": "https://anabolicaliens.com/cdn/shop/articles/5fb55f667f160c562e9e4172_reverse-grip-tricep-pushdown.png?v=1641751032",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_medialhead",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "Start by setting a bar attachment (straight or e-z) on a high pulley machine. Facing the bar attachment, grab it with the palms facing up (supinated grip) at shoulder width. Lower the bar by using your lats until your arms are fully extended by your sides. Tip: Elbows should be in by your sides and your feet should be shoulder width apart from each other. This is the starting position. Slowly elevate the bar attachment up as you inhale so it is aligned with your chest. Only the forearms should move and the elbows/upper arms should be stationary by your side at all times. Then begin to lower the cable bar back down to the original staring position while exhaling and contracting the triceps hard. Repeat for the recommended amount of repetitions.  Variation: This exercise can also be performed with a single handle using one arm at a time. This will allow you to better isolate the triceps. With this version you can self spot yourself by placing your hand over your forearm and applying some pressure to help you perform more reps than before."
        },
        {
            "name": "Push-Ups - Close Triceps Position",
            "gif_url": "https://gymvisual.com/img/p/1/0/0/8/3/10083.gif",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyjFRRxlL-3-2Qo_z2HAnH6al1uQp13MyXA&s",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_lateralhead",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Lie on the floor face down and place your hands closer than shoulder width for a close hand position. Make sure that you are holding your torso up at arms' length. Lower yourself until your chest almost touches the floor as you inhale. Using your triceps and some of your pectoral muscles, press your upper body back up to the starting position and squeeze your chest. Breathe out as you perform this step. After a second pause at the contracted position, repeat the movement for the prescribed amount of repetitions.  Variations:  If you are new at this exercise and do not have the strength to perform it, you can either bend your legs at the knees to take off resistance or perform the exercise against the wall instead of the floor. For the most advanced lifters, you can place your feet at a high surface such as a bench in order to increase the resistance.  See Also: Push-Up"
        },

        {
            "name": "Kneeling cable triceps extension",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Kneeling-Cable-Triceps-Extension.gif",
            "image_url": "https://gymvisual.com/7711-large_default/cable-kneeling-triceps-extension-version-2.jpg",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_shorthead",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "Place a bench sideways in front of a high pulley machine. Hold a straight bar attachment above your head with your hands about 6 inches apart with your palms facing down. Face away from the machine and kneel. Place your head and the back of your upper arms on the bench. Your elbows should be bent with the forearms pointing towards the high pulley. This will be your starting position. While keeping your upper arms close to your head at all times with the elbows in, press the bar out in a semicircular motion until the elbows are locked and your arms are parallel to the floor. Contract the triceps hard and keep this position for a second. Exhale as you perform this movement. Slowly return to the starting position as you breathe in. Repeat for the recommended amount of repetitions.  Variation: You can also perform this exercise with exercise bands."
        },
        {
            "name": "Single-arm cable triceps extension",
            "gif_url": "https://gymvisual.com/img/p/2/5/6/2/9/25629.gif",
            "image_url": "https://homegymreview.co.uk/wp-content/uploads/exercises/02311101-Cable-Standing-One-Arm-Triceps-Extension_Upper-Arms_max-scaled.jpg",
            "type": "strength",
            "muscle": "triceps",
            "muscle_target": "triceps_medialhead",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "With your right hand, grasp a single handle attached to the high-cable pulley using a supinated (underhand; palms facing up) grip. You should be standing directly in front of the weight stack. Now pull the handle down so that your upper arm and elbow are locked in to the side of your body. Your upper arm and forearm should form an acute angle (less than 90-degrees). You can keep the other arm by the waist and you can have one leg in front of you and the other one back for better balance. This will be your starting position. As you contract the triceps, move the single handle attachment down to your side until your arm is straight. Breathe out as you perform this movement. Tip: Only the forearms should move. Your upper arms should remain stationary at all times. Squeeze the triceps and hold for a second in this contracted position. Slowly return the handle to the starting position. Repeat for the recommended amount of repetitions and then perform the same movement with the other arm.  Variations: You can use exercise bands to perform this exercise."
        },

        {
            "name": "Military press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/07/Barbell-Standing-Military-Press.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/standing-military-press.png",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "anterior_deltoid",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Start by placing a barbell that is about chest high on a squat rack. Once you have selected the weights, grab the barbell using a pronated (palms facing forward) grip. Make sure to grip the bar wider than shoulder width apart from each other. Slightly bend the knees and place the barbell on your collar bone. Lift the barbell up keeping it lying on your chest. Take a step back and position your feet shoulder width apart from each other. Once you pick up the barbell with the correct grip length, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position. Lower the bar down to the collarbone slowly as you inhale. Lift the bar back up to the starting position as you exhale. Repeat for the recommended amount of repetitions.  Variations:  This exercise can also be performed sitting as those with lower back problems are better off performing this seated variety. The behind the neck variation is not recommended for people with shoulder problems as it can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck. Another option is to use dumbbells when performing this exercise for better isolation."
        },
        {
            "name": "Standing palms-in shoulder press",
            "gif_url": "https://i.pinimg.com/originals/63/c1/db/63c1db8aa4a11b1b575c95182b21965b.gif",
            "image_url": "https://gymvisual.com/1300-large_default/3-4-sit-up.jpg",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "anterior_deltoid",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Start by having a dumbbell in each hand with your arm fully extended to the side using a neutral grip. Your feet should be shoulder width apart from each other. Now slowly lift the dumbbells up until you create a 90 degree angle with your arms. Note: Your forearms should be perpendicular to the floor. This the starting position. Continue to maintain a neutral grip throughout the entire exercise. Slowly lift the dumbbells up until your arms are fully extended. While inhaling lower the weights down until your arm is at a 90 degree angle again. Repeat for the recommended amount of repetitions.  Variation: This exercise can be performed with a dumbbell in one arm and another holding on to an incline bench. This is another great way to add variety to your routines and keep them interesting."
        },
        {
            "name": "Seated barbell shoulder press",
            "gif_url": "https://newlife.com.cy/wp-content/uploads/2019/12/00911301-Barbell-Seated-Overhead-Press_Shoulders_360.gif",
            "image_url": "https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/00911101-Barbell-Seated-Overhead-Press_Shoulders_small.jpg",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "anterior_deltoid",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Sit on a Military Press Bench with a bar behind your head and either have a spotter give you the bar (better on the rotator cuff this way) or pick it up yourself carefully with a pronated grip (palms facing forward). Tip: Your grip should be wider than shoulder width and it should create a 90-degree angle between the forearm and the upper arm as the barbell goes down. Once you pick up the barbell with the correct grip length, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position. Lower the bar down to the collarbone slowly as you inhale. Lift the bar back up to the starting position as you exhale. Repeat for the recommended amount of repetitions.  Variations:  This exercise can also be performed standing but those with lower back problems are better off performing this seated variety. The behind the neck variation is not recommended for people with shoulder problems as it can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck."
        },
        {
            "name": "Seated Dumbbell Press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
            "image_url": "https://s3.amazonaws.com/prod.skimble/assets/2416111/image_iphone.jpg",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "anterior_deltoid",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Grab a couple of dumbbells and sit on a military press bench or a utility bench that has a back support on it as you place the dumbbells upright on top of your thighs. Clean the dumbbells up one at a time by using your thighs to bring the dumbbells up to shoulder height at each side. Rotate the wrists so that the palms of your hands are facing forward. This is your starting position. As you exhale, push the dumbbells up until they touch at the top. After a second pause, slowly come down back to the starting position as you inhale. Repeat for the recommended amount of repetitions.  Variations:  You can perform the exercise standing or sitting on a regular flat bench. For people with lower back problems, the version described is the recommended one. You can also perform the exercise as Arnold Schwarzenegger used to do it, which is to start holding the dumbbells with a supinated grip (palms facing you) in front of your shoulders and then, as you start pushing up, you align the dumbbells in the starting position described on step 3 by rotating your wrists and touch the dumbbells at the top. As you come down, then you would go back to the starting position by rotating the wrist throughout the lowering portion until the palms of your hands are facing you. This variation is called the Arnold Press. However, it is not recommended if you have rotator cuff problems."
        },
        {
            "name": "Standing dumbbell shoulder press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/55e406fbe4b0b03c5e7543ae/1496868036164-1XVVVXYMG45R483QUWYP/Standing+Dumbbell+Shoulder+Press",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "anterior_deltoid",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Standing with your feet shoulder width apart, take a dumbbell in each hand. Raise the dumbbells to head height, the elbows out and about 90 degrees. This will be your starting position. Maintaining strict technique with no leg drive or leaning back, extend through the elbow to raise the weights together directly above your head. Pause, and slowly return the weight to the starting position."
        },
        {
            "name": "Lateral Raises",
            "gif_url": "https://gymvisual.com/img/p/1/9/1/5/1/19151.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/55e406fbe4b0b03c5e7543ae/1492638807121-H3Q9V0YU7HX1Z9HJ48EQ/Standing+Dumbbell+Lateral+Raises",
            "type": "strength",
            "muscle": "shoulders",
            "muscle_target": "medial_deltoid",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Standing with your feet shoulder width apart, slightly lean forward, take a dumbell in each hand. Face your palms to your abdomine and raise your arms away from your body keeping palm faced to abdomin.",
        },
        {
            "name": "Dumbbell Bench Press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
            "image_url": "https://training.fit/wp-content/uploads/2019/07/bankdruecken-kurzhantel-flachbank.png",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "medial_chest",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Lie down on a flat bench with a dumbbell in each hand resting on top of your thighs. The palms of your hands will be facing each other. Then, using your thighs to help raise the dumbbells up, lift the dumbbells one at a time so that you can hold them in front of you at shoulder width. Once at shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. The dumbbells should be just to the sides of your chest, with your upper arm and forearm creating a 90 degree angle. Be sure to maintain full control of the dumbbells at all times. This will be your starting position. Then, as you breathe out, use your chest to push the dumbbells up. Lock your arms at the top of the lift and squeeze your chest, hold for a second and then begin coming down slowly. Tip: Ideally, lowering the weight should take about twice as long as raising it. Repeat the movement for the prescribed amount of repetitions of your training program.  Caution: When you are done, do not drop the dumbbells next to you as this is dangerous to your rotator cuff in your shoulders and others working out around you. Just lift your legs from the floor bending at the knees, twist your wrists so that the palms of your hands are facing each other and place the dumbbells on top of your thighs. When both dumbbells are touching your thighs simultaneously push your upper torso up (while pressing the dumbbells on your thighs) and also perform a slight kick forward with your legs (keeping the dumbbells on top of the thighs). By doing this combined movement, momentum will help you get back to a sitting position with both dumbbells still on top of your thighs. At this moment you can place the dumbbells on the floor. Variations: Another variation of this exercise is to perform it with the palms of the hands facing each other. Also, you can perform the exercise with the palms facing each other and then twisting the wrist as you lift the dumbbells so that at the top of the movement the palms are facing away from the body. I personally do not use this variation very often as it seems to be hard on my shoulders."
        },
        {
            "name": "Pushups",
            "gif_url": "https://gymvisual.com/img/p/2/6/4/5/4/26454.gif",
            "image_url": "https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "medial_chest",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Lie on the floor face down and place your hands about 36 inches apart while holding your torso up at arms length. Next, lower yourself downward until your chest almost touches the floor as you inhale. Now breathe out and press your upper body back up to the starting position while squeezing your chest. After a brief pause at the top contracted position, you can begin to lower yourself downward again for as many repetitions as needed.  Variations: If you are new at this exercise and do not have the strength to perform it, you can either bend your legs at the knees to take off resistance or perform the exercise against the wall instead of the floor. For the most advanced lifters, you can place your feet at a high surface such as a bench in order to increase the resistance and to target the upper chest more."
        },
        {
            "name": "Close-grip bench press",
            "gif_url": "https://gymvisual.com/img/p/1/0/0/6/1/10061.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/close-grip-bench-benefits.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_targer": "medial_chest",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Lie back on a flat bench. Using a close grip (around shoulder width), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position. As you breathe in, come down slowly until you feel the bar on your middle chest. Tip: Make sure that - as opposed to a regular bench press - you keep the elbows close to the torso at all times in order to maximize triceps involvement. After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your triceps muscles. Lock your arms in the contracted position, hold for a second and then start coming down slowly again. Tip: It should take at least twice as long to go down than to come up. Repeat the movement for the prescribed amount of repetitions. When you are done, place the bar back in the rack.  Caution: If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with the amount of weight used. Also, beware of letting the bar drift too far forward. You want the bar to fall on your middle chest and nowhere else. Variations: This exercise can also be performed with an e-z bar using the inner handle as well as dumbbells, in which case the palms of the hands will be facing each other."
        },
        {
            "name": "Dumbbell Flyes",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif",
            "image_url": "https://miro.medium.com/v2/resize:fit:617/1*TphKGBzt13KtJ0YqBUCf3g.png",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "medial_chest",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Lie down on a flat bench with a dumbbell on each hand resting on top of your thighs. The palms of your hand will be facing each other. Then using your thighs to help raise the dumbbells, lift the dumbbells one at a time so you can hold them in front of you at shoulder width with the palms of your hands facing each other. Raise the dumbbells up like you're pressing them, but stop and hold just before you lock out. This will be your starting position. With a slight bend on your elbows in order to prevent stress at the biceps tendon, lower your arms out at both sides in a wide arc until you feel a stretch on your chest. Breathe in as you perform this portion of the movement. Tip: Keep in mind that throughout the movement, the arms should remain stationary; the movement should only occur at the shoulder joint. Return your arms back to the starting position as you squeeze your chest muscles and breathe out. Tip: Make sure to use the same arc of motion used to lower the weights. Hold for a second at the contracted position and repeat the movement for the prescribed amount of repetitions.  Variations: You may want to use a palms facing forward version for different stimulation."
        },
        {
            "name": "Incline dumbbell bench press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
            "image_url": "https://www.shutterstock.com/shutterstock/photos/425575588/display_1500/stock-photo-dumbbell-bench-press-while-lying-on-an-incline-bench-d-illustration-425575588.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "upper_chest",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Lie back on an incline bench with a dumbbell in each hand atop your thighs. The palms of your hands will be facing each other. Then, using your thighs to help push the dumbbells up, lift the dumbbells one at a time so that you can hold them at shoulder width. Once you have the dumbbells raised to shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. This will be your starting position. Be sure to keep full control of the dumbbells at all times. Then breathe out and push the dumbbells up with your chest. Lock your arms at the top, hold for a second, and then start slowly lowering the weight. Tip Ideally, lowering the weights should take about twice as long as raising them. Repeat the movement for the prescribed amount of repetitions. When you are done, place the dumbbells back on your thighs and then on the floor. This is the safest manner to release the dumbbells.  Variations: You can use several angles on the incline bench if the bench you are using is adjustable. Another variation of this exercise is to perform it with the palms of the hands facing each other. Also, you can perform the exercise with the palms facing each other and then twisting the wrist as you lift the dumbbells so that at the top of the movement the palms are facing away from the body. I personally do not use this variation very often as it seems to be hard on my shoulders."
        },

        {
            "name": "Low-cable cross-over",
            "gif_url": "https://gymvisual.com/img/p/4/9/1/2/4912.gif",
            "image_url": "https://i.pinimg.com/736x/f7/4e/72/f74e72d3c7f2fa78c6a3c82225673a54.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "upper_chest",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "To move into the starting position, place the pulleys at the low position, select the resistance to be used and grasp a handle in each hand. Step forward, gaining tension in the pulleys. Your palms should be facing forward, hands below the waist, and your arms straight. This will be your starting position. With a slight bend in your arms, draw your hands upward and toward the midline of your body. Your hands should come together in front of your chest, palms facing up. Return your arms back to the starting position after a brief pause."
        },
        {
            "name": "Barbell Bench Press - Medium Grip",
            "gif_url": "https://gymvisual.com/img/p/8/8/0/5/8805.gif",
            "image_url": "https://dagodsfitness.home.blog/wp-content/uploads/2019/03/1669-1.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "medial_chest",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position. From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest. After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it. Repeat the movement for the prescribed amount of repetitions. When you are done, place the bar back in the rack.  Caution: If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with the amount of weight used. Also, beware of letting the bar drift too far forward. You want the bar to touch your middle chest and nowhere else. Don't bounce the weight off your chest. You should be in full control of the barbell at all times."
        },
        {
            "name": "Chest dip",
            "gif_url": "https://gymvisual.com/img/p/4/9/8/4/4984.gif",
            "image_url": "https://www.hevyapp.com/wp-content/uploads/02511201-Chest-Dip_Chest.jpg",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "lower_chest",
            "equipment": "other",
            "difficulty": "intermediate",
            "instructions": "For this exercise you will need access to parallel bars. To get yourself into the starting position, hold your body at arms length (arms locked) above the bars. While breathing in, lower yourself slowly with your torso leaning forward around 30 degrees or so and your elbows flared out slightly until you feel a slight stretch in the chest. Once you feel the stretch, use your chest to bring your body back to the starting position as you breathe out. Tip: Remember to squeeze the chest at the top of the movement for a second. Repeat the movement for the prescribed amount of repetitions.  Variations: If you are new at this exercise and do not have the strength to perform it, use a dip assist machine if available. These machines use weight to help you push your bodyweight. Otherwise, a spotter holding your legs can help. More advanced lifters can add weight to the exercise by using a weight belt that allows the addition of weighted plates."
        },
        {
            "name": "Decline Dumbbell Flyes",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Decline-Dumbbell-Fly.gif",
            "image_url": "https://i0.wp.com/theinscribermag.com/wp-content/uploads/2024/02/Screenshot-2024-02-16-211459.png?fit=726%2C399&ssl=1",
            "type": "strength",
            "muscle": "chest",
            "muscle_target": "lower_chest",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Secure your legs at the end of the decline bench and lie down with a dumbbell on each hand on top of your thighs. The palms of your hand will be facing each other. Once you are laying down, move the dumbbells in front of you at shoulder width. The palms of the hands should be facing each other and the arms should be perpendicular to the floor and fully extended. This will be your starting position. With a slight bend on your elbows in order to prevent stress at the biceps tendon, lower your arms out at both sides in a wide arc until you feel a stretch on your chest. Breathe in as you perform this portion of the movement. Tip: Keep in mind that throughout the movement, the arms should remain stationary; the movement should only occur at the shoulder joint. Return your arms back to the starting position as you squeeze your chest muscles and breathe out. Tip: Make sure to use the same arc of motion used to lower the weights. Hold for a second at the contracted position and repeat the movement for the prescribed amount of repetitions.  Variation: You may want to use a palms facing forward version for different stimulation."
        },

        {
            "name": "Weighted pull-up",
            "gif_url": "https://gymvisual.com/img/p/5/5/6/3/5563.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2023/01/weighted-pull-up-benefits.jpg",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "lats",
            "equipment": "other",
            "difficulty": "intermediate",
            "instructions": "Attach a weight to a dip belt and secure it around your waist. Grab the pull-up bar with the palms of your hands facing forward. For a medium grip, your hands should be spaced at shoulder width. Both arms should be extended in front of you holding the bar at the chosen grip. You'll want to bring your torso back about 30 degrees while creating a curvature in your lower back and sticking your chest out. This will be your starting position. Now, exhale and pull your torso up until your head is above your hands. Concentrate on squeezing your shoulder blades back and down as you reach the top contracted position. After a brief moment at the top contracted position, inhale and slowly lower your torso back to the starting position with your arms extended and your lats fully stretched."
        },
        {
            "name": "Pullups",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif",
            "image_url": "https://anabolicaliens.com/cdn/shop/articles/199990.png?v=1645089103",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "lats",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Grab the pull-up bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than your shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position. Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar. After a second on the contracted position, start to inhale and slowly lower your torso back to the starting position when your arms are fully extended and the lats are fully stretched. Repeat this motion for the prescribed amount of repetitions.  Variations:  If you are new at this exercise and do not have the strength to perform it, use a chin assist machine if available. These machines use weight to help you push your bodyweight. Otherwise, a spotter holding your legs can help. On the other hand, more advanced lifters can add weight to the exercise by using a weight belt that allows the addition of weighted plates. The behind the neck variation is not recommended as it can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck."
        },

        {
            "name": "Rocky Pull-Ups/Pulldowns",
            "gif_url": "https://gymvisual.com/img/p/5/4/1/2/5412.gif",
            "image_url": "https://gymvisual.com/2034-thickbox_default/3-4-sit-up.jpg",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "lats",
            "equipment": "other",
            "difficulty": "beginner",
            "instructions": "Grab the pull-up bar with the palms facing forward using a wide grip. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position. Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar. After a second on the contracted position, start to inhale and slowly lower your torso back to the starting position when your arms are fully extended and the lats are fully stretched. Now repeat the same movements as described above except this time your torso will remain straight as you go up and the bar will touch the back of the neck instead of the upper chest. Tip: Use the head to lean forward slightly as it will help you properly execute this portion of the exercise. Once you have lowered yourself back down to the starting position, repeat the exercise for the prescribed amount of repetitions in your program.  Caution: The behind the neck variation can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck so this exercise is not recommended for people with shoulder problems. Variations:  If you are new at this exercise and do not have the strength to perform it, use a chin assist machine if available. These machines use weight to help you push your bodyweight. Otherwise, a spotter holding your legs can help. You can also use a pull-down machine."
        },
        {
            "name": "Close-grip pull-down",
            "gif_url": "https://gymvisual.com/img/p/1/4/5/2/2/14522.gif",
            "image_url": "https://anabolicaliens.com/cdn/shop/articles/Everything_You_Need_To_Know-12.png?v=1652466345",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "rhomboids",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "Sit down on a pull-down machine with a V-Bar attached to the top pulley. Adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar. Grab the V-bar with the palms facing each other (a neutral grip). Stick your chest out and lean yourself back slightly (around 30-degrees) in order to better engage the lats. This will be your starting position. Using your lats, pull the bar down as you squeeze your shoulder blades. Continue until your chest nearly touches the V-bar. Exhale as you execute this motion. Tip: Keep the torso stationary throughout the movement. After a second hold on the contracted position, slowly bring the bar back to the starting position as you breathe in. Repeat for the prescribed number of repetitions.  Caution: Avoid the temptation to use a weight so big that you need to start swinging your torso in order to perform the exercise."
        },
        {
            "name": "Pull-up",
            "gif_url": "https://gymvisual.com/img/p/5/3/8/6/5386.gif",
            "image_url": "https://gymvisual.com/1956-large_default/3-4-sit-up.jpg",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "lats",
            "equipment": "body_only",
            "difficulty": "beginner",
            "instructions": "Take a wide grip on a pull-up bar, hanging freely with your arms extended. This will be your starting position. Pull yourself up by flexing the elbows and adducting the glenohumeral joint. Do not swing or use momentum to complete the movement. Attempt to get your chin above your hands. Pause at the top of the motion before lowering yourself to the starting position."
        },
        {
            "name": "Barbell deficit deadlift",
            "gif_url": "https://gymvisual.com/img/p/2/5/2/6/2/25262.gif",
            "image_url": "https://gymvisual.com/6780-large_default/barbell-romanian-deadlift-from-deficit.jpg",
            "type": "powerlifting",
            "muscle": "lower_back",
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "Begin by having a platform or weight plates that you can stand on, usually 1-3 inches in height. Approach the bar so that it is centered over your feet. You feet should be about hip width apart. Bend at the hip to grip the bar at shoulder width, allowing your shoulder blades to protract. Typically, you would use an overhand grip or an over/under grip on heavier sets. With your feet, and your grip set, take a big breath and then lower your hips and bend the knees until your shins contact the bar. Look forward with your head, keep your chest up and your back arched, and begin driving through the heels to move the weight upward. After the bar passes the knees, aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar. Lower the bar by bending at the hips and guiding it to the floor."
        },
        {
            "name": "Back extension",
            "gif_url": "https://gymvisual.com/img/p/2/0/8/2/5/20825.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/03/hyperextension.png",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "lower_back",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Lie face down on a hyperextension bench, tucking your ankles securely under the footpads. Adjust the upper pad if possible so your upper thighs lie flat across the wide pad, leaving enough room for you to bend at the waist without any restriction. With your body straight, cross your arms in front of you (my preference) or behind your head. This will be your starting position. Tip: You can also hold a weight plate for extra resistance in front of you under your crossed arms. Start bending forward slowly at the waist as far as you can while keeping your back flat. Inhale as you perform this movement. Keep moving forward until you feel a nice stretch on the hamstrings and you can no longer keep going without a rounding of the back. Tip: Never round the back as you perform this exercise. Also, some people can go farther than others. The key thing is that you go as far as your body allows you to without rounding the back. Slowly raise your torso back to the initial position as you inhale. Tip: Avoid the temptation to arch your back past a straight line. Also, do not swing the torso at any time in order to protect the back from injury. Repeat for the recommended amount of repetitions.  Variations: This exercise can also be performed without a hyperextension bench, but in this case you will need a spotter. Also, a similar exercise to this one is the good morning and the stiff-legged deadlift."
        },

        {
            "name": "Reverse-grip bent-over row",
            "gif_url": "https://gymvisual.com/img/p/1/0/6/1/9/10619.gif",
            "image_url": "https://fitnessvolt.com/wp-content/uploads/2023/01/Muscles-Worked-in-Reverse-Grip-Row-750x360.jpg",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "middle_back",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Stand erect while holding a barbell with a supinated grip (palms facing up). Bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position. While keeping the torso stationary, lift the barbell as you breathe out, keeping the elbows close to the body and not doing any force with the forearm other than holding the weights. On the top contracted position, squeeze the back muscles and hold for a second. Slowly lower the weight again to the starting position as you inhale. Repeat for the recommended amount of repetitions.  Caution:  This exercise is not recommended for people with back problems. A Low Pulley Row is a better choice for people with back issues. Also, just like with the bent knee dead-lift, if you have a healthy back, ensure perfect form and never slouch the back forward as this can cause back injury. Be cautious as well with the weight used; in case of doubt, use less weight rather than more.  Variations: You can perform the same exercise using a pronated (palms facing out) grip or using dumbbells."
        },
        {
            "name": "One-Arm Dumbbell Row",
            "gif_url": "https://gymvisual.com/img/p/1/9/7/9/8/19798.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/02/rudern-kurzhantel.png",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "middle_back",
            "equipment": "dumbbell",
            "difficulty": "intermediate",
            "instructions": "Choose a flat bench and place a dumbbell on each side of it. Place the right leg on top of the end of the bench, bend your torso forward from the waist until your upper body is parallel to the floor, and place your right hand on the other end of the bench for support. Use the left hand to pick up the dumbbell on the floor and hold the weight while keeping your lower back straight. The palm of the hand should be facing your torso. This will be your starting position. Pull the resistance straight up to the side of your chest, keeping your upper arm close to your side and keeping the torso stationary. Breathe out as you perform this step. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. Also, make sure that the force is performed with the back muscles and not the arms. Finally, the upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the dumbbell; therefore do not try to pull the dumbbell up using the forearms. Lower the resistance straight down to the starting position. Breathe in as you perform this step. Repeat the movement for the specified amount of repetitions. Switch sides and repeat again with the other arm.  Variations: One-arm rows can also be performed using a high pulley or a low pulley instead of a dumbbell."
        },
        {
            "name": "Bent Over Two-Arm Long Bar Row",
            "gif_url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOqvFL85VD4PBDTBWiCBwIDN8tDzYELNn-nfx6GChi8ABs1C3A2UI8A01md44tYbSvTFl9L517jgqVYf9hlZK-jkq_aoF5djbD3mN_8kDfiel0HaR4RWfll9d4CZu49jfgJiNJTVcywIb4ve3rwjqgSiQTOxrQMFUz-Gp2s1H5CwUFeKYvW07NtVF1CA/s360/T-Bar-Row.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/02/rudern-tstange-800x448.png",
            "type": "strength",
            "muscle": "middle_back",
            "muscle_target": "back",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a heavy object on the ground so the barbell cannot slide backward. Bend forward until your torso is as close to parallel with the floor as you can and keep your knees slightly bent. Now grab the bar with both arms just behind the plates on the side where the weight was placed and put your other hand on your knee. This will be your starting position. Pull the bar straight up with your elbows in (to maximize back stimulation) until the plates touch your lower chest. Squeeze the back muscles as you lift the weight up and hold for a second at the top of the movement. Breathe out as you lift the weight. Tip: Use a stirrup or double handle cable attachment by hooking it under the end of the bar. Slowly lower the bar to the starting position getting a nice stretch on the lats. Tip: Do not let the plates touch the floor. To ensure the best range of motion, I recommend using small plates (25-lb ones) as opposed to larger plates (like 35-45lb ones). Repeat for the recommended amount of repetitions.  Variations: You can perform this exercise using a low pulley or T-bar row machine."
        },
        {
            "name": "Seated Cable Rows",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Cable-Rope-Row.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/02/rudern-kabelzug-800x448.png",
            "type": "strength",
            "muscle": "back",
            "muscle_target": "middle_back",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked. Lean over as you keep the natural alignment of your back and grab the V-bar handles. With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise. Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in. Repeat for the recommended amount of repetitions.  Caution: Avoid swinging your torso back and forth as you can cause lower back injury by doing so. Variations: You can use a straight bar instead of a V-Bar and perform with a pronated grip (palms facing down-forward) or a supinated grip (palms facing up-reverse grip)."
        },
        {
            "name": "Romanian Deadlift With Dumbbells",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2021/11/dumbbell-romanian-deadlift.gif",
            "image_url": "https://anabolicaliens.com/cdn/shop/articles/5e595712f146e8e14db4ca6f_dumbbell-romanian-deadlift-exercise-anabolic-aliens-p-500.png?v=1644927440",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "hamstrings",
            "equipment": "dumbbell",
            "difficulty": "beginner",
            "instructions": "Begin in a standing position with a dumbbell in each hand. Ensure that your back is straight and stays that way for the duration of the exercise. Allow your arms to hang perpendicular to the floor, with the wrists pronated and the elbows pointed to your sides. This will be your starting position. Initiate the movement by flexing your hips, slowly pushing your butt as far back as you can. This should entail a horizontal movement of the hips, rather than a downward movement. The knees should only partially bend, and your weight should remain on your heels. Drive your butt back as far as you can, which should generate tension in your hamstrings as your hands approach knee level. Maintain an arch in your back throughout the exercise. When your hips cannot perform any further backward movement, pause, and then slowly return to the starting position by extending the hips."
        },
        {
            "name": "Natural Glute Ham Raise",
            "gif_url": "https://static.wixstatic.com/media/00b9a7_e0d6ae5c6e064b8cbb881446249147ea~mv2.gif",
            "image_url": "https://www.hevyapp.com/wp-content/uploads/31931101-Glute-Ham-Raise_Thighs_small.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "hamstrings",
            "equipment": "body_only",
            "difficulty": "beginner",
            "instructions": "Using the leg pad of a lat pulldown machine or a preacher bench, position yourself so that your ankles are under the pads, knees on the seat, and you are facing away from the machine. You should be upright and maintaining good posture. This will be your starting position. Lower yourself under control until your knees are almost completely straight. Remaining in control, raise yourself back up to the starting position. If you are unable to complete a rep, use a band, a partner, or push off of a box to aid in completing a repetition."
        },
        {
            "name": "Glute ham raise-",
            "gif_url": "https://gymvisual.com/img/p/2/0/3/4/5/20345.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/glute-ham-raise-alternatives.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "hamstrings",
            "equipment": "none",
            "difficulty": "beginner",
            "instructions": "You can use a partner for this exercise or brace your feet under something stable. Begin on your knees with your upper legs and torso upright. If using a partner, they will firmly hold your feet to keep you in position. This will be your starting position. Lower yourself by extending at the knee, taking care to NOT flex the hips as you go forward. Place your hands in front of you as you reach the floor. This movement is very difficult and you may be unable to do it unaided. Use your arms to lightly push off the floor to aid your return to the starting position."
        },

        {
            "name": "Single-Leg Press",
            "gif_url": "https://gymvisual.com/img/p/1/5/6/9/3/15693.gif",
            "image_url": "https://gymvisual.com/6277-large_default/sled-45-degrees-one-leg-press.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "quadriceps",
            "equipment": "machine",
            "difficulty": "intermediate",
            "instructions": "Load the sled to an appropriate weight. Seat yourself on the machine, planting one foot on the platform in line with your hip. Your free foot can be placed on the ground. Maintain good spinal position with your head and chest up. Supporting the weight, fully extend the knee and unlock the sled. This will be your starting position. Lower the weight by flexing the hip and knee, continuing as far as flexibility allows. Do not allow your lumbar to take the load by moving your pelvis. At the bottom of the motion pause briefly and then return to the starting position by extending the hip and knee. Complete all repetitions for one leg before switching to the other."
        },

        {
            "name": "Barbell Full Squat",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2022/06/the-barbell-squat.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "quadriceps",
            "equipment": "barbell",
            "difficulty": "intermediate",
            "instructions": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just above shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it. Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso. Step away from the rack and position your legs using a shoulder-width medium stance with the toes slightly pointed out. Keep your head up at all times and maintain a straight back. This will be your starting position. Begin to slowly lower the bar by bending the knees and sitting back with your hips as you maintain a straight posture with the head up. Continue down until your hamstrings are on your calves. Inhale as you perform this portion of the movement. Begin to raise the bar as you exhale by pushing the floor with the heel or middle of your foot as you straighten the legs and extend the hips to go back to the starting position. Repeat for the recommended amount of repetitions.  This type of squat allows a greater range of motion, and allows the trunk to maintain a more vertical position than other types of squats, due to foot position and the higher bar position."
        },
        {
            "name": "Jumping rope",
            "gif_url": "https://gymvisual.com/img/p/1/7/1/0/9/17109.gif",
            "image_url": "https://www.inspireusafoundation.org/wp-content/uploads/2021/08/jump-rope-alternatives.jpg",
            "type": "cardio",
            "muscle": "legs",
            "muscle_target": "quadriceps",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Hold an end of the rope in each hand. Position the rope behind you on the ground. Raise your arms up and turn the rope over your head bringing it down in front of you. When it reaches the ground, jump over it. Find a good turning pace that can be maintained. Different speeds and techniques can be used to introduce variation. Rope jumping is exciting, challenges your coordination, and requires a lot of energy. A 150 lb person will burn about 350 calories jumping rope for 30 minutes, compared to over 450 calories running."
        },
        {
            "name": "Single-leg cable hip extension",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2021/07/band-standing-hip-extension.gif",
            "image_url": "https://s3assets.skimble.com/assets/2284672/image_iphone.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "cable",
            "difficulty": "intermediate",
            "instructions": "Hook a leather ankle cuff to a low cable pulley and then attach the cuff to your ankle. Face the weight stack from a distance of about two feet, grasping the steel frame for support. While keeping your knees and hips bent slightly and your abs tight, contract your glutes to slowly \"kick\" the working leg back in a semicircular arc as high as it will comfortably go as you breathe out. Tip: At full extension, squeeze your glutes for a second in order to achieve a peak contraction. Now slowly bring your working leg forward, resisting the pull of the cable until you reach the starting position. Repeat for the recommended amount of repetitions. Switch legs and repeat the movement for the other side.  Variations: You can perform this exercise with exercise bands."
        },
        {
            "name": "Glute bridge",
            "gif_url": "https://newlife.com.cy/wp-content/uploads/2019/11/30141301-Low-Glute-Bridge-on-floor-female_Hips_360.gif",
            "image_url": "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638422430370-4HKO5XUY96AQ4ID418WS/Glute%2BBridges.jpeg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Lie flat on the floor on your back with the hands by your side and your knees bent. Your feet should be placed around shoulder width. This will be your starting position. Pushing mainly with your heels, lift your hips off the floor while keeping your back straight. Breathe out as you perform this part of the motion and hold at the top for a second. Slowly go back to the starting position as you breathe in.  Variations: You can perform this exercise one leg at a time."
        },
        {
            "name": "Single-leg glute bridge",
            "gif_url": "https://gymvisual.com/img/p/1/4/1/5/7/14157.gif",
            "image_url": "https://vidcdn.123rf.com/450nwm/exerciseanimatic/exerciseanimatic2305/exerciseanimatic230500660.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Lay on the floor with your feet flat and knees bent. Raise one leg off of the ground, pulling the knee to your chest. This will be your starting position. Execute the movement by driving through the heel, extending your hip upward and raising your glutes off of the ground. Extend as far as possible, pause and then return to the starting position."
        },
        {
            "name": "Step-up with knee raise",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Step-up.gif",
            "image_url": "https://gymvisual.com/3385-thickbox_default/3-4-sit-up.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "body_only",
            "difficulty": "intermediate",
            "instructions": "Stand facing a box or bench of an appropriate height with your feet together. This will be your starting position. Begin the movement by stepping up, putting your left foot on the top of the bench. Extend through the hip and knee of your front leg to stand up on the box. As you stand on the box with your left leg, flex your right knee and hip, bringing your knee as high as you can. Reverse this motion to step down off the box, and then repeat the sequence on the opposite leg."
        },
        {
            "name": "Flutter Kicks",
            "gif_url": "https://gymvisual.com/img/p/1/9/8/5/9/19859.gif",
            "image_url": "https://gymvisual.com/16742/flutter-kicks-version-3.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "None",
            "difficulty": "intermediate",
            "instructions": "On a flat bench lie facedown with the hips on the edge of the bench, the legs straight with toes high off the floor and with the arms on top of the bench holding on to the front edge. Squeeze your glutes and hamstrings and straighten the legs until they are level with the hips. This will be your starting position. Start the movement by lifting the left leg higher than the right leg. Then lower the left leg as you lift the right leg. Continue alternating in this manner (as though you are doing a flutter kick in water) until you have done the recommended amount of repetitions for each leg. Make sure that you keep a controlled movement at all times. Tip: You will breathe normally as you perform this movement.  Variations: As you get more advanced you can use ankle weights."
        },
        //Image may be wrong. Glute Kickback
        {
            "name": "Glute Kickback",
            "gif_url": "https://gymvisual.com/img/p/2/9/8/3/6/29836.gif",
            "image_url": "https://cdn.shopify.com/s/files/1/1497/9682/files/2_5d08fb12-e904-4ed9-9c17-bd2f1ec25395.jpg?v=1646658571",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "glutes",
            "equipment": "body_only",
            "difficulty": "beginner",
            "instructions": "Kneel on the floor or an exercise mat and bend at the waist with your arms extended in front of you (perpendicular to the torso) in order to get into a kneeling push-up position but with the arms spaced at shoulder width. Your head should be looking forward and the bend of the knees should create a 90-degree angle between the hamstrings and the calves. This will be your starting position. As you exhale, lift up your right leg until the hamstrings are in line with the back while maintaining the 90-degree angle bend. Contract the glutes throughout this movement and hold the contraction at the top for a second. Tip: At the end of the movement the upper leg should be parallel to the floor while the calf should be perpendicular to it. Go back to the initial position as you inhale and now repeat with the left leg. Continue to alternate legs until all of the recommended repetitions have been performed.  Variations: For this exercise you can also perform all of the repetitions with one leg first and then the other one. Additionally, you can also add ankle weights."
        },
        {
            "name": "Smith Machine Calf Raise",
            "gif_url": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/negative-calf-raise.gif",
            "image_url": "https://i.pinimg.com/564x/e1/8b/50/e18b508a9f088f54d80c5ededf3dbafd.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "machine",
            "difficulty": "intermediate",
            "instructions": "Place a block or weight plate below the bar on the Smith machine. Set the bar to a position that best matches your height. Once the correct height is chosen and the bar is loaded, step onto the plates with the balls of your feet and place the bar on the back of your shoulders. Take the bar with both hands facing forward. Rotate the bar to unrack it. This will be your starting position. Raise your heels as high as possible by pushing off of the balls of your feet, flexing your calf at the top of the contraction. Your knees should remain extended. Hold the contracted position for a second before you start to go back down. Return slowly to the starting position as you breathe in while lowering your heels. Repeat for the recommended amount of repetitions."
        },
        {
            "name": "Standing Calf Raises",
            "gif_url": "https://gymvisual.com/img/p/2/4/1/6/4/24164.gif",
            "image_url": "https://apilyfta.com/static/GymvisualPNG/06051101-Lever-Standing-Calf-Raise_Calf_small.png",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "machine",
            "difficulty": "beginner",
            "instructions": "Adjust the padded lever of the calf raise machine to fit your height. Place your shoulders under the pads provided and position your toes facing forward (or using any of the two other positions described at the beginning of the chapter). The balls of your feet should be secured on top of the calf block with the heels extending off it. Push the lever up by extending your hips and knees until your torso is standing erect. The knees should be kept with a slight bend; never locked. Toes should be facing forward, outwards or inwards as described at the beginning of the chapter. This will be your starting position. Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down. Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched. Repeat for the recommended amount of repetitions.  Caution: If you suffer from lower back problems, a better exercise is the calf press as during a standing calf raise the back has to support the weight being lifted. Also, maintain your back straight and stationary at all times. Rounding of the back can cause lower back injury. Variations: There are several other ways to perform a standing calf raise. A barbell instead of a machine can be used instead as well as dumbbells, one leg or two legs at a time. Refer to the exercise descriptions of these movements below. A smith machine can be used for calf raises as well."
        },
        {
            "name": "Seated Calf Raise",
            "gif_url": "https://newlife.com.cy/wp-content/uploads/2019/11/26661301-Lever-Seated-Calf-Raise-plate-loaded-VERSION-2_Calves_360-360x200.gif",
            "image_url": "https://kinxlearning.com/cdn/shop/files/exercise-3_1000x.jpg?v=1613154659",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "machine",
            "difficulty": "intermediate",
            "instructions": "Sit on the machine and place your toes on the lower portion of the platform provided with the heels extending off. Choose the toe positioning of your choice (forward, in, or out) as per the beginning of this chapter. Place your lower thighs under the lever pad, which will need to be adjusted according to the height of your thighs. Now place your hands on top of the lever pad in order to prevent it from slipping forward. Lift the lever slightly by pushing your heels up and release the safety bar. This will be your starting position. Slowly lower your heels by bending at the ankles until the calves are fully stretched. Inhale as you perform this movement. Raise the heels by extending the ankles as high as possible as you contract the calves and breathe out. Hold the top contraction for a second. Repeat for the recommended amount of repetitions."
        },
        {
            "name": "Calf Press On The Leg Press Machine",
            "gif_url": "https://gymvisual.com/img/p/6/6/5/4/6654.gif",
            "image_url": "https://www.hevyapp.com/wp-content/uploads/07381201-Sled-45-Calf-Press_Calves.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "machine",
            "difficulty": "intermediate",
            "instructions": "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stance. Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you without locking your knees. (Note: In some leg press units you can leave the safety bars on for increased safety. If your leg press unit allows for this, then this is the preferred method of performing the exercise.) Your torso and the legs should make perfect 90-degree angle. Now carefully place your toes and balls of your feet on the lower portion of the platform with the heels extending off. Toes should be facing forward, outwards or inwards as described at the beginning of the chapter. This will be your starting position. Press on the platform by raising your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down. Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched. Repeat for the recommended amount of repetitions.  Caution: Be very cautious as you place the feet in the bottom part of the platform as if you slip and the safety bars are not locked then you could suffer a serious accident. Variations: You can perform this exercise one leg at a time."
        },
        {
            "name": "Rocking Standing Calf Raise",
            "gif_url": "https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/0111.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/03/wadenheben-langhantel-stehend-2.png",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the correct height is chosen and the bar is loaded, step under the bar and place it on the back of your shoulders (slightly below the neck). Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso. Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times as looking down will get you off balance. Also maintain a straight back and keep the knees with a slight bend; never locked. This will be your starting position. Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending (other than the slight initial bend we created during positioning) at any time. Hold the contracted position by a second before you start to go back down. Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched. Now lift your toes by contracting the tibia muscles in the front of the calves as you breathe out. Hold for a second and bring them back down as you breathe in. Repeat for the recommended amount of repetitions.  Caution: Maintain your back straight and stationary at all times. Rounding of the back can cause lower back injury. Also, choose a conservative weight. This exercise requires a lot of balance and choosing too much weight may cause you to lose balance and fall. Variations: A smith machine can be used for this exercise as well and it is a better choice for those with poor balance. Dumbbells can be used also."
        },
        {
            "name": "Calf Press",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif",
            "image_url": "https://homegymreview.co.uk/wp-content/uploads/exercises/13851101-Lever-Seated-Squat-Calf-Raise-on-Leg-Press-Machine_Calves_max-scaled.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "machine",
            "difficulty": "beginner",
            "instructions": "Adjust the seat so that your legs are only slightly bent in the start position. The balls of your feet should be firmly on the platform. Select an appropriate weight, and grasp the handles. This will be your starting position. Straighten the legs by extending the knees, just barely lifting the weight from the stack. Your ankle should be fully flexed, toes pointing up. Execute the movement by pressing downward through the balls of your feet as far as possible. After a brief pause, reverse the motion and repeat."
        },
        {
            "name": "Standing barbell calf raise",
            "gif_url": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Standing-Barbell-Calf-Raise.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/03/wadenheben-langhantel-stehend-2.png",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the correct height is chosen and the bar is loaded, step under the bar and place the bar on the back of your shoulders (slightly below the neck). Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso. Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times as looking down will get you off balance and also maintain a straight back. The knees should be kept with a slight bend; never locked. This will be your starting position. Tip: For better range of motion you may also place the ball of your feet on a wooden block but be careful as this option requires more balance and a sturdy block. Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down. Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched. Repeat for the recommended amount of repetitions.  Caution: If you suffer from lower back problems, a better exercise is the calf press as during a standing calf raise the back has to support the weight being lifted. Also, maintain your back straight and stationary at all times. Rounding of the back can cause lower back injury. Variations: There are several other ways to perform a standing calf raise. A calf press machine instead of a squat rack can be used as well as dumbbells with one leg or two legs at a time. A smith machine can be used for calf raises as well. You can also perform the barbell calf raise using a piece of wood to place the ball of the foot. This will allow you to get a better range of motion. However be cautious as in this case you will need to balance yourself much better."
        },
        {
            "name": "Barbell Seated Calf Raise",
            "gif_url": "https://i.pinimg.com/originals/7b/96/51/7b9651f3ad4c05bab422a7fece5e470a.gif",
            "image_url": "https://training.fit/wp-content/uploads/2020/03/wadenheben-langhantel-sitzend.png",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "barbell",
            "difficulty": "beginner",
            "instructions": "Place a block about 12 inches in front of a flat bench. Sit on the bench and place the ball of your feet on the block. Have someone place a barbell over your upper thighs about 3 inches above your knees and hold it there. This will be your starting position. Raise up on your toes as high as possible as you squeeze the calves and as you breathe out. After a second contraction, slowly go back to the starting position. Tip: To get maximum benefit stretch your calves as far as you can. Repeat for the recommended amount of repetitions.  Variations: You can use the smith machine or the seated calf raise machine in order to perform this exercise. Alternatively, you can also use dumbbells by placing one on top of each thigh."
        },
        {
            "name": "Balance Board",
            "gif_url": "https://gymvisual.com/img/p/4/7/5/1/4751.gif",
            "image_url": "https://gymvisual.com/90-large_default/balance-board.jpg",
            "type": "strength",
            "muscle": "legs",
            "muscle_target": "calves",
            "equipment": "other",
            "difficulty": "beginner",
            "instructions": "Note: This exercise is designed to increase balance.  Place a balance board in front of you. Stand up on it and try to balance yourself. Hold the balance for as long as desired.  Caution: If your balance is poor, start out with one of the less challenging boards. Variations: You can perform this exercise using various types of balance boards. Some are more challenging than others."
        }
    ]

    const [Exercises, setExercises] = useState([]);
    const [alternativeExercises, setAlternativeExercises] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [oldItem, setOldItem] = useState();
    let selectedExercises = [];

    let Days = [];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const options = { weekday: 'long' }
    const currentDay = currentDate.toLocaleDateString('en-US', options);
    const currentIndex = daysOfWeek.indexOf(currentDay);

    useEffect(() => {


        const unsubscribe = navigation.addListener('focus', () => {
            
            getInitialData().then(() => {


            });
        });

        return unsubscribe;
    }, [navigation, modalVisible])

    console.log(Exercises);

    const getInitialData = async () => {

        var tempExercises = []

        const currentUser = FIREBASE_AUTH.currentUser;
        const userInfoRef = doc(db, "User", currentUser.uid);
        const newCollectionRef = collection(userInfoRef, "UserInfo");

        getDocs(newCollectionRef).then((querySnapshot) => {
            querySnapshot.forEach((item) => {

                const dayCollectionRef = doc(newCollectionRef, item.id);
                const subCollectionRef = collection(dayCollectionRef, "Day");

                getDocs(subCollectionRef).then((querySnapshot) => {
                    querySnapshot.forEach((day) => {
                        console.log(day.id, " => ", day.data());

                        // if (currentDay === "Monday") {
                        //     const exerciseCollectionRef = doc(subCollectionRef, day.id);
                        //     const ExercisesubCollectionRef = collection(exerciseCollectionRef, "Exercise");

                        //     getDocs(ExercisesubCollectionRef)
                        //         .then((querySnapshot) => {
                        //             querySnapshot.forEach((doc) => {

                        //                 const exerciseDocRef = doc.ref;

                        //                 updateDoc(exerciseDocRef, { isComplete: false });
                        //             });
                        //         })
                        //         .catch((error) => {

                        //         });
                        // }

                        if (currentDay === day.data().name) {

                            const exerciseCollectionRef = doc(subCollectionRef, day.id);
                            const ExercisesubCollectionRef = collection(exerciseCollectionRef, "Exercise");


                            // if (currentIndex % 3 == 0) {
                            //     let alternativeExercises = filterExercises(item.difficulty, "push");
                            //     setAlternativeExercises(alternativeExercises);
                            // } else if (currentIndex % 3 == 1) {
                            //     let alternativeExercises = filterExercises(item.difficulty, "pull");
                            //     setAlternativeExercises(alternativeExercises);
                            // } else if (currentIndex % 3 == 2) {
                            //     let alternativeExercises = filterExercises(item.difficulty, "push");
                            //     setAlternativeExercises(alternativeExercises);
                            // }



                            getDocs(ExercisesubCollectionRef).then((snapshot) => {
                                snapshot.forEach((exercise) => {
                                    console.log(exercise.id, " => ", exercise.data());



                                    tempExercises.push(exercise.data());

                                    
                                    
                                    console.log("EXERCISE DATA", exercise.data());
                                    
                                    
                                })
                                
                                setExercises(tempExercises);
                                if (tempExercises.every(item => item.isComplete === true)) {


                                    const currentUser = FIREBASE_AUTH.currentUser;
                                    const userInfoRef = doc(db, "User", currentUser.uid);
                                    const newCollectionRef = collection(userInfoRef, "UserInfo");

                                    getDocs(newCollectionRef).then((querySnapshot) => {
                                        querySnapshot.forEach((i) => {

                                            const dayCollectionRef = doc(newCollectionRef, i.id);
                                            const daySubCollectionRef = collection(dayCollectionRef, "Day");

                                            const dayQuery = query(daySubCollectionRef, where("name", "==", currentDay));

                                            getDocs(dayQuery).then((querySnapshot) => {
                                                querySnapshot.forEach((doc) => {

                                                    const dayDocRef = doc.ref;

                                                    updateDoc(dayDocRef, { isComplete: true }).catch((error) => {
                                                        console.log(error);
                                                    });


                                                })
                                            }).catch((error) => {
                                                console.log(error);
                                            })

                                        })
                                    })
                                }


                            })
                        }


                    })
                })
            })
        })

    }

    const filterExercises = (difficulty, exercise, name) => {
        mockExercises.filter(exercise => exercise.difficulty === difficulty);


        mockExercises.map((item) => {
            if (item.muscle === exercise && name !== item.name) {
                selectedExercises.push(item);
            }
        })

        return selectedExercises;
    }

    const handleEdit = (item) => {

        setModalVisible(true);
        setOldItem(item);

        console.log(item);

        let alternativeExercises = filterExercises(item.difficulty, item.muscle, item.name);
        setAlternativeExercises(alternativeExercises);


    }

    const handleExerciseEdit = (newItem) => {

        const currentUser = FIREBASE_AUTH.currentUser;

        const userInfoRef = doc(db, "User", currentUser.uid);
        const newCollectionRef = collection(userInfoRef, "UserInfo");

        Exercises.map((exercise) => {
            if (newItem.name === exercise.name) {
                console.log("Exercise already Exist");
            } else {

                getDocs(newCollectionRef).then((querySnapshot) => {
                    querySnapshot.forEach((i) => {
                        const dayCollectionRef = doc(newCollectionRef, i.id);
                        const subCollectionRef = collection(dayCollectionRef, "Day");

                        getDocs(subCollectionRef).then((querySnapshot) => {
                            querySnapshot.forEach((day) => {




                                const exerciseCollectionRef = doc(subCollectionRef, day.id);
                                const ExercisesubCollectionRef = collection(exerciseCollectionRef, "Exercise");

                                const ExerciseQuery = query(ExercisesubCollectionRef, where("name", "==", oldItem.name));



                                getDocs(ExerciseQuery).then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {

                                        const exerciseDocRef = doc.ref;

                                        updateDoc(exerciseDocRef, newItem).then(()=>{
                                            navigation.replace('CurrentWorkout');
                                        });

                                    })
                                })
                            })
                        })
                    })
                })
            }
        })

    }


    console.log(Exercises);
    console.log("Alternatives", alternativeExercises)

    return (
        <View>
            <ImageBackground source={Banner} style={tw`w-full h-60 rounded-full mx-auto `} imageStyle={tw`opacity-50`}>
                <View style={tw`my-40 p-3`}><Text style={tw`text-2xl  font-bold text-left text-indigo-700`}>The Program Prepared for You is Here</Text></View>

            </ImageBackground>
            <View style={tw`w-90 h-50 bg-lime-500 rounded- mx-auto my-5`}>
                <Text style={tw`text-3xl px-3 font-semibold text-indigo-700 text-center`}>Customize as You Wish</Text>
                <View style={tw`my-auto`}>
                    <Text style={tw`text-base font-light px-3 text-justify text-indigo-700`}>You can customize the exercise program prepared for you below!
                    </Text>
                </View>
                {/* Özelleştirme Butonu */}
                <TouchableOpacity style={tw`mx-auto my-8  w-30 h-10 bg-indigo-700 rounded`} onPress={() => setIsEdit(!isEdit)}>
                    <View style={tw`m-auto`}>
                        <Text style={tw`text-white text-md`}>Customize</Text>
                    </View>
                </TouchableOpacity>


            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
            >
                <ScrollView style={tw`w-full h-full`}>
                    {alternativeExercises.map((item) => (
                        <TouchableOpacity style={tw`mx-auto mt-3 w-90 h-fit bg-slate-200 rounded-lg flex flex-row`} onPress={() => handleExerciseEdit(item)}>
                            <View style={tw`nx-auto my-auto p-3 basis-1/4 flex flex-row`}>
                                <Image style={{ width: 45, height: 45 }} source={{ uri: item.image_url }} />
                            </View>
                            <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700`}>{item.name}</Text></View>
                            <View></View>
                            <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700 text-center`}>{item.set}Set</Text></View>
                            <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700 text-center`}>{item.rep}Rep</Text></View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>


            </Modal>

            <ScrollView style={tw`h-70`}>
                {Exercises.map((item) => (
                    
                        <TouchableOpacity activeOpacity={1} disabled={item.isComplete ? true : false} style={tw`mx-auto mt-3 w-90 h-fit bg-slate-200 rounded-lg flex flex-row`} onPress={() => isEdit ? null : navigation.navigate("WorkoutComplete", { item: item })}>
                            <View style={tw`nx-auto my-auto p-3 basis-1/4 flex flex-row`}>

                                {item.isComplete ? (
                                    <View style={[tw`bg-green-400 w-6 h-6 rounded-full my-auto mr-2`]}>
                                        {/* Icon or indicator for completed item */}
                                    </View>
                                ) : (
                                    <View style={[tw`bg-slate-400 w-6 h-6 rounded-full my-auto mr-2`]}>
                                        {/*else if yazılacak (eğer receivedItem.completed false ise) */}
                                    </View>
                                )}
                                <Image style={{ width: 45, height: 45 }} source={{ uri: item.image_url }} />

                            </View>
                            <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700`}>{item.name}</Text></View>
                            <View></View>
                            {isEdit && !item.isComplete ? (
                                <TouchableOpacity style={tw`mx-auto my-auto w-5 h-5 bg-green-400 rounded`} onPress={() => handleEdit(item)}>

                                    <Icon name='edit' style={tw`mx-auto my-auto`}></Icon>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700 text-center`}>{item.set}Set</Text></View>
                                    <View style={tw`mx-auto my-auto p-3 basis-1/4`}><Text style={tw`text-indigo-700 text-center`}>{item.rep}Rep</Text></View>
                                </>
                            )}

                        </TouchableOpacity>
                    
                ))}



            </ScrollView>

        </View>
    );
};

export default CurrentWorkout;