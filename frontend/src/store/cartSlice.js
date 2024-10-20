import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCarts: (state, action)=>{
            state.carts = action.payload.carts;
        }, 
        removeCarts: (state) => {
            state.carts = [];
        }, 
        removeCartOnly: (state, action) => {
            state.carts = state.carts.filter( cart => {
                return cart._id != action.payload.id;
            } )
        }
    }
})


export const { addCarts, removeCarts, removeCartOnly } = cartSlice.actions;
export default cartSlice.reducer;