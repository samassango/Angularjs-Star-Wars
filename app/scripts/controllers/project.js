(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectCtrl', ProjectCtrl)
  .controller('ProjectDelCtrl', ProjectDelCtrl)
  .controller('ProjectEditCtrl', ProjectEditCtrl)
  .controller('ViewProjectsCtrl', ViewProjectsCtrl)
  .controller('PeopleController', PeopleController)
  .controller('SearchController', SearchController)
  .controller('MapController', MapController);

  function PeopleController($log, $scope, $rootScope, $cookieStore, $http, PeopleService, $window){

      $scope.handleListOfPeople =function () {
          console.log("listining")
          var url = $scope.hasOwnProperty('ObjectUrl') ? $scope.ObjectUrl : null;
          console.log(url)
          PeopleService.getListOfPeople(url).then(function(response){
              console.log(response);

              $scope.Object=response.data;


              $scope.request_list = response.data.results;

              $scope.request_list.forEach(function (data,index) {
                  //console.log("data",data.species[0])
                  PeopleService.getSpecies(data.species[0]).then(function (response) {
                      //console.log("species",response)
                      $scope.request_list[index].items = response;
                  })
              })

              $scope.request_list.forEach(function (data,index) {
                  //console.log("data",data.homeworld)
                  PeopleService.getHomeWorld(data.homeworld).then(function (response) {
                      //console.log("species",response)
                      $scope.request_list[index].homeWorldItems = response;
                  })
              })

              $scope.request_list.forEach(function (data,index) {
                 console.log("data",data.starships[0])
                  if(data.starships[0] !== undefined)
                  PeopleService.getStarship(data.starships[0]).then(function (response) {
                      //console.log("species",response)
                      $scope.request_list[index].starshipItems = response;
                  })
              })
              //console.log("Results",$scope.request_list)

          },function(error){
              console.log(error);
          })

      };

      $scope.handleNextListOfPoeple = function () {
          $scope.ObjectUrl =$scope.Object.next;
          console.log("Next",$scope.Object)
          $scope.handleListOfPeople();

      };

      $scope.handlePreviousListOfPoeple = function () {
          $scope.ObjectUrl = $scope.Object.previous;
          console.log("previous",$scope.Object)
          $scope.handleListOfPeople();
      };

      $scope.handleRowOnClickOfPerson = function (selectedData) {
          console.log("I was invoked",selectedData)
          $scope.selectedObject = selectedData;
      }
  }

  function SearchController($log, $scope, $rootScope, $cookieStore, $http, PeopleService, $window){
      $scope.pageNo = 1;
      $scope.handlePeopleSearchList = function(){

          var searchStr = $scope.name;
          var pageNo = $scope.hasOwnProperty('pageNo') ? $scope.pageNo : 1;

          PeopleService.getSearchRequest(pageNo,searchStr).then(function(response){

              $scope.search_list = response.data.results;

              $scope.search_list.forEach(function (data,index) {
                  //console.log("data",data.species[0])
                  PeopleService.getSpecies(data.species[0]).then(function (response) {
                      //console.log("species",response)
                      $scope.search_list[index].items = response;
                  })
              })
          },function (error) {
              console.log(error)
          })
      }
     $scope.handleSearchPreviousListOfPoeple = function(){
          $scope.pageNo = $scope.pageNo - 1;
          console.log("Previous",$scope.pageNo)
         $scope.handlePeopleSearchList();
     }
     $scope.handleSearchNextListOfPoeple = function () {
         $scope.pageNo = Number($scope.pageNo) + 1;
         console.log("Next",$scope.pageNo)
         $scope.handlePeopleSearchList();
     }
          console.log("Search was invoked");

  }

  function MapController($log, $scope, $rootScope, $cookieStore, $http, PeopleService, $window){
      console.log('Map view invoked');

      $scope.markers = [];

      navigator.geolocation.getCurrentPosition(function (position) {
console.log(position)
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
var centerLatlng = {lat: position.coords.latitude, lng: position.coords.longitude}
console.log(latLng)
          var mapOptions = {
              center: centerLatlng,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
console.log(mapOptions)
          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

          //Wait until the map is loaded
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){

              //TO DO add this to a config file
              var nearbysearchapiEndPoint ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

              $scope.API = nearbysearchapiEndPoint + position.coords.latitude + "," + position.coords.longitude + "&radius=10000&type=comic store&key=AIzaSyD8Or6tO3h801EW-QtIDI_VG-93B5OnoIM"; //TODO add the key to the config file

              // PeopleService.getMapRequests($scope.API).then(function (response) {
              //     console.log("response",response);
              // })

              $http.get($scope.API).success(function (response) {

                  $scope.locations = response.results;

                  $.each($scope.locations, function (index, value) {

                      var latLng = new google.maps.LatLng($scope.locations[index].geometry.location.lat, $scope.locations[index].geometry.location.lng);

                      var marker =  new google.maps.Marker({
                          map: $scope.map,
                          animation: google.maps.Animation.DROP,
                          position: latLng,
                          title: $scope.locations[index].name
                      });

                      var direction = 'http://maps.google.com/maps?saddr=' + position.coords.latitude + "," + position.coords.longitude + "&daddr=" + $scope.locations[index].geometry.location.lat + "," + $scope.locations[index].geometry.location.lng;
//console.log(direction);
                      var infoWindow = new google.maps.InfoWindow({
                          content: $scope.locations[index].name + "<br><a class=\"button get-directions\" data-marker=\"{{ infoWindow.id }}\" href="+ direction+ ">Get Directions</a>"
                      });

                      google.maps.event.addListener(marker, 'click', function () {
                          infoWindow.open($scope.map, marker);
                      });

                  });

              });

          });


      }, function (error) {

          alert({
              message: 'Please enable you GPS and try again.!',
              modifier: 'material'
          });


      }, {
          maximumAge: Infinity,
          timeout: 60000,
          enableHighAccuracy: true
      });

  }
  function ProjectCtrl($log, $scope, $rootScope, $cookieStore,  $http, ProjectService, $window){


      $scope.activeViewProject = function(){

        if($scope.projectForm === true){
          $scope.projectForm = false;

        }else {
          $scope.projectForm = true;
          $scope.EditProjectForm = false;
          $scope.DelProjectForm = false;
          $scope.AddProjectForm = false;

        }
      };

    $scope.activeAddProject = function(){

        if($scope.AddProjectForm === true){
          $scope.AddProjectForm = false;

        }else {
          $scope.AddProjectForm = true;
          $scope.DelProjectForm = false;
          $scope.EditProjectForm = false;
          $scope.projectForm = false;

        }

    };
    $scope.activeDelProject = function(){

      if($scope.DelProjectForm === true){
        $scope.DelProjectForm = false;

      }else {
        $scope.DelProjectForm = true;
        $scope.EditProjectForm = false;
        $scope.AddProjectForm = false;
        $scope.projectForm = false;


      }

    };

    $scope.activeEditProject = function(){

      if($scope.EditProjectForm === true){
        $scope.EditProjectForm = false;

      }else {
        $scope.EditProjectForm = true;
        $scope.DelProjectForm = false;
        $scope.AddProjectForm = false;
        $scope.projectForm = false;

      }

    };

    $log.log("Add Project controller");

     $scope.addProject = function(){
       $log.log("Adding Project");

       var token = AuthService.getToken();
  if($scope.pk!=="" && $scope.Title!== "" && $scope.Description && $scope.start_date!== ""){

       var data =
        {
          "title": $scope.Title,
          "description": $scope.Description,
          "start_date": $scope.start_date,
          "end_date": $scope.end_date,
          "is_billable": $scope.billable,
          "is_active": $scope.active,
          "task_set": [],
          "resource_set": []
        }

          $log.log("Add project payload", JSON.stringify(data));

         $http({
           method: 'post',
        //   url: '//projectservice.staging.tangentmicroservices.com/api/v1/projects/',
           url : '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/',
           data: data,
         }).then(function(response){

           if(response){
           $log.log("New project added");
           $log.log("Response", response);

          $scope.SuccessMessage = "Project has been created";

            ProjectService.setNewPk(response.data.pk);
            ProjectService.setProjName(response.data.title);
            ProjectService.setProjDesc(response.data.description);
            ProjectService.setNewProject(response.data);


            var project = ProjectService.getNewProject();
            $window.localStorage.Newproject = JSON.stringify(project);
          }

         }, function(response){

            var msg = "Authentication credentials were not provided.";
             $scope.addProjectError = msg;

         });
       }else {


             $scope.Required = "PK, Title, Description And Start Date Are Required";


       }
         //


     };  //end of add project ;




  }

  function ProjectDelCtrl($log, $scope, $rootScope, $cookieStore, $http, ProjectService){


        $scope.deleteProject = function(){


          if($scope.pk!=="" || $scope.pk!== "undefined"){

            var pk = $scope.pk;
            var data = {
              "pk": $scope.pk,
            };

            ProjectService.deleteProject($scope.pk, data).
            then(function(response){
              if(response){
                $log.log("Project Deleted Successfully");
                $log.log(response);
                $scope.SuccessMessage = "Project Deleted Successfully";
              }else{
                $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";
              }
            }, function(response){
                $log.log("failed", response);
                $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";

            });

          }else {

              $scope.Required = "Project Primary Key (PK) is Required";
          }

        };



  }

  function ProjectEditCtrl($log, $scope, $rootScope, $cookieStore, $http, ProjectService){


    var createdProject = ProjectService.getNewProject();
    $log.log("Project Created", createdProject);

    if(createdProject){



    };


    $scope.projectEdit = function(){


      if($scope.pk!=="" && $scope.Title!== "" && $scope.Description && $scope.start_date!== ""){

        var pk = $scope.pk;
        var data = {
          "pk": $scope.pk,
          "title": $scope.Title,
          "description": $scope.Description,
          "start_date": $scope.start_date,
          "end_date": $scope.end_date,
          "is_billable": $scope.billable,
          "is_active": $scope.active,
        };

        ProjectService.editProject($scope.pk, data).
        then(function(response){
          if(response){
            $log.log("Project Changed Successfully");
            $log.log(response);
            $scope.SuccessMessage = "Project Changed Successfully";
          }else{
            $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";
          }
        }, function(response){
            $log.log("failed", response);
            $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";

        });

      }else {

          $scope.Required = "PK, Title, Description And Start Date Are Required";
      }

    }; // edit project controller

  }

  function ViewProjectsCtrl($log, $scope, $rootScope, $cookieStore, $http, ProjectService){


    $scope.viewProjects = function(){


    }; // view project controller

  }





})();
