
//bird50 make showpreview

// use jquery

function showpreview($div,url){
   
    var extension = url.split('.').pop();
    var thefilename = decodeURI(url.split('/').pop());
    
    switch(extension) {
        case 'jpg':
        case 'png':
        case 'gif':
            $div.html('<a target="_blank" href="'+url+'" ><img src="'+url+'" style="max-width:100px;max-height:100px;"/></a>');  // There's was a typo in the example where
            break;                         // the alert ended with pdf instead of gif.
        case 'zip':
        case 'rar':
            $div.html('<a target="_blank" href="'+url+'">'+thefilename+'</a>');
            break;
        case 'pdf':
            $div.html('<a target="_blank" href="'+url+'">'+thefilename+'</a>');
            break;
        default:
            $div.html('<a target="_blank" href="'+url+'">'+thefilename+'</a>');
    }    //$div.html='<img src="'+url+'" />';
    
    //$div.html(url);
}