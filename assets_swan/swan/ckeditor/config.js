/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.toolbar = [         ['Source'],
                               ['Bold','Italic','Underline','StrikeThrough','-','Undo','Redo','-','Cut','Copy','Paste','Find','Replace','PasteFromWord','-','Outdent','Indent','-','Print'],
                               
                               ['NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                                ['Maximize', 'ShowBlocks'],
                               ['Image','Table','-','Link','TextColor','BGColor','Source'],'/',
                      ['Styles','Format','Font','FontSize']
                               ] ;
};
