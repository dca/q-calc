
'use strict';

angular.module('qCalcApp').

controller('CardCtrl', function(
    $scope,
    $routeParams,
    Card
){
    $scope.level = 100;

    var params = $routeParams;

    Card.retrieve('findCard', params.id).$promise.then(function(data) {
        $scope.card = data;

        Card.calc($scope.card , $scope.level);
    });

    $scope.changeLevel = function () {
        Card.calc($scope.card, $scope.level);
    }

});
