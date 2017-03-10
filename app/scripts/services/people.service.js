/**
 * Created by sibusisomassango on 2017/02/23.
 */
'use strict';

angular.module('app.login')
.factory('PeopleService',
        ['$log', '$rootScope', '$location', '$http', '$window', '$cookieStore',
            function ($log, $rootScope, $location, $http, $window, $cookieStore, $q) {

    var service = {};

    service.getListOfPeople = function (url) {
        var url = url !== null ? url : "http://swapi.co/api/people/";
        return $http({
            method: 'get',
            url: url
        }).then(function(response){
            console.log("list of people", response);
            // defer.resolve(response);

            return response
        },function(err){
            console.log("Oops something went wrong", err);
        });
    }

    service.getSpecies = function (speciesUrl) {
        return $http({
            method:'get',
            url:speciesUrl
        }).then(function (response) {
            //console.log("species",response);
            return response;
        },function (err) {
            console.log(err)
        })
    }

    service.getHomeWorld = function (homeWorldUrl) {
        return $http({
            method:'get',
            url:homeWorldUrl
        }).then(function (response) {
            //console.log("species",response);
            return response;
        },function (err) {
            console.log(err)
        })
    }

    service.getStarship = function (starShipUrl) {
        return $http({
            method:'get',
            url:starShipUrl
        }).then(function (response) {
            //console.log("species",response);
            return response;
        },function (err) {
            console.log(err)
        })
    }
service.getMapRequests = function (googleUrl) {
    return $http({
        method:'get',
        url:googleUrl,
       'Access-Control-Allow-Origin':'*'
    }).then(function (response) {
        console.log("map",response);
        return response;
    },function (err) {
        console.log(err)
    })
}
    service.getSearchRequest = function (pageNo,searchStr) {
        var url = 'http://swapi.co/api/people/?page='+pageNo+'&search='+searchStr;
        console.log(url)
        return $http({
            method:'get',
            url:url
        }).then(function (response) {
            //console.log("species",response);
            return response;
        },function (err) {
            console.log(err)
        })
    }

     return service;

  }])