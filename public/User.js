import apiRequest from "./api.js";
import { HTTPError } from "./api.js";



export default class User {

    constructor(data) {
        Object.assign(this, data);
    }

    static async loadOrCreate(id) {
        let data;  
        try {
          data = await apiRequest("GET", `/users/${id}`); 
          alert(`Welcome back, ${id}!`)
        } catch (e) {
          if (e.status === 404){
            data = await apiRequest("POST", "/users", {id});
            alert(`Welcome to The Emotional Hub! We've just created a new account for you, ${id}!`)
          }
        }
        return new User(data);
      }

    async updateMood(mood){
        let data = await apiRequest("PATCH", `/users/${this.id}`, {mood}); 
        return data; 

    }

    async addResponse(response){
        let data = await apiRequest("PATCH", `/users/${this.id}`, {response});
        return data; 
    }

    async clearResponses(id){
        let data = await apiRequest("PATCH", `/users/${id}`, null); 
        
    }

    async getResponses(id){
        let data = await apiRequest("GET", `/users/${id}`); 
        return (data.responses); 
    }
}
