//swan js
angular.module('swan', [])
.service('$swan',function(){
	this.test="test $swan service";
	this.root_url='http://localhost/wmss/';
	this.asset_url=this.root_url+'assets/';
	
});