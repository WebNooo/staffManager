
import {Reducer} from "./reducer";
import {AuthAction, PositionAction, StaffAction} from "./Common/Actions";

let initialState;

beforeEach(() => {
    initialState = {
        isAuth: false,
            staff: [
        {id: 1, fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()},
        {id: 2, fio:"test", positionId:1, birthDate:new Date(), actualPassDate:new Date()}
    ],
        positions: []
    }
})

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

it("Добавление массива сотрундиков в стейт", () => {
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
    }

    const fn = ["Евгений", "Николая","Андрей","Сергей","Георгий"]
    const ln = ["Петров", "Соколов","Фиактистов","Любимов","Корнилов", "Кузнецов", "Иванов"]

    let id = 500;
    let newStaff = [];
    while (id < 5500) {
        const f = Math.floor(Math.random() * fn.length);
        const l = Math.floor(Math.random() * ln.length);
        const p = Math.floor(Math.random() * 4);
        newStaff = [...newStaff, {id, fio: `${ln[l]} ${fn[f]} `, positionId:p === 0 ? 1 : p, birthDate: randomDate(new Date(1950, 0, 1), new Date()), actualPassDate: randomDate(new Date(2020, 0, 1), new Date())}]

        id += 1
    }
    let action =  StaffAction.append((value) => value, newStaff)
    let newState = Reducer(initialState, action)

    expect(newState.staff.length).toBe(5002)
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