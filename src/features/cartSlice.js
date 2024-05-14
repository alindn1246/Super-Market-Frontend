import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loggedInUser = localStorage.getItem('user');
let userId = null; // Default userId to null if user is not logged in

if (loggedInUser) {
  const user = JSON.parse(loggedInUser);
 
  userId = user.id; // Retrieve userId from the logged-in user
}

const initialState = {
  cartItems: localStorage.getItem(`cartItems_${userId}`)
    ? JSON.parse(localStorage.getItem(`cartItems_${userId}`))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};



const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  return discountedPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, userId } = action.payload;
      
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );
    
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...product, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
    },
    
    decreaseCart(state, action) {
      const { product, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== product.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
    },

   removeFromCart(state, action) {
      const { product, userId } = action.payload;
      
      const nextCartItems = state.cartItems.filter(
        (item) => item.id !== product.id
      );

      state.cartItems = nextCartItems;

      toast.error("Product removed from cart", {
        position: "bottom-left",
      });

      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price,discount ,cartQuantity } = cartItem;
          const discountedPrice = calculateDiscountedPrice(price, discount);
          const itemTotal = discountedPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      const { userId } = action.payload;
      state.cartItems = [];
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
     
    },
    getCartQuantity(state, action) {
      const { productId } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === productId);
      const cartQuantity = cartItem ? cartItem.cartQuantity : 0;
      return cartQuantity;
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart,getCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
