'use strict';

angular.module('qCalcApp').

factory('Card', function(
    $q,
    $http,
    $resource
){
    var self = this;
    var infs = [
        {type: 'vit', name: '血量'},
        {type: 'str', name: '攻擊'},
        {type: 'mag', name: '內力'},
        {type: 'agi', name: '身法'},
        {type: 'def', name: '防禦'},
    ];

    var calc = function (Card, level) {
        Card.dest = {};
        infs.forEach(function(inf) {
            Card.dest[inf.type] = ( Card[inf.type] + Card.inc[inf.type] * (level-1) ) +0;
        });

        Card.atk     = ( Card.dest.str + Math.max( Card.dest.mag, Card.dest.agi ) );
        Card.surv    = ( Card.dest.vit + Card.dest.def );
        Card.total   = ( Card.atk + Card.surv );
        return Card;
    }

    function calcAll (pets, level) {
        angular.forEach( pets, function(value, key){
            calc(value, level);
        });
    }

    return {
        retrieve: function(name, args) {
            var _result = [],
                _deferred = $q.defer();

            _result.$promise = _deferred.promise;

            switch (name) {
                case 'findAllCards':
                    $q.all([
                        $resource('./data/cards.json').query().$promise,
                    ]).then(function(response) {
                        // console.log('message', response);
                        _result = response[0];
                        _deferred.resolve(_result);
                    });

                    break;
                case 'findCard':
                    var id = args.id || args;
                    var Card = $resource('./data/card/:index.json', {index:'@id'});
                    var card = Card.get({index: id }, function(u) {
                        _result = u;
                        _deferred.resolve(_result);
                    });
                    break;
            }

            return _result;
        },
        findAll: function() {
            var _result = [],
                _deferred = $q.defer();

            _result.$promise = _deferred.promise;

            $http.get('./data/cards.json').success(function(cards) {
                angular.forEach(cards, function(region) {
                    _result.push(region);
                });
                _deferred.resolve(_result);
            });

            return _result;
        },
        calc : calc,
        calcAll : calcAll,
        infs : infs
    };
}).

factory('Destiny', function(
    $q,
    $http,
    $resource
){
    return {
        retrieve: function(name, args) {
            var _result = [],
                _deferred = $q.defer();

            _result.$promise = _deferred.promise;

            switch (name) {
                case 'findAll':
                    $resource('./data/destinies.json').query().$promise.then(function(response) {

                        _deferred.resolve(_result);
                    });
                    break;
            }

            return _result;
        }
    };
});

