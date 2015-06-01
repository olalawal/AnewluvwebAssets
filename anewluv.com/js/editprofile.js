$('.sideMenu li a').click(function(){
		
	var myClass = $(this).attr("class");
	var href = $(this).attr("href");
	var sarrowspan= $(this).find('span:eq(1)');
	var sarrow=$(sarrowspan).attr('class');
	if(sarrow==="dwn-ar"){
		$('.sidemenuOpen-'+myClass).show("fast");
		$(sarrowspan).removeAttr('class');
		$(sarrowspan).addClass('up-ar');
	}
	else{
		$('.sidemenuOpen-'+myClass).hide("fast");
		$(sarrowspan).removeAttr('class');
		$(sarrowspan).addClass('dwn-ar');
	}
	if(href==="#")
	return false;
	else
	return true;
});
$('.menu-hide-show').click(function(){
	 
  if ( $('.col-sm-4').css('display') == 'none' ){
    $('.col-sm-4').show("fast");
	$('.col-sm-8').css("width","66%");
	 
  }
  else  
  {
     $('.col-sm-4').hide("fast");
	 $('.col-sm-8').css("width","100%");
	 
	
  }
   
});