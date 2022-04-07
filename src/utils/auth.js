import Cookie from 'js-cookie'

const TOKEN = 'token'
export function getToken(){
    return Cookie.get(TOKEN)
}

export function setToken(token){
    return Cookie.set(TOKEN, token)
}

export function removeToken(){
    return Cookie.remove(TOKEN)
}