///<reference path="../typings/tsd.d.ts" />
angular.module('app').config(
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //    $ionicConfigProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/404');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'pages/home/home.html',
            controller: HomeController,
            controllerAs: 'home'
        }).state('main', {
            url: '/main',
            templateUrl: 'pages/main/main.html',
            controller: MainController,
            controllerAs: 'main'
        }).state('404', {
            url: '/404',
            templateUrl: 'pages/404.html'
        });;
    });
