(function(){

'use strict';

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);
  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {

    $scope.dishes = "";
    $scope.msg = "";

    $scope.checkTooMuch = function() {
      if (!$scope.dishes) {
        $scope.msg = "Please enter data first";
      }
      else {
        $scope.msg = $scope.dishes.split(",").length <= 3 ? "Enjoy!" : "Too much!";
      }
    }

  }

})();
