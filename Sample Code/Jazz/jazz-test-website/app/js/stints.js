var app = angular.module("myapp", ['ngRoute', 'ui.bootstrap']);
app.controller("ListController", ['$scope', '$http', '$modal', function($scope,$http,$modal) {   
	$scope.addNew = function () {    	
		 $http.get('https://vedgwwprd3.execute-api.us-east-1.amazonaws.com/dev/ccoe/jazz-test').
		    then(function(response) {		    		
		    	//var stintData = JSON.stringify(response.data.input.ticker); 		    		    			    	
		    	//var finalData = response.data.input.ticker.substring(1, response.data.input.ticker.length-1); 
		    	var finalData = response.data.input.ticker;
		    	finalData = finalData.replace(/,(?=[^,]*$)/, '');	   	
		    	$scope.stickers = finalData.trim().split(',');
		    	console.log(finalData.trim());
		    	 $scope.IsVisible = true;
		    })
   }
	
	$scope.selectedItemChanged = function(){
		var selSticker = JSON.stringify({"sticker": $scope.selectedItem });
	    console.log("You selected number"+ $scope.selectedItem);
	    $http.post('https://vedgwwprd3.execute-api.us-east-1.amazonaws.com/dev/ccoe/jazz-test', selSticker, {headers: {'Content-Type': 'application/json'} })
		 .then(function (response) {
			 if(response.data.input.Name)
				 {
				 	$scope.stickerData =JSON.parse(JSON.stringify(response.data.input));
				 }			 	
			 	else
			 	{
			 		alert("Data not found. try later!!");
			 	}	 	 
			 }, function (response) {
			 $scope.msg = "Service not Exists";
			 $scope.statusval = response.status;
			 $scope.statustext = response.statusText;
			 $scope.headers = response.headers();			 			 
			 });
	  }
}]); 
    


