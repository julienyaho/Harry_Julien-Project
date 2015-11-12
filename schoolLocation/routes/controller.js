/**
 * Created by wang on 2015/11/1.
 */

myApp.controller('myCtrl',['$scope','$http',function($scope,$http){

    console.log("Hi, Schools from Controller");

    var refresh = function(){
        $http.get('/').success(function(response){
            console.log("I got the data I requested");
         //   $scope. = response; //display data to the browser
          //  title="---------"            ;

        });

    };




   // refresh();

    $scope.primary = function(){
        $http.get('/primary', $scope.primaryschool).success(function(data){
            $scope.primaryschool=data;
            console.log(data);
            refresh();
        });
    };

    $scope.secondary = function(){
        console.log(response);
        $http.get('/secondary', $scope.sec).success(function(data){
            $scope.sec=data;
            console.log(data);
          // refresh();
        });
    };


}]);


