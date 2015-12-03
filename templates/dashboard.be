{%extends 'mainpage.html'%}
{%block content%}
<!--account-->
<div class="row" style="margin:5px;">
<div class="col-md-4">
<div class="panel panel-default">
  <div class="panel-heading">
    <span class="panel-title">Your Account</span><span class="pull-right"><a class="btn btn-xs btn-default" href="{{root_url}}things/logout/">Logout</a></span>
  </div>
  <div class="panel-body">
    <span class="text-muted">Username : </span>{{username}}<br/>
	 <span class="text-muted">Email : </span>{{email}}<br/>
	 
  </div>
</div><!--panel-->
</div><!--col-md-4-->
</div><!--row-->


<!--action-->
<div class="row" style="margin:5px;">
<div class="col-md-4">
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Your Action</h3>
  </div>
  <div class="panel-body">
    <ul>
	<li>test
	<li>test
	</ul>
  </div>
</div><!--panel-->
</div><!--col-md-4-->
</div><!--row-->
{%endblock content%}