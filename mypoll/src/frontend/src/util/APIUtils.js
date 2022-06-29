import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants/constant';
import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}

const request = (config) => {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }

    return axios(config)
}

export const checkUsernameAvailability = (username) => {
    config.method = 'get'
    config.url = API_BASE_URL + "/user/checkUsernameAvailability?username=" + username

    return request(config)
}

export const checkEmailAvailability = (email) => {
    config.method = 'get'
    config.url = API_BASE_URL + "/user/checkEmailAvailability?email=" + email

    return request(config)
}

export const signup = (signupRequest) => {
    config.method = 'post'
    config.url = API_BASE_URL + "/auth/signup"
    config.data = JSON.stringify(signupRequest)

    return request(config)
}

export const login = (loginRequest) => {
    config.method = 'post'
    config.url = API_BASE_URL + "/auth/signin"
    config.data = JSON.stringify(loginRequest)

    return request(config)
}

export const getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.")
    }

    config.method = 'get'
    config.url = API_BASE_URL + "/user/me"

    return request(config)
}