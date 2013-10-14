'use strict';

angular.module('qCalcApp').

factory('Card', function(
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
                    var Card = $resource('/data/card/:index.json', {index:'@id'});
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
        }
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

