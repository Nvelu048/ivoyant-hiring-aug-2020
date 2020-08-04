import Axios from "axios";

class NetworkClient {
    static networkClient = new NetworkClient();
    axios;
    constructor() {
        this.axios = Axios
    }
}

export default NetworkClient;