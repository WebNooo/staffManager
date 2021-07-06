import axios from "axios";
axios.defaults.withCredentials = true

// как вариант прокси можно настроить так https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
const instance = axios.create({
    proxy: "http://mcpr-tech.mocklab.io"
})

export const authUser = async () => await instance.post("/auth")
export const getStaff = async () => await instance.get("/staff")
export const getPositions = async () => await instance.get("/dictionaries/positions")