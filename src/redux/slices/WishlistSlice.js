const { createSlice } = require("@reduxjs/toolkit");

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        data: [],
    },
    reducers: {
        addItemToWishList(state, action) {
            let tempData = state.data;
            tempData.push(action.payload);
            state.data = tempData;
        },
        removeItemFromWishList(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload, 1);
            state.data = tempData;
        }
    }
});

export const { addItemToWishList, removeItemFromWishList } = WishlistSlice.actions;
export default WishlistSlice.reducer;