/**
 * Created by Thinh-Laptop on 24.11.2017.
 */

// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    // home page
        .when('/profile', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/work', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })
        .when('/league', {
            templateUrl: 'views/stats.html',
            controller: 'LeagueController'
        })
        ;
        //.otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode(true);

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);

