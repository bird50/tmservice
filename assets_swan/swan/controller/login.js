angular.module('swanLoginModules',[])
.controller('logincontroller',function($scope,$http){
	$scope.login_submit=function(){
		//alert('asdf');
		$.ajax({
			url:$scope.swan.root_url+'swan/api/login/',
			data:{
				"username":$scope.username,
				"passwd":$scope.passwd
		//		"csrf_test_name":$scope.csrf_test_name,
				}
		}).success(function(data){
			if(!data.status){
				bootbox.alert('can\'t login');
			//	window.location='admin.html';
				//bootbox.dialog({title:"login",message:"Loged in"});
				
			}else{
				bootbox.dialog({title:"login",message:"Loge in Successful!!!"});
				window.location='admin.html';
			}
			//
		});
	}; //login_submit
	
	$scope.test=function(){
		alert($scope.swan.root_url);
	};
	
})
.controller('register',function($scope,$http){
	$scope.register_user=function(){
		$.ajax({
			url:$scope.swan.root_url+'swan/api/user/',
		//{
			data:{
				/*
				$username = 'benedmunds';
						$password = '12345678';
						$email = 'ben.edmunds@gmail.com';
						$additional_data = array(
												'first_name' => 'Ben',
												'last_name' => 'Edmunds',
												);
						$group = array('1'); // Sets user to admin. No need for array('1', '2') as user is always set to member by default

						$this->ion_auth->register($username, $password, $email, $additional_data, $group)
				*/
			
				username:$scope.username,
				password:$scope.password,
				email:$scope.email,
				additional_data:$scope.userinfo,
				group:$scope.group,
				"csrf_test_name":$scope.csrf_test_name,
			},method:'POST',type:'POST',
		}).success(function(data){
			console.log('kkk');
		});
	};
});