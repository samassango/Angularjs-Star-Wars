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
            console
        })
    }

     return service;

  }])