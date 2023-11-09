import baseURL from './baseUrl'

const endpoints = {
    auth:{
        register: `${baseURL}/auth/register/`,
        login: `${baseURL}/auth/login/`,
    }
}

export default endpoints