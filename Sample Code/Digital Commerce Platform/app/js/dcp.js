var app = angular.module("myapp", ['ngRoute', 'ui.bootstrap']);

app.constant('env', {  
	proxyURL: 'https://api.t-mobile.com',
	clientID: 'hV6lfg3EBAiVX5EZjbpexLoLhGhuGiWR',
	creditLevel: 'GOOD',
	OAuthtoken: '6e27e6eb-b719-4e71-a6d3-1e1dad420de5',
	cartID:'mvrdizbtgvsdiljymeydcljugu4dsllbgvqwellbme2gmmzzmfrtayrwme=',
	lineID:'mrrwknrzmyzteljxhe4diljuhaydoljygy3dsllbmmytknzrgy2daobqmu=',
	qtny:0
	});

app.service('quantity', function () {      
	  this.Items = function() {
	    // if we want can get data from database 
	     quantity = 0;
	  };  
});
app.controller("ListController", ['$scope', '$http', 'env', 'quantity', '$modal','$httpParamSerializer', function($scope,$http,env,quantity,$modal,$httpParamSerializer) {   
	
	$scope.auth = function () {    	
			console.log("auth");			
			 $http.post(env.proxyURL+'/oauth/v1/access', $httpParamSerializer({'grant_type':'client_credentials','client_id':env.clientID}), {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
			 .then(function (response) {
				 	alert("Client Authorized");
				 	env.OAuthtoken=response.data.access_token;
				 }, function (response) {
				 $scope.msg = "Service not Exists";
				 $scope.statusval = response.status;
				 $scope.statustext = response.statusText;
				 $scope.headers = response.headers();			 			 
				 });
			 
		}
	$scope.getCart = function ()
	{
		console.log("cart");
		console.log(env.OAuthtoken);
		 $http.get(env.proxyURL+'/v1/carts?creditLevel=GOOD',{headers: {'Authorization':'Bearer '+env.OAuthtoken,'Content-Type': 'application/json'} }).
		    then(function(response) {		    		
		    	//alert("Cart Loaded successfully!!"); 
		    	var carts = JSON.parse(JSON.stringify(response.data));
		    	env.cartID=carts.cart.cartId;
		    	$scope.qtn=quantity.Items;
		    	//console.log("cartID:"+env.cartID);
		    	 var modalInstance = $modal.open({
			            templateUrl: 'Modal/modal.html',
			            controller: 'cartCtrl',
			            resolve: {
			            	carts: function() {
			                    return carts;
			                }
			            }
			        });
		    	 })		   
	}
	
	
	$scope.addLine = function (){
		console.log("Line");
		console.log(env.OAuthtoken);
		 $http.post(env.proxyURL+'/v1/carts/'+env.cartID+'/lineofservices?subType=HANDSET&creditLevel=GOOD', {
			 "subType":"HANDSET"
			}, {headers: {'Authorization':'Bearer '+env.OAuthtoken,'Content-Type': 'application/json'}})
		 .then(function (response) {
			 	alert("Line added Successfully");
			 	var lines = JSON.parse(JSON.stringify(response.data));
			 	env.lineID = lines.cart.lineOfServices[0].id
			 	//alert(env.lineID);
			 }, function (response) {
			 $scope.msg = "Service not Exists";
			 $scope.statusval = response.status;
			 $scope.statustext = response.statusText;
			 $scope.headers = response.headers();			 			 
			 });
	}
	
	$scope.addDevice = function (){
		console.log("device");
		console.log(env.OAuthtoken);
		 $http.post(env.proxyURL+'/v1/carts/'+env.cartID+'/lineofservices/'+env.lineID+'/device?creditLevel=GOOD', {
			  "sku":"190198047700",
			  "pricingOption": "",
			  "creditLevel":"GOOD"
			}, {headers: {'Authorization':'Bearer '+env.OAuthtoken,'Content-Type': 'application/json'}})
		 .then(function (response) {
			 	alert("Device added successfully!!");			 	
			 }, function (response) {
			 $scope.msg = "Service not Exists";
			 $scope.statusval = response.status;
			 $scope.statustext = response.statusText;
			 $scope.headers = response.headers();			 			 
			 });
	}
   }])
   
   app.controller('cartCtrl', ['$scope', '$http', 'env', 'quantity','$modalInstance','carts', function($scope, $http, env,quantity,$modalInstance, carts) {
	  // console.log("crtcart:"+carts.cart.cartId);
	   var lineqtn = 0 ;
	   var deviceqtn = 0;
	   $scope.carts = carts;
	   if(carts.cart.lineOfServices)
		   {
		   	if(carts.cart.lineOfServices[0])
		   		{
		   		if(carts.cart.lineOfServices[0].plan)
		   			{
		   			lineqtn = carts.cart.lineOfServices[0].plan.quantity;
		   			}
		   			if(carts.cart.lineOfServices[0].device)
		   			{
		   			deviceqtn = carts.cart.lineOfServices[0].device.quantity;
		   			}
		   			
		   		}
		   	
		   }
	   
		 var total =  lineqtn + deviceqtn;
		   
		 $scope.quantity= total;
	  
	   console.log("total:"+total );	   
	   $scope.cancel = function() {
		   $modalInstance.dismiss('cancel');
	   };
	   $scope.xClose = function() {
		   $modalInstance.dismiss();
	   };
 
}]);
