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




          console.log("Search was invoked");
          var url = $scope.hasOwnProperty('ObjectUrl') ? $scope.ObjectUrl : null;
          console.log(url)
          PeopleService.getListOfPeople(url).then(function(response){
              console.log(response);

              $scope.search_Object=response.data;


              $scope.search_list = response.data.results;

              $scope.search_list.forEach(function (data,index) {
                  //console.log("data",data.species[0])
                  PeopleService.getSpecies(data.species[0]).then(function (response) {
                      //console.log("species",response)
                      $scope.search_list[index].items = response;
                  })
              })

              $scope.search_list.forEach(function (data,index) {
                  //console.log("data",data.homeworld)
                  PeopleService.getHomeWorld(data.homeworld).then(function (response) {
                      //console.log("species",response)
                      $scope.search_list[index].homeWorldItems = response;
                  })
              })

              $scope.search_list.forEach(function (data,index) {
                  console.log("data",data.starships[0])
                  if(data.starships[0] !== undefined)
                      PeopleService.getStarship(data.starships[0]).then(function (response) {
                          //console.log("species",response)
                          $scope.search_list[index].starshipItems = response;
                      })
              })

              //console.log("Results",$scope.request_list)

          },function(error){
              console.log(error);
          })

      $scope.listOfPeopleHandler = function () {
          var url = $scope.hasOwnProperty('ObjectUrl') ? $scope.ObjectUrl : null;
          console.log(url)
          PeopleService.getListOfPeople(url).then(function(response){
              console.log(response);

              $scope.search_Object=response.data;


              $scope.search_list = response.data.results;

              $scope.search_list.forEach(function (data,index) {
                  //console.log("data",data.species[0])
                  PeopleService.getSpecies(data.species[0]).then(function (response) {
                      //console.log("species",response)
                      $scope.search_list[index].items = response;
                  })
              })

              $scope.search_list.forEach(function (data,index) {
                  //console.log("data",data.homeworld)
                  PeopleService.getHomeWorld(data.homeworld).then(function (response) {
                      //console.log("species",response)
                      $scope.search_list[index].homeWorldItems = response;
                  })
              })

              $scope.search_list.forEach(function (data,index) {
                  console.log("data",data.starships[0])
                  if(data.starships[0] !== undefined)
                      PeopleService.getStarship(data.starships[0]).then(function (response) {
                          //console.log("species",response)
                          $scope.search_list[index].starshipItems = response;
                      })
              })

              //console.log("Results",$scope.request_list)

          },function(error){
              console.log(error);
          })
      }

      $scope.handleNextListOfPoeple = function () {
          $scope.ObjectUrl =$scope.search_Object.next;
          console.log("Next",$scope.search_Object)
          $scope.listOfPeopleHandler();

      };

      $scope.handlePreviousListOfPoeple = function () {
          $scope.ObjectUrl = $scope.search_Object.previous;
          console.log("previous",$scope.search_Object)
          $scope.listOfPeopleHandler();
      };


      // }
  }

  function MapController($log, $scope, $rootScope, $cookieStore, $http, PeopleService, $window,$timeout,NgMap){
      console.log('Map view invoked');

      NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
      });


      // $scope.map;
      // $scope.markers = [];
      // $scope.markerId = 1;
      //
      // //Map initialization
      // $timeout(function(){
      //
      //     var latlng = new google.maps.LatLng(35.7042995, 139.7597564);
      //     var myOptions = {
      //         zoom: 8,
      //         center: latlng,
      //         mapTypeId: google.maps.MapTypeId.ROADMAP
      //     };
      //     $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
      //     $scope.overlay = new google.maps.OverlayView();
      //     $scope.overlay.draw = function() {}; // empty function required
      //     $scope.overlay.setMap($scope.map);
      //     $scope.element = document.getElementById('map_canvas');
      //     $scope.hammertime = Hammer($scope.element).on("hold", function(event) {
      //         $scope.addOnClick(event);
      //     });
      //
      // },100);

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
