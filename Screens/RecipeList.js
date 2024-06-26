import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react';
import tw from 'twrnc';

export default function RecipeList({ navigation, route }) {
    const { todaysRecipe } = route.params;

    console.log(todaysRecipe);
    return (
        <View style={{ padding: 24, flex: 1, backgroundColor: 'white' }}>
            {/* bu başlık dinamik olarak Breakfast/Lunch/Dinner olarak set edilmeli */}

            <View style={tw`mx-auto mt-5`}>
                <Text style={[tw`text-indigo-700`, { fontSize: 32, textAlign: 'center' }]}>Your Daily Recipe List</Text>
            </View>

            <View style={{ marginTop: 36 }}>
                <View style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 20, marginTop: 14 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MealDetail", { Recipe: todaysRecipe[0] })} style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Breakfast</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#7B61FF' }}>{Math.round(todaysRecipe[0].Calorie)}kcal</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 36 }}>
                <View style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 20, marginTop: 14 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MealDetail", { Recipe: todaysRecipe[2] })} style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Lunch</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#7B61FF' }}>{Math.round(todaysRecipe[2].Calorie)}kcal</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 36 }}>
                <View style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 20, marginTop: 14 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MealDetail", { Recipe: todaysRecipe[1] })} style={{ backgroundColor: '#F6F7F7', padding: 10, borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Dinner</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#7B61FF' }}>{Math.round(todaysRecipe[1].Calorie)}kcal</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}