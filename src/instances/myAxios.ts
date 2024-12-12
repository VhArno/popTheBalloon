import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'https://poptheballoonserver.onrender.com'
})

export { myAxios }