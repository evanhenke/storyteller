(function(){
    var app = angular.module("storyteller");
    
    var ReaderController = function($scope){
        $scope.placeholder = "Reader placeholder text";
    };
    
    app.controller("ReaderController",ReaderController);
}());