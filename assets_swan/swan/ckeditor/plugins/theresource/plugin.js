/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 1.0.10
*/
( function() {
	CKEDITOR.plugins.add( 'theresource',
	{
		lang: [ 'en', 'pt', 'ja', 'hu', 'it', 'fr', 'tr', 'ru', 'de', 'ar', 'nl', 'pl', 'vi'],
		init: function( editor )
		{
			editor.addCommand( 'theresource', {
			    exec: function( editor ) {
					theresource_add_file(editor);
			       // var now = new Date();
			        //editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
			    }
			});
		

			editor.ui.addButton( 'Theresource',
			{
				label : editor.lang.theresource.button,
				toolbar : 'insert',
				command : 'theresource',
				icon : this.path + 'images/icon.png'
			});
			
			
		}//init
	});//plugins add
})();

