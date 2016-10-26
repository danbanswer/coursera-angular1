(function(){

'use strict';

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    this.buyList = function() {
      return ShoppingListCheckOffService.toBuyList;
    }

    this.buy = function(index) {
      ShoppingListCheckOffService.buy(index);
    }

  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;

    this.boughtList = function() {
      return ShoppingListCheckOffService.boughtList;
    }

  }

  function ShoppingListCheckOffService() {
    this.toBuyList = [
      {name: "cookies", amount: "1 bag of"},
      {name: "apples", amount: "5"},
      {name: "oranges", amount: "7"},
      {name: "grapes", amount: "1 pound of"},
      {name: "pickles", amount: "3 cans of"},
      ];

      this.boughtList = [
      ];

      this.buy = function(index) {
        this.boughtList.push(this.toBuyList[index]);
        this.toBuyList.splice(index,1);
      }

  }


})();
