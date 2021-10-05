var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('adminCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {

    $scope.logIn = function () {
        $http({
            method: 'GET',
            url: '/api/admin/' + $scope.email.text
        }).then(function successCallback(response) {
            if (angular.isUndefined(response.data[0])) {
                alert("Nume admin incorect!");
            } else {
                if (response.data[0].password === $scope.password.text) {
                    $sessionStorage.name = $scope.email.text;
                    window.location.assign("http://localhost:3000/AdminMain.html");
                } else {
                    alert("Parola Gresita!");
                }
            }
        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.selUsers = function() {
        window.location.assign("http://localhost:3000/Admin.html");
    }

    $scope.selBookings = function() {
        window.location.assign("http://localhost:3000/AdminBookings.html");
    }

}]);