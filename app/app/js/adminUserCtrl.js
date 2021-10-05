var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('adminUserCtrl', function ($scope, $http, $localStorage, $sessionStorage) {
    $http.get('/api/adminUser').then(function (data) {
        $scope.adminUser = data.data;
    });

    $scope.logout = function() {
        window.location.assign("http://localhost:3000/Login.html");
    }

    

    $scope.deleteProfile = function (userId) {
            $http({
                method: 'DELETE',
                url: '/api/adminUser/delete/' + userId,
                data: {
                    'name': $scope.name,
                    'email': $scope.emailP,
                    'password': $scope.password,
                    'address': $scope.address,
                    'phone_number': $scope.phoneNumber
                }
            }).then(function successCallback(response) {
                window.alert('User sters!');
            }, function errorCallback(response) {
                console.log("error");
                window.alert("Eroare");
        });
    }

    $scope.editUser = function(userId) {
        localStorage.setItem("user_id",userId),
        window.location.assign("http://localhost:3000/AdminEdit.html");
    }
});