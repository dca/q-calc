
'use strict';

angular.module('qCalcApp').

controller('ListCtrl', function(
    $scope,
    $resource,
    $http
){
    $scope.level = 120.0;
    $scope.isHideStart = true;
    // $scope.pets = $resource('/data/data.json').query();

    $http.get('/data/data.json').success(function(data) {
        angular.forEach(data, function(value, key){
            reCalc(value, $scope.level);
        });

        $scope.pets = data;
    });

    function reCalc (pet, level) {
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

    $scope.changeLevel = function () {
        console.log('message');
        angular.forEach( $scope.pets, function(value, key){
            reCalc(value, $scope.level);
        });
    }


});
