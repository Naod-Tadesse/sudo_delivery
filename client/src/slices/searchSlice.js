import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    search:"",
    type:"all",
    sort: "a-z",
    page:1,
    pageSize:9
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers : {
        setSearch : (state,action)=>{
             state.search = action.payload.phrase
        },
        setSort : (state,action)=>{
            state.sort = action.payload.sort
        },
        setType : (state,action)=>{
            state.type = action.payload.type
        },
        nextPage : (state) =>{
            state.page = state.page + 1
        },
        prevPage : (state)=>{
            state.page = state.page <=  1 ? 1: state.page -1
        },
        setPage : (state,action)=>{
            state.page = action.payload.pageNumber 
        },
        clearSearch : (state)=>{
            state.page = 1
            state.type = "all"
            state.sort = "a-z"
            state.search = ""
        }
    }
})

export const {setSearch,setSort,nextPage,prevPage,setType,setPage,clearSearch} = searchSlice.actions
export default searchSlice.reducer