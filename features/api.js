import Axios from "axios"
import { API_key } from "./constants"


export const getDataFromAsteroidId = (id) => {
    return Axios({
        method: 'GET',
        url: `https://api.nasa.gov/neo/rest/v1/neo/${id}`,
        params: {
            api_key: API_key
        }
    })
}

export const getBrowseAsteroidData = () => {
    return Axios({
        method: 'GET',
        url: `https://api.nasa.gov/neo/rest/v1/neo/browse`,
        params: {
            api_key: API_key
        }
    })
}