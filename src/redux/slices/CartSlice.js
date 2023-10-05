const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
    name: 'cartlist',
    initialState: {
        data: [],
    },
    reducers: {
        addItemToCartList(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            tempData.map(item => {
                if (item.id === action.payload.id) {
                    isItemExist = true;
                    item.qty = item.qty + 1;
                }
            });
            if (!isItemExist) {
                tempData.push(action.payload);
            }
            state.data = tempData;
        },
        reduceItemToCartList(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            tempData.map(item => {
                if (item.id === action.payload.id) {
                    if (item.qty > 1) {
                        item.qty = item.qty - 1;
                    }

                }
            });
            state.data = tempData;
        },
        removeItemFromCart(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload, 1);

            state.data = tempData;
        },
        emptyCart(state, action) {
            state.data = action.payload;
        }
    }
});

export const { addItemToCartList, reduceItemToCartList, removeItemFromCart, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;