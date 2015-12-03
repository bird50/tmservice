{%extends 'base.tpl'%}
{%block title%}
Things-{{title}}
{%endblock title%}
{%block style%}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  background-color: #f5f5f5;
  text-indent:50px;
}
.body:{text-indent:5px;}
{%endblock style%}
{% block extra_style_tag %}
{% endblock extra_style_tag %}
{%block extra_script_tag %}

{%endblock extra_script_tag %}
{%block init_js_script%}

//alert('init');	

{%endblock init_js_script%}
{%block js_script%}
function load_swan_content(content_name){
	$.ajax({
		'url':'{{root_url}}swan/api/swan_content/',
		data:{'content_name':content_name},
		method:'get',
	}).success(function(data){
		$('#swan_content_'+content_name).html(data.data.content);
	});
}
{%endblock js_script%}
{%block body%}
{%block header%}
{%endblock header%}
{%block content%}
{%endblock content%}
{%block footer%}
<footer class="footer">
	<div ><strong>Things</strong> 
		<span class="text-muted">version 0.1 ,2015 จัดทำโดย ศูนย์โทรมาตรเพื่อการบริหารจัดการน้ำ สำนักบริหารจัดการน้ำและอุทกวิทยา กรมชลประทาน</span>
	</div>
</footer>
{%endblock footer%}
{%endblock body%}