import axios from "axios";

// Pull data from Json server
// Use this command to start the server: npx json-server --watch db.json --port 3001
const BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
    baseURL: BASE_URL
})

export default {
    getUsers() {
        return apiClient.get('user')
    }
}