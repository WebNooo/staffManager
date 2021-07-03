import axios from "axios";
axios.defaults.withCredentials = true
const instance = axios.create({
    proxy: "http://mcpr-tech.mocklab.io"
})

export const authUser = async () => await instance.post("/auth")
export const getStaff = async () => await instance.get("/staff")
export const getPositions = async () => await instance.get("/dictionaries/positions")