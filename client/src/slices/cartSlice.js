import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    totalPrice:0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state,action)=>{
            const isPresent = state.items.find(item => item.id === action.payload.id)
            const newItems = []
            if(isPresent){
                state.items.map(item => {
                    item.id === action.payload.id ? newItems.push({...item,amount:item.amount+1}) : newItems.push(item) 
                })
                state.items = newItems
            }else{
                state.items= state.items.concat({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    amount: 1
                })
            }
            state.totalPrice =Number(state.totalPrice) + Number(action.payload.price)
        },
        increaseItemAmount: (state,action)=>{
            const newItems = []
            state.items.map(item => {
                item.id === action.payload.id ? newItems.push({...item,amount:item.amount +1}) : newItems.push(item)
            })
            state.items = newItems
            state.totalPrice = newItems.reduce((sum,id)=> sum+(id.price*id.amount),0)
        },
        decreaseItemAmount: (state,action)=>{
            const newItems = []
            state.items.map(item => {
                    item.id === action.payload.id ? newItems.push({...item,amount:item.amount -1}) : newItems.push(item)
                });
            state.items = newItems
            state.totalPrice = newItems.reduce((sum,id)=> sum+(id.price*id.amount),0)
        },
        removeFromCart: (state,action)=>{
            const newItems = []
            state.items.map(item => {
                if(item.id != action.payload.id){
                    newItems.push(item)
                }
            })
            state.items = newItems
            state.totalPrice =  newItems.reduce((sum,id)=> sum+(id.price*id.amount),0)
        },
        clearCart: (state)=>{
            state.items = [],
            state.totalPrice = 0
        }
    }
})

export const {addToCart,clearCart,increaseItemAmount,decreaseItemAmount,removeFromCart} = cartSlice.actions
export default cartSlice.reducer