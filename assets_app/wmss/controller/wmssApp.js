angular.module('wmssApp', ['ui.bootstrap','ngTagsInput','swan'])
.controller('wmssController', function($scope,$swan) {
	//alert('asdf');
	var nunjucks_template_url=$swan.asset_url+'wmss/templates';
	nunjucks.configure(nunjucks_template_url,{ autoescape: true });	
	
	//alert('its me');
	
})
.controller('renderMenu', function($scope) {
	//alert('asdf');
	$scope.$watch("swan", function(){
		//alert('asdf');
		var nunjucks_template_url=$scope.swan.asset_url+'rio4plan/templates';
		nunjucks.configure(nunjucks_template_url,{ autoescape: true });
		//alert($scope.swan.template_path);
		var menu=nunjucks.render('header_menu.tpl', $scope.swan); 
		//alert(menu);
		$('#mainmenu').html(menu);
	});
})
.controller('mainPage', function($scope,$http,$filter,$sce) {
	//init variable
	$scope.sudo=['siratis.w@gmail.com','peerayut.a@gmail.com','rio4plan.com@gmail.com']; /////////Super Gmail
	$scope.g_value=0;
	$scope.$watch("swan", function(){
		//init vars
		$scope.youcanyet=[
			{"name":"แก้ไข Content","link":$scope.swan.root_url+"swan_admin/content_list.html","level":"admin","target":"_blank"},
			//{"name":"จัดการ Members","link":$scope.swan.root_url+"swan_admin/adminuser.html","level":"admin"},
			{"name":"จัดการ Resources","link":$scope.swan.root_url+"theresource/dialog.php","level":"admin"},
			//{"name":"admin tag","link":$scope.swan.root_url+"swan_admin/admin_tag.html","level":"admin"},
			//{"name":"select tag","link":$scope.swan.root_url+"swan_admin/select_tag.html","level":"member"},
			{"name":"จัดการ blog","link":$scope.swan.root_url+"blog/blog_list.tpl","level":"admin"},
			//{"name":"logout","link":"javascript:logout();return false;","level":"guest"},
		];
		
		//nunjucks Template
		var nunjucks_template_url=$scope.swan.asset_url+'rio4plan/templates';
		nunjucks.configure(nunjucks_template_url,{ autoescape: true });
		
		//init user
		$scope.swan.googleUser='';
		$scope.swan.islogin=false;
		if(localStorage.rio4plan_google_email){
			$scope.swan.googleUser=localStorage.rio4plan_google_email;
			$scope.swan.islogin=true;
			//$scope.isExpire(localStorage.rio4plan_google_start,localStorage.rio4plan_google_expiresIn);//ยังไม่ใช้
			$scope.swan.googleUserToken=localStorage.rio4plan_google_access_token;
			$scope.swan.googleUserType=localStorage.rio4plan_google_userType;
			//จัดการ user menu
			$scope.swan.youcan=[];
			for(i=0;i<=$scope.youcanyet.length-1;i++){
				//กรณี admin
				if($scope.sudo.indexOf($scope.swan.googleUser) != -1 && $scope.youcanyet[i].level=="admin"){
					$scope.swan.youcan.push($scope.youcanyet[i]);
				}
				if($scope.youcanyet[i].level=="guest"){
					$scope.swan.youcan.push($scope.youcanyet[i]);
				}
			}//for
		}
		
		////headline
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI('headline'))
	    .success(function (response) {$('#widget_headline').html(response.data.content);}
		);
		
		//dashboard
		var widget_dashboard=nunjucks.render('widget_dashboard.tpl', $scope.swan);
		$('#widget_dashboard').html(widget_dashboard);
		
		
		//boss
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI('boss'))
	    .success(function (response) {$('#widget_boss').html(response.data.content);}
		);
		
		//about
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI('about'))
	    .success(function (response) {$('#widget_about').html(response.data.content);}
		);
		
		//pbms widget
		//get pbms gauageconfig
		$http.get($scope.swan.root_url+'rio4plan/Api/gaugeConfig/')
		.then(function(response){
			$scope.gaugeConfig=response.data.data[0];
			$http.get($scope.gaugeConfig.api_pay)
			.success(function (response) {
				$scope.g_value=parseFloat(response.meta.pay_percent_all).toFixed(2);
				$('#gg1_label').html("สำนักงานชลประทานที่ 4");
				$scope.g = new JustGage({
				    id: "gauge",
				    value: $scope.g_value,
				    min: 0,
				    max: 100,
				    title: "สำนักงานชลประทานที่ 4",
				    label: "%เบิกจ่าย",
			        customSectors: [{
			          color : "#a65f26",
			          lo : 0,
			          hi : $scope.gaugeConfig.setup_red_value
			        },{
			          color : "#fddf15",
			          lo : $scope.gaugeConfig.setup_red_value,
			          hi : $scope.gaugeConfig.setup_yellow_value
			        }, {
			          color : "#7bdd07",
			          lo : $scope.gaugeConfig.setup_yellow_value,
			          hi : 100
			        }],
					textRenderer: format_gauge_num
				  });
			});
		});
		
		///***Blog recently
		//find date 15 days later
		var n=new Date();
		n.setDate(n.getDate()-15);
		$scope.last15Days=n;
		$scope.swan.public_key="AIzaSyCXmqvZXgyhgTDxZMIHd1tkwy2dPeYbPoU";
		$scope.swan.blog_id="6465883963116777439";
		var url_blog_list='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts?key='+$scope.swan.public_key;
		
		request_blog_list={
			//"startDate":$filter('date')(n, 'yyyy-MM-ddTHH:mm:ssZ'),
			"maxResults":400
		};
		var req = {
		 method: 'GET',
		 url: url_blog_list,
		 //headers: {
		 //'Content-Type': 'application/json', Authorization: "Bearer " + $scope.swan.googleUserToken 
		 //},
		 data: request_blog_list
		}
		$http(req).then(function (response) {
			$scope.blog_status="";
	    	$scope.blogs=response.data;
			for(i=0;i<=$scope.blogs.items.length-1;i++){
				$scope.blogs.items[i].content=$sce.trustAsHtml($scope.blogs.items[i].content);
				$scope.blogs.items[i].collapse=true;
			}
			// Blog เรื่องด่วน
			var l='oด่วน';
			var blog_fast=$filter('filter')($scope.blogs.items,l);
			if(blog_fast.length > 4){ blog_fast=blog_fast.slice(0,4);}
			$scope.blogs_fast=blog_fast;
			//$scope.blogs_recently=
	    },function(response){
	    	$scope.blog_status="ไม่สามารถดึงข้อมูลได้";
	    });
		
		
		
		
		
	});//watch
	
	
	
	//function
	$scope.isExpire=function(loginstart,expiresIn){
		var endtime=new Date(loginstart);
		endtime.setMinutes(endtime.getMinutes()+expiresIn);
		var nowtime=new Date();
		if(endtime>nowtime){return false;}else{return true;}
	};
	$scope.logout=function(){
		$('#login_pregress').html('logout...');
		localStorage.removeItem("rio4plan_google_access_token");
		localStorage.removeItem("rio4plan_google_email");
		localStorage.removeItem("rio4plan_google_expiresIn");
		localStorage.removeItem("rio4plan_google_start");
		bootbox.alert('ออกจากระบบเรียบร้อยแล้ว');
		window.location.href=$scope.swan.root_url+'page/welcome.html';
	};
	function format_gauge_num(mynumber){return parseFloat(mynumber).toFixed(2)};
		
})
.controller('content', function($scope,$http) {
	$scope.$watch("swan", function(){
		//call
		var url =   document.URL;
		var content_name =   $scope.gup(url, 'content_name');
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI(content_name))
	    .success(function (response) {$('#widget_content').html(response.data.content);}
		);
	});
	
	$scope.gup=function(url, name){
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\#&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        if( results == null )
            return "";
        else
            return results[1];
	};
})
.controller('about', function($scope,$http) {
	$scope.$watch("swan", function(){
		////about_org
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI('about_org'))
	    .success(function (response) {$('#widget_about_org').html(response.data.content);}
		);
		////about_person
		$http.get($scope.swan.root_url+"swan/api/swan_content/?content_name="+encodeURI('about_person'))
	    .success(function (response) {$('#widget_about_person').html(response.data.content);}
		);
	});
})

.controller('blog_list', function($scope,$http) {
	$scope.$watch("swan", function(){
		$scope.swan.public_key="AIzaSyCXmqvZXgyhgTDxZMIHd1tkwy2dPeYbPoU";
		$scope.swan.blog_id="6465883963116777439";
		var url_blog_list='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts?key='+$scope.swan.public_key;
		$http.get(url_blog_list)
	    .success(function (response) {
	    	$scope.blog=response;
	    }
		);
	});// watch
	$scope.isodatestring=function(d){
		 function pad(n){return n<10 ? '0'+n : n;}
		 return d.getUTCFullYear()+'-'
		      + pad(d.getUTCMonth()+1)+'-'
		      + pad(d.getUTCDate())+'T'
		      + pad(d.getUTCHours())+':'
		      + pad(d.getUTCMinutes())+':'
		      + pad(d.getUTCSeconds())+'Z';
	};
	$scope.blog_edit={};
	$scope.blog_edit.datehide=true;
	$scope.blog_edit.toggledate=function(){
		$scope.blog_edit.datehide=!$scope.blog_edit.datehide;
	};
	
	$scope.blog_del=function(post_id,blog_title){
		bootbox.confirm("คุณแน่ใจที่จะลบ post นี้?",function(result){
			if(result){
				//$scope.swan.public_key="AIzaSyCXmqvZXgyhgTDxZMIHd1tkwy2dPeYbPoU";
				//$scope.swan.blog_id="6465883963116777439";
				$scope.swan.googleUserToken=localStorage.rio4plan_google_access_token;
				var url_blog_del='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts/'+post_id+'?key='+$scope.swan.public_key;
				$http.delete(url_blog_del,{headers: {'Content-Type': 'application/json', Authorization: "Bearer " + $scope.swan.googleUserToken } })
			    .then(function (response) {
			    	$scope.blog=response;
					window.location.reload();
			    },function(){
			    	bootbox.alert('delete this post fail!');
			    });
			}
		});
	};// blog_del
	
	$scope.blog_add=function(){
		/*
POST new https://www.googleapis.com/blogger/v3/blogs/6465883963116777439/posts?fetchBody=true&fetchImages=true&key={YOUR_API_KEY}
 
{
 "content": "Hello world",
 "title": "this insert by service",
 "labels": [
  "group1"
 ]
}
		*/
		var url_blog_add='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts?fetchBody=true&fetchImages=true&key='+$scope.swan.public_key;
		$scope.swan.googleUserToken=localStorage.rio4plan_google_access_token;
		var labels_input=$scope.blog_add.tags.map(function(tag){return tag.text;});
		$scope.blog_add.content=scontent_add.getData();
		
		//alert($scope.blog_add.content);
		
		var the_now=new Date();
		var published=$scope.isodatestring(the_now);
		//alert(published);
		//console.log(JSON.stringify(labels_input));
		var post_content_blog_add={
 "content": $scope.blog_add.content,
 "title": $scope.blog_add.title,
		"published":published,
 "labels": labels_input
}
		var req = {
		 method: 'POST',
		 url: url_blog_add,
		 headers: {
		 'Content-Type': 'application/json', Authorization: "Bearer " + $scope.swan.googleUserToken 
		 },
		 data: post_content_blog_add
		}
		$http(req).then(function(response){
			//var post_id=response.id;
			//alert(JSON.stringify(response));
			bootbox.alert('successful',function(){
				window.location.hash = '#id'+response.data.id;
				window.location.reload(true);
			});
		}, function(){
			bootbox.alert('add new post fail');
		});
		
	};//blog add
	
	
	$scope.blog_edit_save=function(){
		var post_id=$scope.blog_edit.post_id;
		var url_blog_edit='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts/'+post_id+'?key='+$scope.swan.public_key;
		$scope.swan.googleUserToken=localStorage.rio4plan_google_access_token;
		$scope.blog_edit.labels=$scope.blog_edit.tags.map(function(tag){return tag.text;});
	//	var labels_input=$scope.tags;
		$scope.blog_edit.updated=new Date();
		//console.log(JSON.stringify(labels_input));
		var post_content_blog_edit={
 "content": scontent_edit.getData(),
 "title": $scope.blog_edit.title,
 "labels": $scope.blog_edit.labels,
 "published":$scope.isodatestring($scope.blog_edit.published),
 "updated":$scope.isodatestring($scope.blog_edit.updated)
}
		var req = {
		 method: 'PATCH',
		 url: url_blog_edit,
		 headers: {
		 'Content-Type': 'application/json', Authorization: "Bearer " + $scope.swan.googleUserToken 
		 },
		 data: post_content_blog_edit
		}
		$http(req).then(function(response){
			//var post_id=response.id;
			//alert(JSON.stringify(response));
			bootbox.alert('successful',function(){
				window.location.hash = '#id'+response.data.id;
				//window.location.reload(true);
			});
				//alert('sucess');
		}, function(){
			bootbox.alert('Edit this post fail');
		});
		
	};//blog edit save
	
	$scope.blog_edit_func=function(post_id){
		/*
		GET https://www.googleapis.com/blogger/v3/blogs/6465883963116777439/posts/1255015817657858493?key={YOUR_API_KEY}
{

 "kind": "blogger#post",
 "id": "1255015817657858493",
 "blog": {
  "id": "6465883963116777439"
 },
 "published": "2015-08-19T18:12:00+07:00",
 "updated": "2015-08-20T15:12:44+07:00",
 "etag": "\"GtyIIQmNmmUjEA0nwhSqMElCJ1g/dGltZXN0YW1wOiAxNDQwMDU4MzY0NjU3Cm9mZnNldDogMjUyMDAwMDAK\"",
 "url": "http://rio4plan.blogspot.com/2015/08/n3.html",
 "selfLink": "https://www.googleapis.com/blogger/v3/blogs/6465883963116777439/posts/1255015817657858493",
 "title": "n3",
 "content": "test<b>a</b>",
 "author": {
  "id": "g100174756494827576749",
  "displayName": "rio4plan irr4",
  "url": "https://www.blogger.com/profile/12241491820057247627",
  "image": {
   "url": "//lh4.googleusercontent.com/-vZ2elBBACZ4/AAAAAAAAAAI/AAAAAAAAABM/ZVevh63nhFg/s35-c/photo.jpg"
  }
 },
 "replies": {
  "totalItems": "0",
  "selfLink": "https://www.googleapis.com/blogger/v3/blogs/6465883963116777439/posts/1255015817657858493/comments"
 },
 "labels": [
  "a1",
  "a2"
 ]
}
		*/
		
		var url_blog_edit='https://www.googleapis.com/blogger/v3/blogs/'+$scope.swan.blog_id+'/posts/'+post_id+'?key='+$scope.swan.public_key;
		$scope.swan.googleUserToken=localStorage.rio4plan_google_access_token;
		var req = {
		 method: 'GET',
		 url: url_blog_edit,
		 headers: {
		 'Content-Type': 'application/json', Authorization: "Bearer " + $scope.swan.googleUserToken 
		 }
		}
		$http(req).then(function(response){
			//$scope.blog_edit=response.data;
			//$('#edit_post').modal('show'); 
			$scope.blog_edit.title=response.data.title;
			$scope.blog_edit.content=response.data.content;
			$scope.blog_edit.published=new Date(response.data.published);
			$scope.blog_edit.updated=new Date(response.data.updated);
			$scope.blog_edit.post_id=response.data.id;
			$scope.blog_edit.tags=response.data.labels.map(function(label){return {'text':label};});
			
			//$scope.blog_edit.
			//alert(response.data.labels);
			$('#blog_edit_tags').val(response.data.labels);
			
			scontent_edit.setData($scope.blog_edit.content);//set CKedit
			//alert(JSON.stringify($scope.blog_edit));
		},function(){
			bootbox.alert('can\'t access data');
		});
	};
	/*
	$scope.convert_time=function(time_string){
		//time_string=(String)time_string;
		alert(time_string);
		var c=String(time_string).split(':');
		for(i=0;i<=c.length-1;i++){
			var pad = "00";var str=c[i];
			var ans = pad.substring(0, pad.length - str.length) + str;
			c[i]=ans;
		}
		return c.join(":");
	};
	*/
})
.controller('pbms', function($scope,$http) {
	$scope.gaugeConfig={};
	//$scope.gaugeConfig.setup_red_value=70;
	//$scope.gaugeConfig.setup_yellow_value=80;
	$scope.g_value=0;
	$scope.g_pay=0;
	$scope.g_transfer=0;
	
	$scope.saveGaugeConfig=function(){
		$http.put($scope.swan.root_url+'rio4plan/Api/gaugeConfig/',
		{
			'setup_red_value':$scope.gaugeConfig.setup_red_value,
			'setup_yellow_value':$scope.gaugeConfig.setup_yellow_value,
			'api_pay':$scope.gaugeConfig.api_pay
		})
		.then(function(response){
			bootbox.alert('Saved');
		},function(response){bootbox.alert('save fail...')});
	};
	//$scope.gauges_name=A;
	$scope.$watch('swan', function(){
		
		//get pbms gauageconfig
		$http.get($scope.swan.root_url+'rio4plan/Api/gaugeConfig/')
		.then(function(response){
			$scope.gaugeConfig=response.data.data[0];
		});
		//
		
		////slidbar
		
		var settings = {
		            toggle: "#forCallSlideBar", // the selector for the menu toggle, whatever clickable element you want to activate or deactivate the menu. A click listener will be added to this element.
		            exit_selector: ".slider-exit", // the selector for an exit button in the div if needed, when the exit element is clicked the menu will deactivate, suitable for an exit element inside the nav menu or the side bar
		            animation_duration: "0.5s", //how long it takes to slide the menu
		            place: "left", //where is the menu sliding from, possible options are (left | right | top | bottom)
		            animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)", //animation curve for the sliding animation
		            body_slide: true, //set it to true if you want to use the effect where the entire page slides and not just the div
		            no_scroll: true, //set to true if you want the scrolling disabled while the menu is active
		                };

		    $('#setuppanel').sliiide(settings); //initialize sliiide
		
		/////end slidbar
		
		$http.get('http://bid.rid.go.th/pbms/latte/api/v1/office/4/pays/?bsource_id=109')
		.success(function (response) {
			$scope.g_value=parseFloat(response.meta.pay_percent_all).toFixed(2);
			$scope.g_pay=parseFloat(response.meta.total_pay_all).toFixed(2);
			$scope.g_transfer=parseFloat(response.meta.total_transfer_all).toFixed(2);
			
			$scope.g = new JustGage({
			    id: "gauge",
			    value: $scope.g_value,
			    min: 0,
			    max: 100,
			    title: "สำนักงานชลประทานที่ 4",
			    label: "%เบิกจ่าย",
		        customSectors: [{
		          color : "#a65f26",
		          lo : 0,
		          hi : $scope.gaugeConfig.setup_red_value
		        },{
		          color : "#fddf15",
		          lo : $scope.gaugeConfig.setup_red_value,
		          hi : $scope.gaugeConfig.setup_yellow_value
		        }, {
		          color : "#7bdd07",
		          lo : $scope.gaugeConfig.setup_yellow_value,
		          hi : 100
		        }],
				textRenderer: format_gauge_num
			  });
			
			$scope.gauges=response.data.map(function(obj){
				var ret={};ret.name=obj.agency_name;
				ret.agency_id=obj.agency_id;
				ret.value=cpercent(obj.pay_all,obj.transfer_all);
				ret.pay_all=obj.pay_all;
				ret.transfer=obj.transfer_all;
				return ret;
			}).sort(function(a,b){return b.value-a.value});
			findAndRemove($scope.gauges,'45');
			findAndRemove($scope.gauges,'56');
			findAndRemove($scope.gauges,'57');//56,57
			//alert($scope.gauges);
	
			var des=$('#subGag');
			var thediv =Array();var theGag=Array();
			var configGag={
			    id: "gauge",
			    value: 0,
			    min: 0,
			    max: 100,
			    title: "",
			    label: "%เบิกจ่าย",
		        customSectors: [{
		          color : "#a65f26",
		          lo : 0,
		          hi : $scope.gaugeConfig.setup_red_value
		        },{
		          color : "#fddf15",
		          lo : $scope.gaugeConfig.setup_red_value,
		          hi : $scope.gaugeConfig.setup_yellow_value
		        }, {
		          color : "#7bdd07",
		          lo : $scope.gaugeConfig.setup_yellow_value,
		          hi : 100
		        }],
				textRenderer: format_gauge_num
			  };
			for(i=0;i<=$scope.gauges.length-1;i++){
				thediv[i]=new $('<div>').attr('id','gag'+$scope.gauges[i].agency_id).addClass('dg2').appendTo(des);
				var theTitle=new $('<div>').html($scope.gauges[i].name).appendTo(thediv[i]);
				configGag.id='gag'+$scope.gauges[i].agency_id;
				configGag.value=$scope.gauges[i].value;
				//configGag.title=$scope.gauges[i].name;
				theGag[i]=new JustGage(configGag);
			//	theGag[i].refresh($scope.gauges[i].value);
			}
			/*
			for(i=0;i<=response.data.length-1;i++){
				//$scope.gauges[i]={};
				$scope.gauges[i].value=cpercent(response.data[i].pay_all,response.data[i].transfer_all);
				$scope.gauges[i].name=response.data[i].agency_name;
			}	*/
		}
		);
	});//watch
	$scope.$watch('g_value', function(){
		 $scope.g.refresh($scope.g_value);
	}); 
	
  $scope.clickrefresh=function(){
	  alert("adsf");
	  $scope.label="other";
	  //$scope.g_value=33;
	  $scope.g.refresh($scope.g_value);
  };
	function format_gauge_num(mynumber){return parseFloat(mynumber).toFixed(2);}
	function cpercent(pay,tran){
		if(tran==0){return 0.00;}
		return parseFloat(pay*100/tran,2).toFixed(2);
	}
	function findAndRemove(array, value) {
		for(i=0;i<=array.length-1;i++){
			if(array[i].agency_id==value){
				array.splice(i, 1);
			}
		}
	}
	
})
.controller('test',function($scope,$http){
	$scope.g_value=40.03;
	$scope.label="sdf";
	var g = new JustGage({
	    id: "gauge",
	    value: $scope.g_value,
	    min: 0,
	    max: 100,
	    title: "Lone Ranger",
	    label: $scope.label
	  });
	  $scope.clickrefresh=function(){
		  //alert("adsf");
		  $scope.label="other";
		  $scope.g_value=33;
		  g.refresh($scope.g_value);
	  };
	  $scope.$watch('g_value',function(){
		//alert('change');
	  	g.refresh($scope.g_value);
	  });
	  
});
	
