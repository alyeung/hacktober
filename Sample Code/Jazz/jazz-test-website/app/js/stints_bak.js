var app = angular.module("myapp", []);
app.controller("ListController", ['$scope', function($scope) {
  /*  $scope.personalDetails = [
        {
            'stint_title':'Stint 1',
            'desc':'Desc 1',
            'author':'user1@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 2',
            'desc':'Desc 2',
            'author':'user2@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 2',
            'desc':'Desc 2',
            'author':'user2@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 2',
            'desc':'Desc 2',
            'author':'user2@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 2',
            'desc':'Desc 2',
            'author':'user2@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 2',
            'desc':'Desc 2',
            'author':'user2@t-mobile.com',
            'status':'pending'            
        },
        {
            'stint_title':'Stint 3',
            'desc':'Desc 3',
            'author':'user3@t-mobile.com',
            'status':'pending'            
        }];*/
    
    
    $scope.stateToClass = function(){
    	   if ($scope.personalDetails.status === 'pending' || something.else === 'foo'){
    	      return "label label-success";
    	   } else {
    	      return "label label-danger";	
    	   }
    	}
    
    
        $scope.addNew = function(personalDetail){
            $scope.personalDetails.push({ 
                'fname': "", 
                'lname': "",
                'email': "",
            });
        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails = newDataList;
        };
    
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    
    
    
}]);