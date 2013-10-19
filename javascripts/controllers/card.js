
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

        reCalcOne($scope.card , $scope.level);
    });

    $scope.changeLevel = function () {
        reCalcOne($scope.card, $scope.level);
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

});
