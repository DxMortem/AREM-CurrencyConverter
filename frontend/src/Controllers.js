import axios from "axios";

const amazonBackend = axios.create({
    baseURL: "https://42mvu06co5.execute-api.us-east-1.amazonaws.com/production",
    headers:null
});

export var gets = {

    getCurrencies: function getCurrencies(callback) {
        amazonBackend.get("/currencies").then(function (response) {
            callback.onSuccess(response);
        }).catch(function (error) {
            callback.onfailed(error);
        });
    },
    getLatest: function getLatest(callback) {
        amazonBackend.get("/latest").then(function (response) {
            callback.onSuccess(response);
        }).catch(function (error) {
            callback.onfailed(error);
        });
    },
    getRates:function getRates(callback) {
        amazonBackend.get("/rates").then(function (response) {
            callback.onSuccess(response);
        }).catch(function (error) {
            callback.onfailed(error);
        });
    }
};


