(function(){
    var app = angular.module("storyteller");
    
    var WriterController = function($scope){
        $scope.placeholder = "Writer placeholder text";
    };
    
    app.controller("WriterController",WriterController);
}());