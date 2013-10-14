'use strict';

angular.module('qCalcApp').

factory('Data', function(
    $q,
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
        }
    };
});
