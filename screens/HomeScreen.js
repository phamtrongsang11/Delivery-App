import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	UserIcon,
	ChevronDownIcon,
	AdjustmentsHorizontalIcon,
	MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
//b258df74-d5ae-4f73-a2d7-38e5f9797ae1
const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		sanityClient
			.fetch(
				`
		*[_type == "featured"] {
			..., restaurants[]->{
				...,
				dishes[]->{}
			}
		}
		`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);

	return (
		<SafeAreaView className="bg-dark pt-5">
			{/* Header */}
			<View className="flex flex-row items-center mx-4 space-x-2">
				<Image
					source={{ uri: 'https://links.papareact.com/wru' }}
					className="h-7 w-7 bg-gray-300 p-4 rounded-full"
				/>
				<View className="flex-1">
					<Text className="font-bold text-gray-400 text-xs">Delivery Now</Text>
					<Text className="font-bold text-xl">
						Current Location
						<ChevronDownIcon size={20} color="#00CCBB" />
					</Text>
				</View>
				<UserIcon size={35} color="#00CCBB" />
			</View>
			{/* Search */}
			<View className="flex-row items-center space-x-2 pb-2 mx-4 mt-2">
				<View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3">
					<MagnifyingGlassIcon color="gray" size={20} />
					<TextInput
						placeholder="Restaurants and cuisines"
						keyboardType="default"
					/>
				</View>
				<AdjustmentsHorizontalIcon color="#00CCBB" />
			</View>
			{/* Body */}
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 150,
				}}
			>
				<Categories />
				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						id={category._id}
						title={category.name}
						description={category.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
