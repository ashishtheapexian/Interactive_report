/*!
 * apex-plugin-iRsmooth_row_view - Oracle APEX plugin
 * @author Ashish Sahay
 * @version v1.0.0
 * @About me Ashish Sahay (www.ashishsahay.com)
 * @license MIT
 */
/*
 * ChageLog:
 * v1.0.0 - 20171101 - Initial Release
 */
 
    
    function hideMe(p_regionId) {
        //var vRegionId$ = '#REGION_STATIC_ID#';
        $('#'+ p_regionId+ '_SINGLE-ROW-VIEW').hide("slow");
        // apex.region('SONGFILE-USERS').refresh();
        $('#' + p_regionId + '_full_view').show("slow");
        }
    
var iRsmooth_row_view = {

  // Init Function
  init: function(){
    var da = this;
    
	apex.debug.log('iRsmooth_row_view.init',da);
	
    // get plugin attributes
    var vRegionId        = da.action.attribute01;
	
	if($("#" +vRegionId +"_SINGLE-ROW-VIEW").length == 0) {
		  
	$('<div id ="'+vRegionId +'_SINGLE-ROW-VIEW"> <div>').insertAfter('#' + vRegionId+ '_full_view');
	}
	
$('#'+vRegionId +'_SINGLE-ROW-VIEW').hide();

$("#" + vRegionId + " .a-IRR-detail-row").each( function(){
    $(this).attr('class', vRegionId +'apex-edit-view');
});


$('.'+ vRegionId+ 'apex-edit-view').click( function( e) {
	var vtarget= event.target;
    var row_indx= ($(this).parent('td').parent('tr').index())+ 1;
	var function_Call ="hideMe('"+vRegionId+"')";
	var indx= 0;
	var html= '<div class="a-IRR-toolbar a-IRR-toolbar--singleRow">'+
				'<div class="a-IRR-toolbarNav">'+
				'<button type="button" id="' + vRegionId +'_report_view" class="a-Button a-IRR-button a-IRR-button--reportView" onClick= "' +function_Call+ '">'+
						'<span class="a-Icon icon-left-chevron"></span>'+
						'<span>Report View</span>'+
					'</button>'+
				'</div>'+
				'<div class="a-IRR-singleRowNav">'+
				'</div>'+
			'</div>'+
			'<div class="a-IRR-content">';
	
    $('#' + vRegionId).find('#stickyTableHeader_1 th').each( function(){
		var hdr_txt= $(this).text();
        var sort= $(this).find('span[class="a-IRR-headerSort"]').text();
        if( sort.length> 0) {
            hdr_txt= hdr_txt.substring(0, hdr_txt.indexOf(sort));
        }
		indx+= 1;
		// TO DO:-  Adding Pagination 
		if( hdr_txt!= '' && (hdr_txt.charCodeAt(0)!= 160) && hdr_txt!='Link') {
			var dtl_txt= $('.t-fht-tbody table tbody tr:nth-child('+ row_indx+ ') td:nth-child('+ indx+ ')').html();
			html= html+ '<div class="a-IRR-singleRow-row">'+ 
							'<span class="a-IRR-singleRow-name">'+ 
								hdr_txt+ 
							'</span>'+
							'<span class="a-IRR-singleRow-value">'+
								dtl_txt+
							'</span>'+
						'</div>';
		}
	});
	html= html+ '</div>';
    $('#' + vRegionId + '_full_view').hide("slow");
    $('#'+ vRegionId + '_SINGLE-ROW-VIEW').html( html);
    $('#'+ vRegionId + '_SINGLE-ROW-VIEW').show("slow");
});

}}