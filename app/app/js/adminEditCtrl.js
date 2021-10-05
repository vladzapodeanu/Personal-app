var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('adminEditCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {

    $scope.emailPAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $scope.phonenumber = /^\+?\d{4}[- ]?\d{3}[- ]?\d{3}$/;
    $scope.email={};

    $scope.back = function() {
        window.location.assign("http://localhost:3000/Admin.html");
    }

    $scope.initMyProfile = function () {

        //var user_id = $sessionStorage.valueId;

        $http({
            method: 'GET',
            url: '/api/adminUser/edit/' + localStorage.getItem("user_id")
        }).then(function successCallback(response) {

            $scope.name = response.data[0].name;
            $scope.address = response.data[0].address;
            $scope.emailP = response.data[0].email;
            $scope.phoneNumber = response.data[0].phone_number;

        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.updateDetails = function () {

        var email = $sessionStorage.valueToShare;
        //var user_id = $sessionStorage.valueId;

        $http({
            method: 'PUT',
            url: '/api/adminUser/edit/' + localStorage.getItem("user_id"),
            data: {
                'address': $scope.address,
                'phoneNumber': $scope.phoneNumber,
                'name': $scope.name,
                'email': $scope.emailP
            }
        }).then(function successCallback(response) {
            $sessionStorage.valueToShare = $scope.emailP;
            console.log($sessionStorage.valueToShare);
            email = $sessionStorage.valueToShare;

            $scope.initMyProfile();

            
        }, function errorCallback(response) {
            console.log("error");
        }

        );
    }
}]);