"use strict";

angular.module('myApp', []);

angular.module('myApp').controller('MainController', ['$scope','$interval', function($scope, $interval){
	//setting up angular js
	console.log("Inside MainConroller");
	
	//using scope functions
	$scope.message = "Hello";
	$scope.sayHello = function(name) {
		return $scope.message + ' ' + name + '.';
	};

	//executing scope methods
	var items = ['item1', 'item2', 'item3', 'item4'];
	$scope.itemIndex = null;
	$scope.currentItem = '';
	$scope.getItem = function(){
		$scope.currentItem = items[$scope.itemIndex];
	};
	$interval(function(){
		$scope.itemIndex = Math.round(Math.random() * (items.length-1));
		$scope.getItem();
	},2000);

	//working with bracketed expressions
	$scope.randomValue = -999;
	$scope.scopeArr = ['one', 'two', 'three', 'four'];
	$scope.qty = 20;
	$scope.cost = 1.99;
	$scope.width = 100;

	$interval(function(){
		$scope.randomValue = Math.round(Math.random() * 1000000);
	},2000);
}]);

/* examining dot notation (solving scope hierarchy problem:
			change to parent scope name var will reflect in child scope name var. But if child scope name var is changed this binding will be broken and change to parent scope name var will not change the child scope name var. To solve this we store name var in scope object 'modelObj' instead of storing it in primitives.
		) 
*/
angular.module('myApp').controller('ParentController', ['$scope', function($scope){
	//$scope.name = 'John Smith';
	$scope.modelObj = {
		name : 'John Smith'
	};
}]);

angular.module('myApp').controller('ChildController', ['$scope', function($scope){
	
}]);

/* using same name scope var for a different controller */
angular.module('myApp').controller('AnotherController', ['$scope', function($scope){
	$scope.modelObj = {
		name : 'Michael Johnson'
	};
}]);

/* Sharing data between multiple controllers */
angular.module('myApp').service('SharedService', function(){
	return {name : 'Bill Johnson'};
});
angular.module('myApp').controller('FirstController', ['$scope', 'SharedService', function($scope, SharedService){
	$scope.modelObj = SharedService;
}]);
angular.module('myApp').controller('SecondController', ['$scope', 'SharedService', function($scope, SharedService){
	$scope.modelObj = SharedService;
}]);

/* Using Controller as syntax */
angular.module('myApp').controller('ControllerParent', [function(){
	this.message = 'Hello from parent';
}]);	
angular.module('myApp').controller('FirstChild', [function(){
	this.message = 'Hello from first child';
}]);
angular.module('myApp').controller('SecondChild', ['$interval','$scope',function($interval, $scope){
	this.message = 'Hello from second child';
	this.value = 1;

	$interval(function(){
		this.value = Math.round(Math.random() * 1000000) + 1;
	}.bind(this),2000);

	$scope.$watch('second.value', function(newValue, oldValue){
		console.log('New Value : ', newValue, 'Old Value : ', oldValue);
	});

}]);

/* Using Display Filters */
angular.module('myApp').controller('DisplayFilterSample', [function(){
	this.user = {
		firstName : 'John',
		lastName : 'Smith',
		accountType : 'CHECKING',
		balance : '1234.456'
	};
}]);