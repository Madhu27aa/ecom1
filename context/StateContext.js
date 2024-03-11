import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'; // Import useRouter hook

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const[cakeMessage, setCakeMessage] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const router = useRouter(); 

  let foundProduct;
  let index;

  const onAdd = (product, quantity, deliveryPincode, cakeMessage) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setDeliveryPincode(deliveryPincode); 
    findDeliveryCharges(deliveryPincode).then(deliveryCharges => {
      setDeliveryCharges(deliveryCharges);
      console.log("delivery", deliveryCharges); // This will log the delivery cost value
    });

    setDeliveryCharges(deliveryCharges);
    
    setCakeMessage(cakeMessage);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
  } 

  async function findDeliveryCharges(deliveryPincode) {
    const deliveryCost = await handleGetLatLng(deliveryPincode);
    return deliveryCost;
  }

  const handleGetLatLng = async (deliveryPincode) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${deliveryPincode}&format=json`
    );
  
    const lon1 = 80.2454366125;
    const lat1 = 13.124858745833333;
    let newLat = null;
    let newLong = null;
  
    const data = await response.json();
    if (data.length > 0) {
      newLat = parseFloat(data[0].lat);
      newLong = parseFloat(data[0].lon);
    }
  
    if (!isNaN(newLat) && !isNaN(newLong)) {
      console.log("lat", newLat);
      console.log("long", newLong);
  
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
      const φ2 = (newLat * Math.PI) / 180;
      const Δφ = ((newLat - lat1) * Math.PI) / 180;
      const Δλ = ((newLong - lon1) * Math.PI) / 180;
  
      console.log("φ1", φ1);
      console.log("φ2", φ2);
      console.log("Δφ", Δφ);
      console.log("Δλ", Δλ);
  
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      console.log("a", a);
      console.log("c", c);
  
      const d = (R * c) /1000 ; // Distance in km
      console.log("d", d);
      console.log("FINAL", d.toFixed(1));
      return Math.round(d.toFixed(1) * 17); // Distance in kilometers
    } else {
      console.log("Invalid latitude or longitude");
      return null;
    }
  };
  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];

    if (value === 'inc') {
        newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
        if (foundProduct.quantity > 1) {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
    }
};


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        deliveryPincode,
        deliveryCharges,
        cakeMessage,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setDeliveryPincode,
        setDeliveryCharges,
        setCakeMessage
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);