// import React from 'react';
// import sampleFoodData from './sampleFoodData';

// function FoodList() {
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold text-center mb-6">Food Menu</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sampleFoodData.map((food) => (
//                     <div
//                         key={food.id}
//                         className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
//                     >
//                         <img
//                             src={food.image}
//                             alt={food.name}
//                             className="w-32 h-32 object-cover rounded-full mb-4"
//                         />
//                         <h2 className="text-xl font-semibold">{food.name}</h2>
//                         <p className="text-gray-500 text-sm">{food.description}</p>
//                         <p className="text-green-600 font-bold mt-2">
//                             ₹{food.price}
//                         </p>
//                         <p
//                             className={`mt-2 text-sm ${
//                                 food.isVeg ? "text-green-500" : "text-red-500"
//                             }`}
//                         >
//                             {food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
//                         </p>
//                         <p className="text-yellow-500 text-sm">
//                             Rating: {food.rating} ⭐
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default FoodList;
