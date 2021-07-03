import React from "react";

export const SET_AUTH = "SET_AUTH";

export const SET_POSITIONS = "SET_POSITIONS";

export const SET_STAFF = "SET_STAFF";
export const ADD_STAFF = "ADD_STAFF";
export const REMOVE_STAFF = "REMOVE_STAFF";

export const ContextApp = React.createContext();

export const initialState = {
    isAuth: false,
    staff: [],
    positions: []
}

export function Reducer(state, action){
    switch (action.type){
        case SET_AUTH:
            return {...state, isAuth: action.status}
        case SET_STAFF:
            return {...state, staff: [...action.staff]}
        case SET_POSITIONS:
            return {...state, positions: [...action.positions]}
        case ADD_STAFF:
            return {...state, staff: [...state.staff, {id: state.staff.length+10000, ...action.staff}]}
        case REMOVE_STAFF:
            return {...state, staff: [...state.staff.filter(item => !action.staff.includes(item))]}
        default:
            return state
    }
}