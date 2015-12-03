/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 1.0.10
*/
( function() {
	CKEDITOR.plugins.add( 'birdsave',
	{
		//lang: [ 'en', 'pt', 'ja', 'hu', 'it', 'fr', 'tr', 'ru', 'de', 'ar', 'nl', 'pl', 'vi'],
		init: function( editor )
		{
			editor.addCommand( 'birdsave', {
			    exec: function( editor ) {
					var thepk=$(editor.element.$).attr('pk');
					var eleid=$(editor.element.$).attr('id');
					var saveurl=$(editor.element.$).attr('saveurl');
                    var htmldata=editor.getData();
                    var spansaving=new $('<div>saving...</div>');
                   $(editor.element.$).before(spansaving);
					//alert(saveurl);
					
                    $.ajax({
                           url:saveurl,
                           type:'POST',
                           data:{'pk':thepk,
                           'name':eleid,
                           'value':htmldata,
						  	dataType: 'json'
                           }
                
                     }).done(function(data){
						var result=$.parseJSON(data);
                         $(editor.element.$).val(result);
                         spansaving.remove();
                     }).fail(function(){
                         spansaving.remove();
                         alert('ไม่สามารถ บันทึกได้');
                     });//ajax
			       // var now = new Date();
			        //editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
			    }
			});
		

			editor.ui.addButton( 'Birdsave',
			{
				label : 'save...',
				toolbar : 'insert',
				command : 'birdsave',
				icon : this.path + 'images/save.png'
			});
			
			
		}//init
	});//plugins add
})();

