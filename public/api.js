
let API_URL = "/api";

export class HTTPError extends Error {
    /* status is the HTTP status, message is a user-facing error message. */
    constructor(status, message) {
      /* Call the Error constructor with the given message. */
      super(message);
      this.status = status;
    }
  }

const apiRequest = async(method, path, body = null) => {
    let res; 
    let dict; 

    if (body === null){
        dict = {
            method: method, 
            headers: {"Content-Type": "application/json"}
        }
    } else {
        dict = { 
            method: method, 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
            }

    }

    res = await fetch(API_URL + path, dict)
    let data = await res.json(); 

    if (res.status === 200){
        return data;
    } else {
        throw new HTTPError(res.status, data.error); 
    }

}

export default apiRequest; 