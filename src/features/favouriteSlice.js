import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loggedInUser = localStorage.getItem('user');
let userId = null; // Default userId to null if user is not logged in

if (loggedInUser) {
  const user = JSON.parse(loggedInUser);
 
  userId = user.id; // Retrieve userId from the logged-in user
}

const initialState = {
  favouriteItems: localStorage.getItem(`favouriteItems_${userId}`)
    ? JSON.parse(localStorage.getItem(`favouriteItems_${userId}`))
    : [],
  favouriteTotalQuantity: 0,
  favouriteTotalAmount: 0,
};



const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  return discountedPrice;
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite(state, action) {
      const { product, userId } = action.payload;
      
      const existingIndex = state.favouriteItems.findIndex(
        (item) => item.id === product.id
      );
    
      if (existingIndex >= 0) {
        state.favouriteItems[existingIndex] = {
          ...state.favouriteItems[existingIndex],
          favouriteQuantity: state.favouriteItems[existingIndex].favouriteQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...product, favouriteQuantity: 1 };
        state.favouriteItems.push(tempProductItem);
        toast.success("Product added to favourite", {
          position: "bottom-left",
        });
      }
      localStorage.setItem(`favouriteItems_${userId}`, JSON.stringify(state.favouriteItems));
    },
    
    decreaseFavourite(state, action) {
      const { product, userId } = action.payload;
      const itemIndex = state.favouriteItems.findIndex(
        (item) => item.id === product.id
      );

      if (state.favouriteItems[itemIndex].favouriteQuantity > 1) {
        state.favouriteItems[itemIndex].favouriteQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.favouriteItems[itemIndex].favouriteQuantity === 1) {
        const nextFavouriteItems = state.favouriteItems.filter(
          (item) => item.id !== product.id
        );

        state.favouriteItems = nextFavouriteItems;

        toast.error("Product removed from favourite", {
          position: "bottom-left",
        });
      }

      localStorage.setItem(`favouriteItems_${userId}`, JSON.stringify(state.favouriteItems));
    },

   removeFromFavourite(state, action) {
      const { product, userId } = action.payload;
      
      const nextFavouriteItems = state.favouriteItems.filter(
        (item) => item.id !== product.id
      );

      state.favouriteItems = nextFavouriteItems;

      toast.error("Product removed from favourite", {
        position: "bottom-left",
      });

      localStorage.setItem(`favouriteItems_${userId}`, JSON.stringify(state.favouriteItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.favouriteItems.reduce(
        (favouriteTotal, favouriteItem) => {
          const { price,discount ,favouriteQuantity } = favouriteItem;
          const discountedPrice = calculateDiscountedPrice(price, discount);
          const itemTotal = discountedPrice * favouriteQuantity;

          favouriteTotal.total += itemTotal;
          favouriteTotal.quantity += favouriteQuantity;

          return favouriteTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.favouriteTotalQuantity = quantity;
      state.favouriteTotalAmount = total;
    },
    clearFavourite(state, action) {
      const { userId } = action.payload;
      state.favouriteItems = [];
      localStorage.setItem(`favouriteItems_${userId}`, JSON.stringify(state.favouriteItems));
     
    },
    getFavouriteQuantity(state, action) {
      const { productId } = action.payload;
      const favouriteItem = state.favouriteItems.find((item) => item.id === productId);
      const favouriteQuantity = favouriteItem ? favouriteItem.favouriteQuantity : 0;
      return favouriteQuantity;
    },
  },
});

export const { addToFavourite, decreaseFavourite, removeFromFavourite, getTotals, clearFavourite,getFavouriteQuantity } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
