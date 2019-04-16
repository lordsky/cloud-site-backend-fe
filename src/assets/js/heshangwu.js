	 function showText(id, scroH, viewH){
        if($(id).length > 0){
            if($(id).offset().top - scroH < viewH * 0.5){
                $(id + " .text").addClass("show-text");
            }else if($(id).offset().top - scroH > viewH){
                $(id + " .text").removeClass("show-text"); 
            }
        }
    }
    function showImg(id, index){
        if($(id).length > 0){
            $("#box-"+index).css("background-image","url('../images/why-"+index+".gif?"+new Date().getTime()+"')");
        }
    }
    function headerScroll(scroH){ 
        if(scroH >50){  //距离顶部大于50px时
            $("#header").addClass("white"); 
        }else{
            $("#header").removeClass("white"); 
        }
    }
   
    $(function () {     
    	   var num = 0
        $("#navToggler").click(function () {
            $("#navLink").toggle();
        });    
        $("#navLink a").click(function () {
            $("#navLink").hide();
        });
        $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度 
        headerScroll(scroH);
        showText("#intro",scroH,viewH);
        showText("#why",scroH,viewH);
        showText("#company",scroH,viewH);
        showText("#case",scroH,viewH); 
        showText("#service",scroH,viewH);
        showText("#wifi",scroH,viewH);
        showText("#hotel",scroH,viewH);
        showText("#video",scroH,viewH);
        showText("#room",scroH,viewH);
        showText("#tour",scroH,viewH);
        
       });
       $(".question dt").click(function() {
	        $(this).parent().toggleClass("active");
	    });
       setInterval(function(){
           if(num>=1){
             $('#swiper-img1').css('opacity','1')
             $('#swiper-img2').css('zIndex','0')
             $('#swiper-img2').css('opacity','0')
             num = 0
           }else{
            num++
            $('#swiper-img2').css('opacity','1')
            $('#swiper-img2').css('zIndex','10')
            $('#swiper-img1').css('opacity','0')
           }
       },6000)
    })
