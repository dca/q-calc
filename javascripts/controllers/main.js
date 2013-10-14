
'use strict';

angular.module('qCalcApp').

controller('ListCtrl', function(
    $scope,
    Data
){
    $scope.level = 120.0;
    $scope.isHideStart = true;

    var Cards = Data.retrieve('findAllCards');

    Cards.$promise.then(function(data) {
        $scope.pets = data;
        reCalcAll($scope.pets, $scope.level);
    });

    $scope.changeLevel = function () {
        reCalcAll($scope.pets, $scope.level);
    }

    function reCalcOne (pet, level) {
        pet.dest = {};
        pet.dest.vit = ( pet.vit + pet.inc.vit * (level-1) );
        pet.dest.str = ( pet.str + pet.inc.str * (level-1) );
        pet.dest.mag = ( pet.mag + pet.inc.mag * (level-1) );
        pet.dest.agi = ( pet.agi + pet.inc.agi * (level-1) );
        pet.dest.def = ( pet.def + pet.inc.def * (level-1) );

        pet.atk     = ( pet.dest.str + Math.max( pet.dest.mag, pet.dest.agi ) );
        pet.surv    = ( pet.dest.vit + pet.dest.def );
        pet.total   = ( pet.atk + pet.surv );
        return pet;
    }

    function reCalcAll (pets, level) {
        angular.forEach( pets, function(value, key){
            reCalcOne(value, level);
        });
    }

    // var c = Data.retrieve('findCard', 30);
    // c.$promise.then(function(data) {
    //     console.log(data);
    // });

});
