angular.module('swanContent',[])
.controller('contentlist',function($scope,$http){
	$scope.$watch("swan", function(){
	$http.get($scope.swan.root_url+"swan/api/swan_contents/")
    .success(function (response) {
		//alert(response.data);
		console.log(JSON.stringify(response));
		$scope.swanContent = response.data;
	});
	});
	//edit
	$scope.editContent=function(id){
		window.location.href=$scope.swan.root_url+"swan/swan_content_edit/"+id;
		return false;
	};
	//addnew
	$scope.addNew=function(){
		bootbox.prompt("Enter Your New Content Name", function(result) {                
		  if (result === null) {                                             
			return true;
		  } else {
			  $.ajax({
				  url:$scope.swan.root_url+'swan/swan_content_addnew/',
				  data:{"content_name":result},
				  method:"POST"
			  }).done(function(){
				  location.reload();
			  });
		  }//if
		});
	};
	//del
	$scope.delContent=function(id){
		bootbox.confirm("Are you sure?", function(result) {
		if(result){
			$.ajax({
				  url:$scope.swan.root_url+'swan/swan_content_del/',
				  data:{"id":id},
				  method:"POST"
			}).done(function(){
				location.reload();
			}); 
		}
		}); 
	};
});