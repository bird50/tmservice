{%if islogin %}
<div class="panel">
<h4 class="text-primary"><small>you'r </small><strong>{{googleUser}}</strong>.</h4><br/>
<ul>
{%for a_youcan in youcan%}
	<li><a href="{{a_youcan.link}}">{{a_youcan.name}}</a></li>
{%endfor%}

</ul>
user type:{{googleUserType}}<br />
<a ng-click="logout()" class="btn btn-xs btn-warning">logout</a> <span id="login_status"></span>
</div>
{%endif%}