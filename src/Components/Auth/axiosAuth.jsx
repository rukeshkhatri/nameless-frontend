import axios from "axios";

const BASE_URL = "https://api-nameless.herokuapp.com/api/v1/";
const headerConfig = {
	Authorization: "Bearer " + localStorage.getItem("jwt"),
};

export default axios.create({ baseURL: BASE_URL, headers: headerConfig });
