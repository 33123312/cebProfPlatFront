let response 
let token = localStorage.getItem("token")
if(token){
    response = {}
    let headers = {}
        headers["x-acces-token"] = token
    response = {headers}
} else
    response = false

export default response