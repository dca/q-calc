
'use strict';

angular.module('qCalcApp').

controller('ListCtrl', function(
    $scope,
    Card
){
    $scope.level = 120.0;
    $scope.isHideStart = true;
    $scope.infs = Card.infs;

    Card.retrieve('findAllCards').$promise.then(function(data) {
        $scope.pets = data;
        Card.calcAll($scope.pets, $scope.level);
    });

    $scope.changeLevel = function () {
        Card.calcAll($scope.pets, $scope.level);
    }

});
