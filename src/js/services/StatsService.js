/**
 * Created by Thinh-Laptop on 26.11.2017.
 */

/**
 * Created by Thinh-Laptop on 24.11.2017.
 */

// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds. Only this will work until now
        get : function() {
            return $http.get('/api/nerds');
        },

        // these will work when more API routes are defined on the Node side of things
        // see https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }

}]);

