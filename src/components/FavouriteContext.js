import React, { createContext, useState } from 'react';

// Create the UserContext
export const FavouriteContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // Initial user state with favorites field
  const [user, setUser] = useState({
    _id: "66eae946da4bd26c1168d452",
    email: "priyakiruthi21@gmail.com",
    otp: null,
    otpExpiry: null,
    isVerified: true,
    __v: 18,
    password: "$2b$10$FShvcxaWxurD1s5EGgTt..pT23TwIH5OoJbnDF9.6e9Bn13b073py",
    uniqueId: "67c5dac4-febd-4b0d-a458-45f01ee01c69",
    favorites: [
      {
        carId: "623d97170ff4",
        brand: "Toyota",
        model: "Jeevan",
        year: "2022",
        price: "$30,000",
        kmDriven: "30,000 km",
        fuelType: "Petrol",
        transmission: "Automatic",
        condition: "Good",
        location: "Hyderabad",
        images: [],  // Add actual image data here
        features: [],  // Add actual features here
        technicalSpecifications: [],  // Add actual specifications here
        _id: "66e6c642828175d241773315",
        __v: 0,
      },
    ],
  });

  // Update the user's favorites (Add functionality)
  const addToFavorites = (newFavorite) => {
    setUser((prevState) => ({
      ...prevState,
      favorites: [...prevState.favorites, newFavorite],
    }));
  };

  // Remove from user's favorites (Remove functionality)
  const removeFromFavorites = (carId) => {
    setUser((prevState) => ({
      ...prevState,
      favorites: prevState.favorites.filter((car) => car.carId !== carId),
    }));
  };

  return (
    <FavouriteContext.Provider value={{ user, setUser, addToFavorites, removeFromFavorites }}>
      {children}
    </FavouriteContext.Provider>
  );
};
