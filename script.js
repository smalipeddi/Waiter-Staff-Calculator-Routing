angular.module('MyAPP',['ngRoute'])
.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function() {
		$location.path('/');
	});
}).service('sharedProperties', function () {
	var _mealDetails = {};
	var _cutomerCharges = {};
	var _waiterEarnings = {};

	var _mealDetails = {
		basePrice : 0,
		taxRate : 0,
		tipPercent : 0,
		mealCount : 0
	};
	var _cutomerCharges = {
		subTotal : 0,
		waiterTip :0
	};
	var _waiterEarnings = {
		tipCount : 0,
	};

	this.mealDetails = _mealDetails;
	this.cutomerCharges = _cutomerCharges;
	this.waiterEarnings =_waiterEarnings;
	
}).config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'home.html',
		controller:'HomeCtrl'
	}).when('/new-meal',{
		templateUrl:'newmeal.html',
		controller:'NewMealCtrl'
	}).when('/my-earnings',{
		templateUrl:'myearnings.html',
		controller:'MyEarningsCtrl'
	});
}).controller('HomeCtrl',function($scope,sharedProperties){
	$scope.name ="sunitha"
	$scope.md = sharedProperties.mealDetails;
}).controller('NewMealCtrl',function($scope, sharedProperties){
	$scope.MealDetails = sharedProperties.mealDetails;
	$scope.CutomerCharges = sharedProperties.cutomerCharges;
	$scope.WaiterEarnings = sharedProperties.waiterEarnings;
	$scope.MealDetails.basePrice = sharedProperties.mealDetails.basePrice;
	$scope.MealDetails.taxRate = sharedProperties.mealDetails.taxRate;
	$scope.MealDetails.tipPercent = sharedProperties.mealDetails.tipPercent;
	$scope.MealDetails.mealCount = sharedProperties.mealDetails.mealCount;
	var originMealDetailsForm = angular.copy($scope.MealDetails);
	var origincutomerChargesForm = angular.copy($scope.CutomerCharges);
	var originWaiterEarningsForm = angular.copy($scope.WaiterEarnings);

	$scope.submit = function() {
		if ($scope.myForm.$valid) {
			$scope.CutomerCharges.subTotal = $scope.MealDetails.basePrice + (($scope.MealDetails.taxRate / 100) * $scope.MealDetails.basePrice);
			$scope.CutomerCharges.waiterTip = ($scope.CutomerCharges.subTotal * ($scope.MealDetails.tipPercent) / 100);
			sharedProperties.cutomerCharges.subTotal  = $scope.CutomerCharges.subTotal;
			sharedProperties.cutomerCharges.waiterTip  = $scope.CutomerCharges.waiterTip;
			$scope.CutomerCharges.total = $scope.CutomerCharges.subTotal + $scope.CutomerCharges.waiterTip;
			$scope.MealDetails.mealCount = sharedProperties.mealDetails.mealCount + 1 ;
			sharedProperties.mealDetails.mealCount = $scope.MealDetails.mealCount;
			$scope.WaiterEarnings.tipCount = $scope.WaiterEarnings.tipCount + $scope.CutomerCharges.waiterTip;
			sharedProperties.waiterEarnings.tipCount = $scope.WaiterEarnings.tipCount;
			$scope.WaiterEarnings.AverageTip = $scope.WaiterEarnings.tipCount / $scope.MealDetails.mealCount;
		}        

	}

}).controller('MyEarningsCtrl',function($scope, sharedProperties){

	$scope.WaiterEarnings = sharedProperties.waiterEarnings;
	$scope.WaiterEarnings.tipCount = sharedProperties.waiterEarnings.tipCount;
	$scope.WaiterEarnings.mealCount = sharedProperties.mealDetails.mealCount;
    $scope.MealDetails = sharedProperties.mealDetails;
    $scope.CutomerCharges = sharedProperties.cutomerCharges;

	$scope.reset = function(sharedProperties){
        
        $scope.WaiterEarnings.MealDetails = 0;
        $scope.MealDetails.basePrice = 0;
        $scope.MealDetails.taxRate = 0;
        $scope.MealDetails.mealCount = 0;
        $scope.MealDetails.tipCount = 0;
        $scope.MealDetails.tipPercent = 0;
        $scope.CutomerCharges.subTotal = 0;
        $scope.CutomerCharges.waiterTip = 0;
        $scope.WaiterEarnings.tipCount = 0;
        $scope.WaiterEarnings.AverageTip = 0;
        $scope.CutomerCharges.AverageTip = 0; 
        $scope.WaiterEarnings.mealCount = 0;
        $scope.CutomerCharges.total = 0;



        console.log($scope.WaiterEarnings.MealDetails);
        console.log($scope.MealDetails.mealCount);
        console.log($scope.MealDetails.tipCount);
        console.log($scope.MealDetails.tipPercent);

        /*sharedProperties.MealDetails = ;{};
        sharedProperties.CutomerCharges = 0;*/


	}

});

