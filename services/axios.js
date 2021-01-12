import axios from 'axios'
export default class Car {

    FirstName = null;
    LastName = "";

    constructor(fname, lname) {
        this.FirstName = fname;
        this.LastName = lname;
    }

    getFullName() {
        return this.FirstName + ' ' + this.LastName;
    }

    getFirstName() {
        return this.FirstName;
    }

    getLastName() {
        return this.LastName;
    }


    sendPost(url, header, body) {
        axios
            .post(
                url,
                {
                    data: ""
                },
                {
                    headers: header
                }
            )
            .then(res => {
                return res;
            })
            .catch(err => {
                return (err);
            });

    }

    sendGet(url, header, body) {
        var result 
         axios
        .get(url, {
            headers: header
        })
        .then(function (response) {
            result = response
        })
        .catch(error => {
            result = error
        });
            return result
    }


}