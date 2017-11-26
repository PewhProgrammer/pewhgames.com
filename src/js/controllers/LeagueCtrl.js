/**
 * Created by Thinh-Laptop on 26.11.2017.
 */

// public/js/controllers/LeagueCtrl.js
angular.module('LeagueCtrl', []).controller('LeagueController', function($scope,$http, Nerd) {

    $scope.tagline = 'Controller is ready!';

    $('#getRecentGames').on('click',function(){
         Nerd.get().then(function(response){
            $scope.tagline = response.data;
        });
    });
});

