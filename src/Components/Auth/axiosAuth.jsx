import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const headerConfig = {
	Authorization: "Bearer " + localStorage.getItem("jwt"),
};

export default axios.create({ baseURL: BASE_URL, headers: headerConfig });
