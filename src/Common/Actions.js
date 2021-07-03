import {ADD_STAFF, REMOVE_STAFF, SET_AUTH, SET_POSITIONS, SET_STAFF} from "../reducer";

export const StaffAction = {
    set: (dispatch, staff) => dispatch({type: SET_STAFF, staff}),
    create: (dispatch, {fio, positionId, birthDate, actualPassDate}) => dispatch({type: ADD_STAFF, staff:{fio, positionId, birthDate, actualPassDate}}),
    remove: (dispatch, staff) => dispatch({type: REMOVE_STAFF, staff}),
}

export const PositionAction = {
    set: (dispatch, positions) => dispatch({type: SET_POSITIONS, positions}),
}

export const AuthAction = {
    login: (dispatch) => dispatch({type: SET_AUTH, status: true}),
    logout: (dispatch) => dispatch({type: SET_AUTH, status: false})
}