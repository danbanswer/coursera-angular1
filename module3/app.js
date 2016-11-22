(function(){

'use strict';

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItemsDirective);

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var vm = this;
    vm.searchTerm = "";
    vm.found = {};

    vm.NarrowItDown = function() {
      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(this.searchTerm);
      foundItemsPromise.then( function(response){
        vm.found = response;
      })
    }

    vm.onRemove = function(itemIndex) {
      vm.found.splice(itemIndex,1);
    }
  }


  MenuSearchService.$inject = ["$q", "$http"];
  function MenuSearchService($q, $http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        var foundItems = [];
        var deferred = $q.defer();

        if (searchTerm) {
          $http({url: "https://davids-restaurant.herokuapp.com/menu_items.json"}).
          then(function (result) {
            // process result and only keep items that match
            if (result && result.data && result.data.menu_items) {
              angular.forEach(result.data.menu_items, function(item) {
                if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
                  foundItems.push(item);
                  //console.log("adding item = " + JSON.stringify(item));
                }
              });
              deferred.resolve(foundItems);
            }
            else {
              deferred.reject("$http returned invalid data");
            }
            // return processed items
            return foundItems;
          },
          function(result) {
            deferred.reject("$http failed with message: " + result);
          });
        }
        else {
          deferred.resolve(foundItems);
        }

        return deferred.promise;
      }
  }


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }


})();
