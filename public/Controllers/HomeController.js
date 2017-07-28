'use strict';

(function(){
    var app = angular.module("storyteller");
    
    var HomeController = function($scope,$location){
        $scope.title = "This is going to be an app";
        $scope.navigateToRead = function(){
            $location.path('/reader');
        };
        $scope.navigateToWrite = function(){
            $location.path('/writer');
        };
        $scope.useExp = function(){
            $location.path('/express');
        };
    };
    
    app.controller("HomeController",HomeController);
    
}());