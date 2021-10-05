
var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('eventsCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
    $scope.autocompletePickUp = {};
    $scope.emailPAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $scope.phonenumber = /^\+?\d{4}[- ]?\d{3}[- ]?\d{3}$/;
    $scope.email={};
     

    $scope.admin = function() {
        window.location.assign("http://localhost:3000/AdminLogIn.html");
    }

    $scope.register = function() {
        window.location.assign("http://localhost:3000/Register.html");
    }

    $scope.back = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }
    

    $scope.saveAcc = function() {
        $http({
            method: 'POST',
            url: '/api/user/create',
            data: {
                'name': $scope.name,
                'email': $scope.emailP,
                'password': $scope.password,
                'address': $scope.address,
                'phone_number': $scope.phoneNumber
            }
        }).then(function successCallback(response) {
            window.alert('Inregistrare reusita!');
            
        }, function errorCallback(response) {
            console.log("error");
            window.alert('Este necesara completarea tuturor campurilor!!');
        });
    }

    $scope.logIn = function () {
        $http({
            method: 'POST',
            url: '/api/userEmail/' + $scope.email.text,
            data: {
                'password': $scope.password.text,
            }
        }).then(function successCallback(response) {
            $sessionStorage.valueEmail = $scope.email.text;
            $sessionStorage.valueId = response.data[0].id_user;
            $sessionStorage.name = response.data[0].name;
            $sessionStorage.phone_number = response.data[0].phone_number;
            window.location.assign("http://localhost:3000/Main.html");
        }, function errorCallback(response) {
            alert("Email sau parola invalida!");
        });
    }

    $scope.initMyProfile = function () {

        var user_id = $sessionStorage.valueId;

        $http({
            method: 'GET',
            url: '/api/user/' + user_id
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
        var user_id = $sessionStorage.valueId;

        $http({
            method: 'PUT',
            url: '/api/user/' + user_id,
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
        });
    }

    $scope.createBooking = function () {

        var user_id = $sessionStorage.valueId;
        console.log(autocompletePickUpName);
        console.log(autocompleteDestinationName);
        console.log(user_id);
        console.log(price);
        console.log(distance);
        console.log($scope.selectCard);
        console.log($scope.passengerNumber);

        $http({
            method: 'POST',
            url: '/api/booking/create',
            data: {
                'id_user': user_id,
                'from_address': autocompletePickUpName,
                'to_address': autocompleteDestinationName,
                'distance': total,
                'price': total*1.3,
                'payment_method': $scope.selectCard,
                'passenger': $scope.passengerNumber
            }
        }).then(function successCallback(response) {
            window.alert('Booking înregistrat cu succes! Va multumim!');


        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.logOut = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }

}]);

