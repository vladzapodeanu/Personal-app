var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('bookingsCtrl', function ($scope, $http, $localStorage, $sessionStorage) {
    $http.get('/api/booking/' + $sessionStorage.valueId).then(function (data) {
        $scope.bookings = data.data;
    });

    $scope.logOut = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }
});