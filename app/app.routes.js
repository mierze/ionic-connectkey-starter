///<reference path="../typings/tsd.d.ts" />
angular.module('app').config(
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //    $ionicConfigProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'pages/home.html',
            controller: HomeController,
            controllerAs: 'home'
        });
    });
