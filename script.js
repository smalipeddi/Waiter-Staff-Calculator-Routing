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
	console.log($scope.MealDetails);
	$scope.CutomerCharges = sharedProperties.cutomerCharges;
	$scope.WaiterEarnings = sharedProperties.waiterEarnings;
	
	console.log("I AM HERE ---------------------------sunitha");
	console.log($scope.CutomerCharges);
	console.log($scope.WaiterEarnings);
	
	/*$scope.WaiterEarnings = sharedProperties.waiterEarnings;
	*/

	$scope.MealDetails.basePrice = sharedProperties.mealDetails.basePrice;
	$scope.MealDetails.taxRate = sharedProperties.mealDetails.taxRate;
	$scope.MealDetails.tipPercent = sharedProperties.mealDetails.tipPercent;
	$scope.MealDetails.mealCount = sharedProperties.mealDetails.mealCount;


    /*
    */
    $scope.originMealDetailsForm = angular.copy($scope.MealDetails);
    $scope.origincutomerChargesForm = angular.copy($scope.CutomerCharges);
    $scope.originWaiterEarningsForm = angular.copy($scope.WaiterEarnings);

    $scope.submit = function() {
    	if ($scope.myForm.$valid) {
    		console.log("hello kitty");
			/*$scope.MealDetails.basePrice = parseInt($scope.MealDetails.basePrice);
			$scope.MealDetails.taxRate = parseInt($scope.MealDetails.taxRate);
			$scope.MealDetails.tipPercent = parseInt($scope.MealDetails.tipPercent);
			*/

			$scope.CutomerCharges.subTotal = $scope.MealDetails.basePrice + (($scope.MealDetails.taxRate / 100) * $scope.MealDetails.basePrice);
			console.log("ANUJJJJJJJJJJJJJJJJJJ");
			console.log($scope.CutomerCharges.subTotal);

			$scope.CutomerCharges.waiterTip = ($scope.CutomerCharges.subTotal * ($scope.MealDetails.tipPercent) / 100);
			console.log($scope.CutomerCharges.waiterTip);
			
			sharedProperties.cutomerCharges.subTotal  = $scope.CutomerCharges.subTotal;
			sharedProperties.cutomerCharges.waiterTip  = $scope.CutomerCharges.waiterTip;
			console.log("IMPORTANT");
			console.log(sharedProperties.cutomerCharges.subTotal);
			console.log(sharedProperties.cutomerCharges.waiterTip);
			
			
			console.log("waiterTip =" + $scope.CutomerCharges.waiterTip);
			$scope.CutomerCharges.total = $scope.CutomerCharges.subTotal + $scope.CutomerCharges.waiterTip;
			console.log("customer total charges" + $scope.CutomerCharges.total);
			$scope.MealDetails.mealCount = sharedProperties.mealDetails.mealCount + 1 ;
			console.log("meal count " + $scope.MealDetails.mealCount);

			console.log("Am in new meal");
			console.log($scope.MealDetails.mealCount);

			sharedProperties.mealDetails.mealCount = $scope.MealDetails.mealCount;
			console.log(sharedProperties.mealDetails.mealCount);
			$scope.WaiterEarnings.tipCount = $scope.WaiterEarnings.tipCount + $scope.CutomerCharges.waiterTip;
			console.log($scope.WaiterEarnings.tipCount);
			sharedProperties.waiterEarnings.tipCount = $scope.WaiterEarnings.tipCount;
			$scope.WaiterEarnings.AverageTip = $scope.WaiterEarnings.tipCount / $scope.MealDetails.mealCount;
		}

        /*$scope.reset = function() {
            $scope.MealDetails = angular.copy($scope.originMealDetailsForm); // Assign clear state to modified form 
            $scope.CutomerCharges = angular.copy($scope.origincutomerChargesForm);
            $scope.WaiterEarnings = angular.copy($scope.originWaiterEarningsForm);
            $scope.myForm.$setPristine();
        }

        $scope.reset();*/

    }
}).controller('MyEarningsCtrl',function($scope, sharedProperties){

	$scope.WaiterEarnings = sharedProperties.waiterEarnings;
	
	//$scope.WaiterEarnings.mealCount = sharedProperties.mealDetails.mealCount;
   //console.log("Am in earnings");
   console.log(sharedProperties.waiterEarnings.tipCount);
   $scope.WaiterEarnings.tipCount = sharedProperties.waiterEarnings.tipCount;

   console.log("meal count " + sharedProperties.mealDetails.mealCount);

   $scope.WaiterEarnings.mealCount = sharedProperties.mealDetails.mealCount;
    /*$scope.WaiterEarnings.tipCount =  sharedProperties.waiterEarnings.tipCount;
	console.log("initial waiter earnning tip =" + $scope.WaiterEarnings.tipCount);
	console.log("customer waiter tip = " +  sharedProperties.cutomerCharges.waiterTip);
	$scope.WaiterEarnings.tipCount = sharedProperties.waiterEarnings.tipCount + sharedProperties.cutomerCharges.waiterTip;
	console.log($scope.WaiterEarnings.tipCount);*/
	//$scope.WaiterEarnings.AverageTip = $scope.WaiterEarnings.tipCount / sharedProperties.mealDetails.mealCount;
});

