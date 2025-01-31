import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    if (!food_list || food_list.length === 0) {
        return  <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-r-yellow-600 animate-spin"></div>;  
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => (
                    (category === "All" || category === item.category) && (
                        <FoodItem 
                            key={item._id}  // Using item._id instead of index for better React performance
                            id={item._id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            image={item.image}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
