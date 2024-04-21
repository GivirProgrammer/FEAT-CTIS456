import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Card } from "react-native-paper";
import moment from 'moment';
import tw from "twrnc";
import Background from '../assets/Image.png';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FIREBASE_AUTH, db } from '../firebase';
import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';


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
      "Tag": "Carbohydrate",
      "img_url":"https://www.mardinsepet.com/Images/Urun/17022021031859.jpeg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/9/11/0/HE_whole-wheat-bread_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1371609761646.jpeg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://www.thespruceeats.com/thmb/bWWEsT1LCjYRnHg9pO-nTxNOYx4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sweetpotatoes_getty2400-56a4975c5f9b58b7d0d7b790.jpg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://assets-jpcust.jwpsrv.com/thumbnails/k98gi2ri-720.jpg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://media-cdn2.greatbritishchefs.com/media/in1o4glq/img23323.whqc_1426x713q80.jpg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://static.independent.co.uk/2021/05/21/16/iStock-909550520.jpg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/6/28/fresh-corn-on-the-cob-partially-shucked-on-dark-background.jpg.rend.hgtvcom.1280.1280.suffix/1687987003387.jpeg"
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
      "Tag": "Carbohydrate",
      "img_url":"https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg"
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
      "Tag": "Snack",
      "img_url":"https://www.uraaw.ca/image/cache/catalog/NUTS/organic-almonds-500x500.jpg"
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
      "Tag": "Snack",
      "img_url":"https://domf5oio6qrcr.cloudfront.net/medialibrary/9531/iStock-481114390.jpg"
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
      "Tag": "Fats",
      "img_url":"https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png"
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
      "Tag": "Fats",
      "img_url":"https://domf5oio6qrcr.cloudfront.net/medialibrary/11832/46d9dde1-3d7c-46d4-a05a-206f793afa66.jpg"
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
      "Tag": "Fats",
      "img_url":"https://media.post.rvohealth.io/wp-content/uploads/2020/08/AN451-Butter-732x549-thumb-732x549.jpg"
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
      "Tag": "Fruit",
      "img_url":"https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/01/30152155/shutterstock_518328943-1.jpg"
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
      "Tag": "Fruit",
      "img_url":"https://subzfresh.com/wp-content/uploads/2022/04/apple_158989157.jpg"
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
      "Tag": "Fruit",
      "img_url":"https://foodal.com/wp-content/uploads/2015/03/Make-Strawberry-Season-Last-All-Year.jpg"
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
      "Tag": "Fruit",
      "img_url":"https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
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
      "Tag": "Fruit",
      "img_url":"https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg"
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
      "Tag": "Vegetable",
      "img_url":"https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
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
      "Tag": "Vegetable",
      "img_url":"https://www.southernliving.com/thmb/I1hA4Zpl1bhw_b2tWWnx5UXajvY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Roasted_Broccoli_012-632f5bb05b49406a8d301bd733ff4686.jpg"
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
      "Tag": "Vegetable",
      "img_url":"https://media.post.rvohealth.io/wp-content/uploads/2019/05/spinach-732x549-thumbnail.jpg"
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
      "Tag": "Vegetable",
      "img_url":"https://www.healthifyme.com/blog/wp-content/uploads/2022/01/Benefits-of-Tomatoes.jpeg"
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
      "Tag": "Vegetable",
      "img_url":"https://upload.wikimedia.org/wikipedia/commons/8/85/Green-Yellow-Red-Pepper-2009.jpg"
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
      "Tag": "Protein",
      "img_url":"https://www.licious.in/blog/wp-content/uploads/2022/01/Thinly-Sliced-Chicken-Breast-Fillet-.jpg"
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
      "Tag": "Protein",
      "img_url":"https://asset.kompas.com/crops/EeaZLACNP7a8UeNnMCcmXI5DqHM=/0x1501:3648x3933/1200x800/data/photo/2021/05/21/60a7927a0ddb6.jpg"
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
      "Tag": "Protein",
      "img_url":"https://img.rasset.ie/000ebc3f-500.jpg"
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
      "Tag": "Protein",
      "img_url":"https://www.hataytadinda.com/wp-content/uploads/2019/12/k%C4%B1rm%C4%B1z%C4%B1-mercimek.jpg"
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
      "Tag": "Protein",
      "img_url":"https://media.post.rvohealth.io/wp-content/uploads/2020/09/health-benefits-of-eggs-1200x628-facebook-1200x628.jpg"
    },
  ]

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];
  let Nutritions = [];
  let Days=[];
  let CompletedDays=[];
  let notCompletedDays=[]
  const [indexes,setIndexes]=useState([]);
  const [completedIndexes,setCompletedIndexes]=useState([])
  const [notCompletedIndexes,setNotCompletedIndexes]=useState([])
  const daysMap = {
    "sunday": 6,
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5
  };
  const [selectedNutritions, setSelectedNutritions] = useState([]);



  useEffect(() => {

    const currentUser = FIREBASE_AUTH.currentUser;

    const userInfoRef = doc(db, "User", currentUser.uid);
    const newCollectionRef = collection(userInfoRef, "UserInfo");

    getDocs(newCollectionRef).then((querysnapshot)=>{
      querysnapshot.forEach((item)=>{

        const dayCollectionRef=doc(newCollectionRef,item.id);
        const subCollectionRef =collection(dayCollectionRef,"Day");

        getDocs(subCollectionRef).then((querysnapshot)=>{
          querysnapshot.forEach((day)=>{

            if (currentDay === "Monday") {
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

            if(day.data().isComplete==true){
              CompletedDays.push(day.data().name);
              setCompletedIndexes(daysToIndexes(CompletedDays));
            }else if(day.data().isComplete==false){
              notCompletedDays.push(day.data().name);
              setNotCompletedIndexes(daysToIndexes(notCompletedDays));
            }


          })
        })
      })


    })

    console.log(currentDay);
  }, [])


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

  function handleNutritionCreate() {

    const currentUser = FIREBASE_AUTH.currentUser;

    const userInfoRef = doc(db, "User", currentUser.uid);
    const newCollectionRef = collection(userInfoRef, "UserInfo");

    const nutritionCollectionRef = collection(userInfoRef, "Nutrition");

    getDocs(newCollectionRef).then((querysnapshot) => {
      querysnapshot.forEach((item) => {

        const proteinRequirement = item.data().weight * 2.20462262185;
        const mainProtein = proteinRequirement * 0.8;

        const totalCalorieReq = calculateBMR(item.data());
        let remainingCalories = totalCalorieReq;
        let remainingProtein = proteinRequirement * 0.2;
        let carbFlag = 0;
        let snackFlag = 0;
        let fruitFlag = 0;
        let vegetableFlag = 0;

        // besinler ilk seçildiğinde random seçilmeli
        // user istediği gibi besinleri değiştirebilmeli
        // besinler çeşitli verilmeli
        // userin en son beğendiği liste kaydedilmeli

        // fatler kullanılabilir
        // user kendi main proteinini seçecek

        allProteins.map((proteinItem) => {
          if (proteinItem.Name === "Chicken Breast") {

            const grOfMainProtein = (100 * mainProtein) / proteinItem.Protein;
            const calOfMainProtein = (proteinItem.Calories_per_100g * grOfMainProtein) / 100;

            remainingCalories = totalCalorieReq - calOfMainProtein;


            const dataOfProtein = {
              ID: proteinItem.ID,
              Name: proteinItem.Name,
              Carb: proteinItem.Carb,
              Fat: proteinItem.Fat,
              Protein: proteinItem.Protein,
              Vitamin_C: proteinItem.Vitamin_C,
              Calcium: proteinItem.Calcium,
              Iron: proteinItem.Iron,
              Magnesium: proteinItem.Magnesium,
              Calories_per_100g: proteinItem.Calories_per_100g,
              Tag: proteinItem.Tag,
              Gram: grOfMainProtein,
              Calorie: calOfMainProtein
            };

            Nutritions.push(dataOfProtein);
          }
        })

        allNutritions.sort(() => Math.random() - 0.5);

        console.log(allNutritions);

        allNutritions.map((nutrition) => {



          const carbCalorie = (remainingCalories * 0.8) / 4;


          if (nutrition.Tag === "Carbohydrate" && carbFlag !== 4) {
            const grOfCarbohydrate = (100 * carbCalorie) / nutrition.Calories_per_100g;
            remainingProtein -= (grOfCarbohydrate * nutrition.Protein) / 100;


            const dataOfCarb = {
              ID: nutrition.ID,
              Name: nutrition.Name,
              Carb: nutrition.Carb,
              Fat: nutrition.Fat,
              Protein: nutrition.Protein,
              Vitamin_C: nutrition.Vitamin_C,
              Calcium: nutrition.Calcium,
              Iron: nutrition.Iron,
              Magnesium: nutrition.Magnesium,
              Calories_per_100g: nutrition.Calories_per_100g,
              Tag: nutrition.Tag,
              Gram: grOfCarbohydrate,
              Calorie: carbCalorie
            };

            carbFlag++;

            Nutritions.push(dataOfCarb);

          }

          const snackCalorie = (remainingCalories * 0.06) / 2;


          if (nutrition.Tag === "Snack" && snackFlag !== 2) {

            const grOfSnack = (100 * snackCalorie) / nutrition.Calories_per_100g;
            remainingProtein -= (grOfSnack * nutrition.Protein) / 100;

            const dataOfSnack = {
              ID: nutrition.ID,
              Name: nutrition.Name,
              Carb: nutrition.Carb,
              Fat: nutrition.Fat,
              Protein: nutrition.Protein,
              Vitamin_C: nutrition.Vitamin_C,
              Calcium: nutrition.Calcium,
              Iron: nutrition.Iron,
              Magnesium: nutrition.Magnesium,
              Calories_per_100g: nutrition.Calories_per_100g,
              Tag: nutrition.Tag,
              Gram: grOfSnack,
              Calorie: snackCalorie
            };

            Nutritions.push(dataOfSnack);

            snackFlag++;
          }


          const fruitCalorie = remainingCalories * 0.08;


          if (nutrition.Tag === "Fruit" && fruitFlag !== 1) {

            const grOfFruit = (100 * fruitCalorie) / nutrition.Calories_per_100g;
            remainingProtein -= (grOfFruit * nutrition.Protein) / 100;

            const dataOfFruit = {
              ID: nutrition.ID,
              Name: nutrition.Name,
              Carb: nutrition.Carb,
              Fat: nutrition.Fat,
              Protein: nutrition.Protein,
              Vitamin_C: nutrition.Vitamin_C,
              Calcium: nutrition.Calcium,
              Iron: nutrition.Iron,
              Magnesium: nutrition.Magnesium,
              Calories_per_100g: nutrition.Calories_per_100g,
              Tag: nutrition.Tag,
              Gram: grOfFruit,
              Calorie: fruitCalorie
            };

            Nutritions.push(dataOfFruit);

            fruitFlag++;
          }

          const vegetableCalorie = remainingCalories * 0.06;


          if (nutrition.Tag === "Vegetable" && vegetableFlag !== 1) {

            const grOfVegetable = (100 * vegetableCalorie) / nutrition.Calories_per_100g;
            remainingProtein -= (grOfVegetable * nutrition.Protein) / 100;

            const dataOfVegetable = {
              ID: nutrition.ID,
              Name: nutrition.Name,
              Carb: nutrition.Carb,
              Fat: nutrition.Fat,
              Protein: nutrition.Protein,
              Vitamin_C: nutrition.Vitamin_C,
              Calcium: nutrition.Calcium,
              Iron: nutrition.Iron,
              Magnesium: nutrition.Magnesium,
              Calories_per_100g: nutrition.Calories_per_100g,
              Tag: nutrition.Tag,
              Gram: grOfVegetable,
              Calorie: vegetableCalorie
            };

            Nutritions.push(dataOfVegetable);

            vegetableFlag++;
          }


        });


      })
    }).then((a) => {
      Nutritions.map((nutritionItem) => {
        addDoc(nutritionCollectionRef, nutritionItem);
      })
    })



  }

  const calculateBMR = (userInfo) => {

    if (userInfo.gender == "male") {
      return 88.362 + (13.397 * userInfo.weight) + (4.799 * userInfo.height) - (5.677 * userInfo.age);
    } else {
      return 447.593 + (9.247 * userInfo.weight) + (3.098 * userInfo.height) - (4.330 * userInfo.age);
    }
  }

  return (

    <View>

      <View style={tw`w-fit flex flex-row mx-auto my-5`}>
          {daysOfWeek.map((day, index) => (
            <View style={[tw`px-2 mx-2 rounded-lg`, indexes.includes(index) ? tw`border border-slate-600` : null, day.isSame(today, 'day') ? tw`border border-indigo-700` : null
            , completedIndexes.includes(index) ? tw`bg-green-400` : null,notCompletedIndexes.includes(index) ? tw`bg-red-600` : null]}>
              <Text style={tw`text-center text-2xl`}>{day.format('DD')}</Text>
              <Text style={tw`text-sm`}>{day.format('ddd')}</Text>
            </View>
          ))}

      </View>
      <Text style={tw`text-2xl px-3 font-semibold text-indigo-700`}>Today</Text>
      <Text style={tw`text-sm my-2 px-3 text-indigo-700`}>Burası Senin beslenme ve antrenman serüvenin</Text>

      <TouchableOpacity onPress={() => navigation.navigate('CurrentWorkout')}>
        <ImageBackground source={Background} style={[tw`w-80 h-60 rounded-full mx-auto`]} imageStyle={{ borderRadius: 10 }}>
          <View style={tw`my-40`}>
            <Text style={tw`text-3xl text-white text-center`}>Your Daily Activity Plan</Text>
            <Text style={tw`tex-sm font-thin text-white text-center`}>500kcal</Text>
          </View>

        </ImageBackground>

      </TouchableOpacity>
      <Text style={tw`text-2xl px-3 font-semibold text-indigo-700`}>Today's meal program</Text>
      {/* <View style={tw`w-80 h-20 border border-black rounded-full my-10 mx-auto`}></View>
      <View style={tw`w-80 h-20 border border-black rounded-full my-10 mx-auto`}></View> */}

      <View style={tw`rounded inline`}>
        <TouchableOpacity style={tw`w-65 h-15 bg-indigo-700 rounded-full mx-auto mt-8`} onPress={handleNutritionCreate}>
          <View style={tw`my-auto items-center`}>
            <Text style={tw`text-center text-white font-bold`} >Create Your Nutritions</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CurrentProgress;