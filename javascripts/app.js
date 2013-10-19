

'use strict';

angular.module('qCalcApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'angular-raven'
]).

config(function(
    $routeProvider
){
    $routeProvider.

    when('/', {
        templateUrl: 'views/main.html',
        controller: 'ListCtrl'
    }).

    when('/card/:id', {
        templateUrl: 'views/card.html',
        controller: 'CardCtrl'
    }).

    otherwise({
        redirectTo: '/'
    });
});


