import { ImageBackground, Text, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import tw from "twrnc";
import Background from '../assets/Image.png';
import { TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, db } from '../firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const CurrentProgress = ({ navigation, route }) => {

  const allNutritions = [
    {
      "ID": 6,
      "Name": "Bulgur",
      "Carb": 76,
      "Fat": 1.3,
      "Protein": 12,
      "Vitamin_C": 0,
      "Calcium": 35,
      "Iron": 2.5,
      "Magnesium": 164,
      "Calories_per_100g": 342,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 7,
      "Name": "Whole Grain Bread",
      "Carb": 41,
      "Fat": 3.4,
      "Protein": 13,
      "Vitamin_C": 0,
      "Calcium": 107,
      "Iron": 2.4,
      "Magnesium": 0,
      "Calories_per_100g": 247,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 11,
      "Name": "Sweet Potato",
      "Carb": 20.1,
      "Fat": 0.1,
      "Protein": 1.6,
      "Vitamin_C": 2.4,
      "Calcium": 30,
      "Iron": 0.7,
      "Magnesium": 25,
      "Calories_per_100g": 86,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 8,
      "Name": "Brown Rice",
      "Carb": 77,
      "Fat": 1.6,
      "Protein": 7,
      "Vitamin_C": 0,
      "Calcium": 1,
      "Iron": 0.8,
      "Magnesium": 43,
      "Calories_per_100g": 123,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 9,
      "Name": "Quinoa",
      "Carb": 21,
      "Fat": 1.9,
      "Protein": 4.4,
      "Vitamin_C": 0,
      "Calcium": 17,
      "Iron": 1.5,
      "Magnesium": 64,
      "Calories_per_100g": 120,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 8,
      "Name": "Potatoes",
      "Carb": 15.4,
      "Fat": 0.1,
      "Protein": 1.9,
      "Vitamin_C": 16.0,
      "Calcium": 10.8,
      "Iron": 0.31,
      "Magnesium": 32,
      "Calories_per_100g": 73.4,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 9,
      "Name": "Corn",
      "Carb": 15,
      "Fat": 0.5,
      "Protein": 2,
      "Vitamin_C": 5.5,
      "Calcium": 4,
      "Iron": 0.4,
      "Magnesium": 16,
      "Calories_per_100g": 64,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 10,
      "Name": "Whole Wheat Pasta",
      "Carb": 26.54,
      "Fat": 0.54,
      "Protein": 5.33,
      "Vitamin_C": 0,
      "Calcium": 15,
      "Iron": 1.06,
      "Magnesium": 0,
      "Calories_per_100g": 124,
      "Tag": "Carbohydrate"
    },
    {
      "ID": 11,
      "Name": "Almonds",
      "Carb": 21.55,
      "Fat": 49.93,
      "Protein": 21.15,
      "Vitamin_C": 1,
      "Calcium": 250,
      "Iron": 4.0,
      "Magnesium": 279,
      "Calories_per_100g": 598,
      "Tag": "Snack"
    },
    {
      "ID": 12,
      "Name": "Walnuts",
      "Carb": 14.0,
      "Fat": 65,
      "Protein": 15,
      "Vitamin_C": 1.3,
      "Calcium": 98,
      "Iron": 2.9,
      "Magnesium": 158,
      "Calories_per_100g": 654,
      "Tag": "Snack"
    },
    {
      "ID": 13,
      "Name": "Peanut Butter",
      "Carb": 20,
      "Fat": 50,
      "Protein": 25,
      "Vitamin_C": 0,
      "Calcium": 43,
      "Iron": 1.9,
      "Magnesium": 154,
      "Calories_per_100g": 588,
      "Tag": "Fats"
    },
    {
      "ID": 14,
      "Name": "Olive Oil",
      "Carb": 0,
      "Fat": 100,
      "Protein": 0,
      "Vitamin_C": 0,
      "Calcium": 1,
      "Iron": 0.6,
      "Magnesium": 0,
      "Calories_per_100g": 884,
      "Tag": "Fats"
    },
    {
      "ID": 15,
      "Name": "Butter",
      "Carb": 0.1,
      "Fat": 81,
      "Protein": 0.9,
      "Vitamin_C": 0,
      "Calcium": 24,
      "Iron": 0.,
      "Magnesium": 2,
      "Calories_per_100g": 716,
      "Tag": "Fats"
    },
    {
      "ID": 16,
      "Name": "Banana",
      "Carb": 23,
      "Fat": 0.3,
      "Protein": 1.1,
      "Vitamin_C": 8.7,
      "Calcium": 0,
      "Iron": 0,
      "Magnesium": 0,
      "Calories_per_100g": 88,
      "Tag": "Fruit"
    },
    {
      "ID": 17,
      "Name": "Apple",
      "Carb": 14,
      "Fat": 0.2,
      "Protein": 0.3,
      "Vitamin_C": 4.6,
      "Calcium": 0,
      "Iron": 0.1,
      "Magnesium": 5,
      "Calories_per_100g": 52,
      "Tag": "Fruit"
    },
    {
      "ID": 18,
      "Name": "Strawberry",
      "Carb": 12.7,
      "Fat": 0.3,
      "Protein": 0.7,
      "Vitamin_C": 58.8,
      "Calcium": 16,
      "Iron": 0.41,
      "Magnesium": 13,
      "Calories_per_100g": 32,
      "Tag": "Fruit"
    },
    {
      "ID": 19,
      "Name": "Orange",
      "Carb": 12,
      "Fat": 0.1,
      "Protein": 0.9,
      "Vitamin_C": 53.2,
      "Calcium": 40,
      "Iron": 0.1,
      "Magnesium": 10,
      "Calories_per_100g": 47,
      "Tag": "Fruit"
    },
    {
      "ID": 20,
      "Name": "Kiwi",
      "Carb": 15,
      "Fat": 0.5,
      "Protein": 1.1,
      "Vitamin_C": 92.7,
      "Calcium": 34,
      "Iron": 0.3,
      "Magnesium": 17,
      "Calories_per_100g": 60,
      "Tag": "Fruit"
    },
    {
      "ID": 1,
      "Name": "Carrot",
      "Carb": 10,
      "Fat": 0.3,
      "Protein": 0.6,
      "Vitamin_C": 7,
      "Calcium": 33,
      "Iron": 0.3,
      "Magnesium": 12,
      "Calories_per_100g": 41,
      "Tag": "Vegetable"
    },
    {
      "ID": 2,
      "Name": "Broccoli",
      "Carb": 7,
      "Fat": 0.4,
      "Protein": 2.8,
      "Vitamin_C": 89,
      "Calcium": 47,
      "Iron": 0.7,
      "Magnesium": 21,
      "Calories_per_100g": 34,
      "Tag": "Vegetable"
    },
    {
      "ID": 3,
      "Name": "Spinach",
      "Carb": 3.6,
      "Fat": 0.4,
      "Protein": 2.9,
      "Vitamin_C": 28,
      "Calcium": 99,
      "Iron": 2.7,
      "Magnesium": 79,
      "Calories_per_100g": 23,
      "Tag": "Vegetable"
    },
    {
      "ID": 4,
      "Name": "Tomato",
      "Carb": 3.9,
      "Fat": 0.2,
      "Protein": 0.9,
      "Vitamin_C": 14,
      "Calcium": 9,
      "Iron": 0.3,
      "Magnesium": 11,
      "Calories_per_100g": 18,
      "Tag": "Vegetable"
    },
    {
      "ID": 5,
      "Name": "Bell Pepper",
      "Carb": 6,
      "Fat": 0.3,
      "Protein": 1,
      "Vitamin_C": 212,
      "Calcium": 10,
      "Iron": 0.4,
      "Magnesium": 10,
      "Calories_per_100g": 31,
      "Tag": "Vegetable"
    }
  ];

  const allProteins = [
    {
      "ID": 1,
      "Name": "Chicken Breast",
      "Carb": 0,
      "Fat": 3.6,
      "Protein": 31,
      "Vitamin_C": 0,
      "Calcium": 15,
      "Iron": 1,
      "Magnesium": 29,
      "Calories_per_100g": 164,
      "Tag": "Protein"
    },
    {
      "ID": 2,
      "Name": "Oatmeal",
      "Carb": 12,
      "Fat": 1.4,
      "Protein": 2.4,
      "Vitamin_C": 0,
      "Calcium": 80,
      "Iron": 6,
      "Magnesium": 26,
      "Calories_per_100g": 67,
      "Tag": "Protein"
    },
    {
      "ID": 3,
      "Name": "Salmon",
      "Carb": 0,
      "Fat": 13,
      "Protein": 20,
      "Vitamin_C": 3.9,
      "Calcium": 9,
      "Iron": 0.3,
      "Magnesium": 27,
      "Calories_per_100g": 208,
      "Tag": "Protein"
    },
    {
      "ID": 4,
      "Name": "Lentils",
      "Carb": 20,
      "Fat": 0.4,
      "Protein": 9,
      "Vitamin_C": 1.5,
      "Calcium": 19,
      "Iron": 3.3,
      "Magnesium": 36,
      "Calories_per_100g": 116,
      "Tag": "Protein"
    },
    {
      "ID": 5,
      "Name": "Eggs",
      "Carb": 1.1,
      "Fat": 11,
      "Protein": 13,
      "Vitamin_C": 0,
      "Calcium": 50,
      "Iron": 1.2,
      "Magnesium": 10,
      "Calories_per_100g": 155,
      "Tag": "Protein"
    },
  ]

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];
  let Nutritions = [];
  let Days = [];
  let CompletedDays = [];
  let notCompletedDays = [];
  let futureDays = [];
  const [indexes, setIndexes] = useState([]);
  const [completedIndexes, setCompletedIndexes] = useState([])
  const [notCompletedIndexes, setNotCompletedIndexes] = useState([])
  const [expoPushToken, setExpoPushToken] = useState('');
  const daysMap = {
    "sunday": 6,
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5
  };
  const [totalCalorie, setTotalCalorie] = useState();



  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    })
  })





  useEffect(() => {



    const unsubscribe = navigation.addListener('focus', () => {

      registerForPushNotificationsAsync()
        .then((token) => {
          if (token) {
            setExpoPushToken(token);
            console.log("TOKEN", token);

            // Now use the token directly instead of relying on the updated state
            sendPushNotification(token).catch(err => {
              console.error("Failed to send notification:", err);
            });
          } else {
            console.log("No token received");
          }
        })
        .catch(err => {
          console.error("Error registering for notifications:", err);
        });


      // sendPushNotification().catch((e)=>{
      //   console.log(e,"Error")
      // });



      const currentUser = FIREBASE_AUTH.currentUser;

      console.log("Useffect Called")

      const userInfoRef = doc(db, "User", currentUser.uid);
      const newCollectionRef = collection(userInfoRef, "UserInfo");

      getDocs(newCollectionRef).then((querysnapshot) => {
        querysnapshot.forEach((item) => {

          const dayCollectionRef = doc(newCollectionRef, item.id);
          const subCollectionRef = collection(dayCollectionRef, "Day");

          CompletedDays = [];
          notCompletedDays = [];
          futureDays = [];
          Days=[];

          getDocs(subCollectionRef).then((querysnapshot) => {
            querysnapshot.forEach((day) => {

              console.log(currentDay);
              if (currentDay === "Monday") {

                updateDoc(day.ref, { isComplete: false }); //Değişebilir

                const exerciseCollectionRef = doc(subCollectionRef, day.id);
                const ExercisesubCollectionRef = collection(exerciseCollectionRef, "Exercise");

                getDocs(ExercisesubCollectionRef)
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                      const exerciseDocRef = doc.ref;

                      updateDoc(exerciseDocRef, { isComplete: false });
                    });
                  })
                  .catch((error) => {

                  });
              }

              Days.push(day.data().name);
              setIndexes(daysToIndexes(Days));





              if (day.data().isComplete == true) {
                CompletedDays.push(day.data().name);
                console.log(CompletedDays);
                setCompletedIndexes(daysToIndexes(CompletedDays));
              } else if (day.data().isComplete == false) {
                notCompletedDays.push(day.data().name);
                setNotCompletedIndexes(daysToIndexes(notCompletedDays));
              }


            })
          })
        })


      })
    })

    return unsubscribe;
  }, [navigation])

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      console.log("BAKAMR")
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId = "670b6faa-7373-4b17-96f5-3ac46d87f271"
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }

      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }

  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Dont forget',
      body: 'Drink 1.5L water for your health and eat your meals prepared for you or there is some "Nutrition Recommendations :)"!',
      data: { "someData": 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }


  const startOfWeek = moment().startOf("isoWeek");
  const today = moment();

  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.clone().add(index, 'days')
  );
  // exerciseList database'den gelecek
  // var exerciseList = Exercises;

  function daysToIndexes(daysArray) {
    const daysMap = {
      "sunday": 6,
      "monday": 0,
      "tuesday": 1,
      "wednesday": 2,
      "thursday": 3,
      "friday": 4,
      "saturday": 5
    };

    return daysArray.map(day => daysMap[day.toLowerCase()]);
  }

  return (

    <View>

      <View style={tw`w-fit flex flex-row mx-auto my-5`}>
        {daysOfWeek.map((day, index) => (
          <View style={[tw`px-2 mx-1 `, indexes.includes(index) ? tw`border border-slate-600 rounded-lg` : null, day.isSame(today, 'day') ? tw`border border-indigo-700 rounded-lg` : null
            , completedIndexes.includes(index) ? tw`bg-green-400 ` : null, notCompletedIndexes.includes(index) && index < days.indexOf(currentDay) ? tw`bg-red-400` : null, notCompletedIndexes.includes(index) && index >= days.indexOf(currentDay) ? tw`bg-slate-400` : null]}>
            <Text style={tw`text-center text-2xl`}>{day.format('DD')}</Text>
            <Text style={tw`text-sm`}>{day.format('ddd')}</Text>
          </View>
        ))}

      </View>
      <Text style={tw`text-2xl px-3 font-semibold text-indigo-700`}>Today</Text>
      <Text style={tw`text-sm my-2 px-3 text-indigo-700`}>Your training and training adventure is here</Text>

      <TouchableOpacity onPress={() => navigation.navigate('CurrentWorkout')}>
        <ImageBackground source={Background} style={[tw`w-80 h-60 rounded-full mx-auto`]} imageStyle={{ borderRadius: 10 }}>
          <Text style={tw`text-3xl text-white text-center`}>Your Daily Activity Plan</Text>
          <Text style={tw`tex-sm font-thin text-white text-center`}>500kcal</Text>

        </ImageBackground>

      </TouchableOpacity>
      <Text style={tw`text-2xl px-3 font-semibold text-indigo-700`}>Today's meal program</Text>
      {/* <View style={tw`w-80 h-20 border border-black rounded-full my-10 mx-auto`}></View>
      <View style={tw`w-80 h-20 border border-black rounded-full my-10 mx-auto`}></View> */}

      <View style={tw`rounded inline`}>
        <TouchableOpacity style={tw`w-65 h-15 bg-indigo-700 rounded-full mx-auto mt-8`} >
          <View style={tw`my-auto items-center`}>
            <Text style={tw`text-center text-white font-bold`} >Create Your Nutritions</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={tw`rounded inline`}>
        <TouchableOpacity style={tw`w-65 h-15 bg-indigo-700 rounded-full mx-auto mt-8`} onPress={async () => {
          navigation.navigate("MainNutrition");
          await sendPushNotification(expoPushToken);
        }}>
          <View style={tw`my-auto items-center`}>
            <Text style={tw`text-center text-white font-bold`} >Go to Nutritions</Text>
          </View>
        </TouchableOpacity>
      </View>



    </View>
  );
};

export default CurrentProgress;