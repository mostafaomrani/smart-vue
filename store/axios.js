import { baseUrl } from "@/store";
import axios from "axios";

export default  function getData(method,url,body, header) {
    
    if(header instanceof Object){
        header.Authorization = "Bearer " + localStorage.token
    }
    if(method == "get"){  
        return axios.get(baseUrl + url, {headers: header,})
    }else{
        var config = {
            method: "post",
            url: baseUrl + url,
            headers: header,
            data: body,
        };
        return  axios(config)
    }
}