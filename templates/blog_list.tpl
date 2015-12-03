{%extends 'rio4plan_base.tpl'%}
{%block title%}ส่วนแผนงาน สำนักงานชลประทานที่ 4-จัดการblog{%endblock title%}
{%block style%}
{{block.super}}
#blog_list{padding:10px;}
@font-face {
    font-family: designFont;
    src: url('{{asset_url}}rio4plan/fonts/ThaiSansNeue-Regular.otf');
}
@font-face {
    font-family: designFontBold;
    src: url('{{asset_url}}rio4plan/fonts/ThaiSansNeue-Bold.otf');
}
.designFont{
font-family: designFont;
font-size:14px;
}
.filter{display:none;}
{%endblock style%}
{%block extra_style_tag%}
<link href="{{asset_url}}swan/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
{%endblock extra_style_tag%}
{%block extra_script_tag%}
{{block.super|safe}}
<script src="{{asset_url}}swan/js/moment-with-locales.js"></script>
<script src="{{asset_url}}swan/js/bootstrap-datepicker.min.js"></script>
<script src="{{asset_url}}swan/js/bootstrap-datepicker.th.min.js"></script>
<script src="{{asset_url}}swan/js/bootstrap-timepicker.js"></script>
<script src="{{asset_url}}swan/js/bootstrap-tagsinput.min.js"></script>

<script src="{{asset_url}}swan/ckeditor/ckeditor.js"></script>

{%endblock extra_script_tag%}
{%block init_js_script%}
var datenow=new Date();
$('#content_add_date').attr('value',datenow.getFullYear()+'/'+eval(datenow.getMonth()+1)+'/'+datenow.getDate());
 $('.form_date').datepicker({
	format: "yyyy-mm-dd",
	language: "th"
  });
 $('.form_time').timepicker(
 { minuteStep: 1,
                //template: 'modal',
                appendWidgetTo: 'body',
                showSeconds: true,
                showMeridian: false,
                //defaultTime: false
 });
{%endblock init_js_script%}
{%block js_script%}
{{block.super}}
function Toglefilter(){
$(".filter").toggle();
}
{%endblock js_script%}

{%block content%}
<div ng-controller="blog_list" id="blog_list">{{ng_swan|safe}}
{%raw%}
<ol class="breadcrumb">
	<li><a href="{{swan.root_url}}page/mainpage.html">หน้าหลัก</a></li>
	<li>จัดการ Blog</li>
</ol>
<div class="page-header"><h3>จัดการ Blog</h3></div>


<div class="row">
<button type="button" class="btn btn-primary btn-md" data-toggle="modal" data-target="#add_new_post">
	 add new post
</button>
<button onclick="Toglefilter();" class="btn btn-xs btn-default">toggle filter</button>
<div class="panel filter" style="padding:10px;margin:20px;">Filter all:<input type="text" ng-model="posts_search.$"></div>
<table class="table table-striped">
	<thead>
		<tr><th>id<div class="filter"><input type="text" ng-model="posts_search.id"></div></th><th>Title<div class="filter"><input type="text" ng-model="posts_search.title"></div></th><th>tags<div class="filter"><input type="text" ng-model="posts_search.labels"></div></th><th>Time<div class="filter"><input type="text" ng-model="posts_search.published"></div></th><th>action</th></tr>
	</thead>
	<tbody>
		<tr ng-repeat="item in blog.items |filter:posts_search:strict"><td><a name="id{{item.id}}" id="id{{item.id}}"></a><small class="text-muted">{{item.id}}</small></td><td>{{ item.title }}</td><td>
			<div ng-repeat="label in item.labels"><span class="label label-default" >{{label}}</span> </div></td><td class="text-muted">{{item.published}}</td><td><a href="{{item.url}}" class="btn btn-xs btn-primary" target="_blank">View</a> <button  class="btn btn-xs btn-warning" data-toggle="modal" data-target="#edit_post" ng-click="blog_edit_func(item.id);">Edit</button> <button class="btn btn-xs btn-danger" ng-click="blog_del(item.id,item.title);">Del</button></td></tr>	
	</tbody>
</table>
<div><!--row-->

			
<div class="modal fade" id="add_new_post" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add new post</h4>
      </div>
      <div class="modal-body">
        <form action="#" method="POST">{%endraw%}{{ng_swan|safe}}{%raw%}
			<input type="hidden" value="post" name="frm_method">
			<p >Title:<br /><input type="text" name="title" ng-model="blog_add.title"></p>
			<p >Content:<br /><textarea id="scontent_add" contenteditable="true" class="editable" url="" name="scontent_add" ng-model="blog_add.content"></textarea>
			</p>
			<p >Tags:<br /><tags-input ng-model="blog_add.tags"></tags-input></p>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" ng-click="blog_add();">Add new post</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="edit_post" tabindex="-1" role="dialog" aria-labelledby="EditPostLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="EditPostLabel">Edit post</h4>
      </div>
      <div class="modal-body">
        <form action="#" method="POST">{%endraw%}{{ng_swan|safe}}{%raw%}
			<input type="hidden" value="patch" name="frm_method">
			<p >Title:<br /><input type="text" name="title" ng-model="blog_edit.title" value="{{blog_edit.title}}"></p>
			<p>
			<label>Published:</label> <span>{{blog_edit.published | date:'yyyy-MM-dd HH:mm:ss'}}</span><button class="glyphicon glyphicon-calendar" ng-click="blog_edit.toggledate();" onclick="return false;"></button><div id="post_edit_calen" ng-Hide="blog_edit.datehide">
<div style="display:inline-block; min-height:290px;"><datepicker ng-model="blog_edit.published"  show-weeks="true" class="well well-sm" ></datepicker></div>
<timepicker ng-model="blog_edit.published" ng-change="changed()" hour-step="1" minute-step="1" show-meridian="ismeridian" ></timepicker><button class="btn btn-xs btn-primary"  onclick="return false;" ng-click="blog_edit.toggledate();">close</button></div>
			</p>
			<p >Content:<br /><textarea id="scontent_edit" contenteditable="true" class="editable" url="" name="scontent_edit" ng-model="blog_edit.content"></textarea>
			</p>
			<p >Tags:<br /><tags-input ng-model="blog_edit.tags"></tags-input></p>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" ng-click="blog_edit_save();">Save post</button>
      </div>
    </div>
  </div>
</div>

{%endraw%}

</div><!--end controller blog_list-->
{%endblock content%}
{%block extra_js_script%}
var ifr_file ='<iframe id=\"frame\" src=\"{{root_url}}theresource/dialog.php?type=2&lang=en_EN&popup=0&crossdomain=0&field_id=theselectfile&akey=key&fldr=\" width=\"100%\" height=\"300\"></iframe><div id=\"indialog\"><input placeholder="selected file url" id=\"theselectfile\" type=\"text\" size=\"55\"></div>';

var ifr_image ='<div id=\"indialog\"><input placeholder="selected file url" id=\"theselectfile\" type=\"text\" size=\"55\"></div><iframe id=\"frame\" src=\"{{root_url}}theresource/dialog.php?type=1&lang=en_EN&popup=0&crossdomain=0&field_id=theselectfile&akey=key&fldr=\" width=\"100%\" height=\"300\"></iframe>';

var ifr_media ='<div id=\"indialog\"><input placeholder="selected file url" id=\"theselectfile\" type=\"text\" size=\"55\"></div><iframe id=\"frame\" src=\"{{root_url}}theresource/dialog.php?type=3&lang=en_EN&popup=0&crossdomain=0&field_id=theselectfile&akey=key&fldr=\" width=\"100%\" height=\"300\"></iframe>';

// use in only ckeditor4
function theresource_add_file(editor){
	bootbox.dialog({
	  message: ifr_file,
	  title: "TheResource:Resource Document Image and File!!!..by_b",
	  closeButton: true,
	  className:"theresourcedialog",
	  buttons: {
	      success: {
	        label: "insert as a Link",
	        className: "btn-success",
	        callback: function() {
	          var theresourceselectedfile=$('#theselectfile').val();
			 // var egs=editor.getSelection();
			  
		  			editor.insertHtml('<a href=\''+theresourceselectedfile+'\' target=\'_blank\'>'+theresourceselectedfile+'</a>');
		  		
	        }
	      },
	      insertasimage: {
	        label: "insert as Image",
	        className: "btn-primary",
	        callback: function() {
	          var theresourceselectedfile=$('#theselectfile').val();
			  editor.insertHtml('<img src=\''+theresourceselectedfile+'\' width=\'150px\'>');
	        }
	      }
	  }
	});
}
function theresource_add_image(){
	bootbox.dialog({
	  message: ifr_image,
	  title: "TheResource:Resource Document Image and File!!!..by_b",
	  closeButton: true,
	  className:"theresourcedialog",
	  
	});
}

function theresource_add_media(){
	
	bootbox.dialog({
	  message: ifr_media,
	  title: "TheResource:Resource Document Image and File!!!..by_b",
	  closeButton: true,
	  className:"theresourcedialog",
	  
	});
}

//add somting like this
$(function(){

$('#theresource_btn_file').click(function(){
	theresource_add_file();

});	//click
$('#theresource_btn_image').click(function(){
	theresource_add_image();
	
});	//click

$('#theresource_btn_media').click(function(){
	theresource_add_media();
});	//click

});

var scontent_add=CKEDITOR.replace( 'scontent_add', {
								
								toolbarGroups: [
									{ name: 'mode' },
									{ name: 'basicstyles' },
									{ name: 'links' }
								],
				
								toolbar : [ ['Source'],
								                               ['Bold','Italic','Underline','StrikeThrough','-','Undo','Redo','-','Cut','Copy','Paste','Find','Replace','PasteFromWord','-','Outdent','Indent','-','Print'],
                               
								                               ['NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
								                                ['Maximize', 'ShowBlocks'],
								                               ['Image','Table','-','Link','TextColor','BGColor'],'/',
								                      ['Styles','Format','Font','FontSize','Theresource','Preview','Youtube']
								                               ] ,
				toolbarCanCollapse:true,
								extraPlugins: 'theresource,birdsave,youtube',
				allowedContent: true, 
								//removePlugins: 'sourcearea'
							   } // set of config
							   );
							   
							   
var scontent_edit=CKEDITOR.replace( 'scontent_edit', {
								
								toolbarGroups: [
									{ name: 'mode' },
									{ name: 'basicstyles' },
									{ name: 'links' }
								],
				
								toolbar : [ ['Source'],
								                               ['Bold','Italic','Underline','StrikeThrough','-','Undo','Redo','-','Cut','Copy','Paste','Find','Replace','PasteFromWord','-','Outdent','Indent','-','Print'],
                               
								                               ['NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
								                                ['Maximize', 'ShowBlocks'],
								                               ['Image','Table','-','Link','TextColor','BGColor'],'/',
								                      ['Styles','Format','Font','FontSize','Theresource','Preview','Youtube']
								                               ] ,
				toolbarCanCollapse:true,
								extraPlugins: 'theresource,birdsave,youtube',
				allowedContent: true, 
								//removePlugins: 'sourcearea'
							   } // set of config
							   );

{%endblock extra_js_script%}
