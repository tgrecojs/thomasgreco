var form = angular.module('form.config', [])

form.factory('Users', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/users');
        },
        create: function(userData) {
            return $http.post('/api/users', userData);
        },
        delete: function(id) {
            return $http.delete('/api/users/' + id);
        }
    };
}]);
form.controller('MongooseController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
    

    formData = {};
    $scope.createUser = function() {
        if ($scope.formData != undefined) {
            Users.create($scope.formData)

            .success(function(data) { 
                $scope.users = data;
                $scope.formData = {}; 
                $scope.myForm.$setPristine(true);
       
            });

        }
    };
}]);
