(function(){
    var app = angular.module("storyteller");
    
    var IndexController = function($scope,$location){
        
        $scope.navigateToHome = function(){
            $location.path("/home");
        };
        
        $scope.navigateToSignIn = function(){
            $location.path("/login");
        };
    };
    
    app.controller("IndexController",IndexController);
    
}());