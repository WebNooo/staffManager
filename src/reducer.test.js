
import {Reducer} from "./reducer";
import {AuthAction, PositionAction, StaffAction} from "./Common/Actions";

const initialState = {
    isAuth: false,
    staff: [
        {id: 1, fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {id: 2, fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()}
    ],
    positions: []
}

it("Создание сотрудника", () => {
    let action = StaffAction.create((value) => value, {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()})
    let newState = Reducer(initialState, action)
    expect(newState.staff.length).toBe(3)
})

it("Заполнение сотрудников", () => {
    let staff = [
        {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()}
    ]
    let action = StaffAction.set((value) => value, staff)
    let newState = Reducer(initialState, action)
    expect(newState.staff.length).toBe(5)
})

it("Удаление сотрудников", () => {
    let action = StaffAction.remove((value) => value, [initialState.staff[0]])
    let newState = Reducer(initialState, action)
    expect(newState.staff.length).toBe(1)
})

it("Заполнение должностей", () => {
    let positions = [
        {id:1, name:"test"},
        {id:2, name:"test2"},
    ]
    let action = PositionAction.set((value) => value, positions)
    let newState = Reducer(initialState, action)
    expect(newState.positions.length).toBe(2)
})

it("Смена статуса авторизации", () => {
    let action = AuthAction.login((value) => value)
    let newState = Reducer(initialState, action)
    expect(newState.isAuth).toBe(true)
})