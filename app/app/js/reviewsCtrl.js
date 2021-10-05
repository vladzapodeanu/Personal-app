var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('reviewsCtrl', function ($scope, $http, $localStorage, $sessionStorage) {
    $http.get('/api/reviews/').then(function (data) {
        $scope.reviews = data.data;
    });


    $scope.createReview = function () {

        var user_id = $sessionStorage.valueId;
        
        $http({
            method: 'POST',
            url: '/api/reviews/create',
            data: {
                'review': $scope.reviewtxt,
                'id_user': user_id
            }
        }).then(function successCallback(response) {
            window.alert('Va multumim!');


        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.logOut = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }
});