import axios from "axios";
export default function getData(url) {
  return axios.get(url);
}
