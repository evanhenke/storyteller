(function(){
    var app = angular.module("storyteller",["ngRoute"]);
    
    app.config(function($routeProvider,$locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/home",{
                templateUrl:"views/home.html",
                controller: "HomeController"
            })
            .when("/login",{
                templateUrl:"views/login.html",
                controller:"LoginController"
            })
            .when("/reader",{
                templateUrl:"views/reader.html",
                controller:"ReaderController"
            })
            .when("/writer",{
                templateUrl:"views/writer.html",
                controller:"WriterController"
            })
            .otherwise({redirectTo:"/home"});
    });
}());