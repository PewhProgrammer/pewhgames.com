/**
 * Created by Thinh-Laptop on 24.11.2017.
 */

// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {


        return {
            get: function () {
                return $http.get('/api/nerds');
            },
            create: function (todoData) {
                return $http.post('/api/nerds', todoData);
            },
            delete: function (id) {
                return $http.delete('/api/nerds/' + id);
            },
            getWasabiGames: function(id){
                return $http.get('/api/matches/'+id);
            }
        }

}]);

