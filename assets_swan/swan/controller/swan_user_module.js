
angular.module('swanUserModule',[])
.controller('swanUserController',function($scope,$http){
    /* exam
    var request = $http({
        method: "post",
        url: "{{root_url}}swan/api/users/",
        data: {
            first_name: $scope.first_name,
			last_name: $scope.last_name,
			tel: $scope.tel,
			TruckNo: $scope.TruckNo,
            TruckPV: $scope.TruckPV
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
	*/
   
    $scope.$watch("swan", function(){
		//alert($scope.swan.root_url);
		$http.get($scope.swan.root_url+"swan/api/users/")
	    .success(function (response) {
			//alert(response.data);
			console.log(JSON.stringify(response));
			$scope.users = response.data;
		});
    });
	
	
	$scope.addNewUser=function(){
		
	}; //addNewUser
	
	$scope.delUser=function(user){
		bootbox.confirm("Are you sure delete user "+user+"?", function(result) {
			if(result){
				$http.delete("{{root_url}}swan/api/user/",{'data':{username:user}})
			    .success(function (response) {
					//alert(response.data);
					console.log(JSON.stringify(response));
					$scope.msg = response.msg;
					//$scope.users[username]['msg']=response.msg;
				});
			}
		}); 
	};
	
	
});
