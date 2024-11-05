import hotel from '/public/icons/places-icons/bed.svg';
import food_drink from '/public/icons/places-icons/food.svg';
import hospital from '/public/icons/places-icons/hospital.svg';
import park from '/public/icons/places-icons/park.svg';
import school from '/public/icons/places-icons/school.svg';
import shopping from '/public/icons/places-icons/shopping.svg';
import transport from '/public/icons/transport.svg';

export const getTotalGroupCount = (dataArray: any, groupType: any) => {
  let groupCount = Object.fromEntries(
    Object.keys(groupType).map((key) => [key, 0])
  );
  dataArray.forEach((item: any) => {
    Object.entries(groupType).forEach(([group, types]: any) => {
      if (types.includes(item.primary_type)) groupCount[group]++;
    });
  });

  return groupCount;
};

export const getIcon = (type: string) => {
  // * Find type in  array of schoolsTypes hospitalsTypes parksTypes  lodgingTypes,
  // * shoppingTypes, transportTypes
  if (schoolsTypes.includes(type)) return school.src;
  if (hospitalsTypes.includes(type)) return hospital.src;
  if (parksTypes.includes(type)) return park.src;
  if (lodgingTypes.includes(type)) return hotel.src;
  if (shoppingTypes.includes(type)) return shopping.src;
  if (transportTypes.includes(type)) return transport.src;
  if (foodTypes.includes(type)) return food_drink.src;

  return '';
};

// export const getAllTotalGroupCount = (dataArray: any, ...typesArrays: any) => {
//   const groupCounts: any = {};

//   // Initialize groupCounts for each group to 0
//   typesArrays.forEach((typesArray: any) => {
//     groupCounts[typesArray[0]] = 0; // Assuming the first type in each array represents the group
//   });

//   // Loop through dataArray and update groupCounts
//   dataArray.forEach((item: any) => {
//     typesArrays.forEach((typesArray: any) => {
//       if (typesArray.includes(item.primary_type)) {
//         groupCounts[typesArray[0]]++;
//       }
//     });
//   });

//   return groupCounts;
// };

export const icons = [
  { label: 'Schools', icon: school.src, id: 'schoolsTypes' },
  { label: 'Hospitals', icon: hospital.src, id: 'hospitalsTypes' },
  { label: 'Parks', icon: park.src, id: 'parksTypes' },
  { label: 'Lodging', icon: hotel.src, id: 'lodgingTypes' },
  { label: 'Shopping', icon: shopping.src, id: 'shoppingTypes' },
  { label: 'Transport', icon: transport.src, id: 'transportTypes' },
  { label: 'Food & Drinks', icon: food_drink.src, id: 'foodTypes' },
];

export const schoolsTypes = [
  'school',
  'university',
  'secondary_school',
  'primary_school',
  'preschool',
  'library',
];

export const hospitalsTypes = [
  'dental_clinic',
  'dentist',
  'doctor',
  'drugstore',
  'hospital',
  'medical_lab',
  'pharmacy',
  'physiotherapist',
  'spa',
];
export const parksTypes = [
  'amusement_center',
  'amusement_park',
  'aquarium',
  'banquet_hall',
  'bowling_alley',
  'casino',
  'community_center',
  'convention_center',
  'cultural_center',
  'dog_park',
  'event_venue',
  'hiking_area',
  'historical_landmark',
  'marina',
  'movie_rental',
  'movie_theater',
  'national_park',
  'night_club',
  'park',
  'tourist_attraction',
  'visitor_center',
  'wedding_venue',
  'zoo',
];
export const lodgingTypes = [
  'bed_and_breakfast',
  'campground',
  'camping_cabin',
  'cottage',
  'extended_stay_hotel',
  'farmstay',
  'guest_house',
  'hostel',
  'hotel',
  'lodging',
  'motel',
  'private_guest_room',
  'resort_hotel',
  'rv_park',
];
export const shoppingTypes = [
  'auto_parts_store',
  'bicycle_store',
  'book_store',
  'cell_phone_store',
  'clothing_store',
  'convenience_store',
  'department_store',
  'discount_store',
  'electronics_store',
  'furniture_store',
  'gift_shop',
  'grocery_store',
  'hardware_store',
  'home_goods_store',
  'home_improvement_store',
  'jewelry_store',
  'liquor_store',
  'market',
  'pet_store',
  'shoe_store',
  'shopping_mall',
  'sporting_goods_store',
  'store',
  'supermarket',
  'wholesaler',
];
export const transportTypes = [
  'airport',
  'bus_station',
  'bus_stop',
  'ferry_terminal',
  'heliport',
  'light_rail_station',
  'park_and_ride',
  'subway_station',
  'taxi_stand',
  'train_station',
  'transit_depot',
  'transit_station',
  'truck_stop',
  'car_dealer',
];
export const foodTypes = [
  'coffee_shop',
  'american_restaurant',
  'bakery',
  'bar',
  'barbecue_restaurant',
  'brazilian_restaurant',
  'breakfast_restaurant',
  'brunch_restaurant',
  'cafe',
  'chinese_restaurant',
  'coffee_shop',
  'fast_food_restaurant',
  'french_restaurant',
  'greek_restaurant',
  'hamburger_restaurant',
  'ice_cream_shop',
  'indian_restaurant',
  'indonesian_restaurant',
  'italian_restaurant',
  'japanese_restaurant',
  'korean_restaurant',
  'lebanese_restaurant',
  'meal_delivery',
  'meal_takeaway',
  'mediterranean_restaurant',
  'mexican_restaurant',
  'middle_eastern_restaurant',
  'pizza_restaurant',
  'ramen_restaurant',
  'restaurant',
  'sandwich_shop',
  'seafood_restaurant',
  'spanish_restaurant',
  'steak_house',
  'sushi_restaurant',
  'thai_restaurant',
  'turkish_restaurant',
  'vegan_restaurant',
  'vegetarian_restaurant',
  'vietnamese_restaurant',
];
