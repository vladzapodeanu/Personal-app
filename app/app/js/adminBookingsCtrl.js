var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('adminBookingsCtrl', function ($scope, $http, $localStorage, $sessionStorage) {
    $http.get('/api/adminBookings').then(function (data) {
        $scope.adminBook = data.data;
    });

    $scope.logout = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }

    $scope.deleteProfile = function (bookId) {
            $http({
                method: 'DELETE',
                url: '/api/adminBookings/delete/' + bookId,
                data: {
                    'data': $scope.data,
                    'id_user': $scope.id_user,
                    'from_address': $scope.autocompletePickUp,
                    'to_address': $scope.autocompleteDestination,
                    'price': $scope.priceH
                }
            }).then(function successCallback(response) {
                window.alert('booking cancelled!');
            }, function errorCallback(response) {
                console.log("error");
                window.alert("Eroare");
        });
    }

});