	 function showText(id, scroH, viewH){
        if($(id).length > 0){
            if($(id).offset().top - scroH < viewH * 0.5){
                $(id + " .text").addClass("show-text");
            }else if($(id).offset().top - scroH > viewH){
                $(id + " .text").removeClass("show-text"); 
            }
        }
    }
	 console.log('触发')
   function showImg(index){
     let url = ''
     var time = new Date().getTime()
     if(index==2){
       url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cDaAJ7OFAAMwwjfmuGc692.gif?'
     }else if(index==3){
       url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cD6AfCCIAARkdxn27zE048.gif?'
     }else{
       url = 'https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1cC2AeZnJAAD-qCJNxAY475.gif?'
     }
       console.log(url)
       $("#box-"+index).css("background-image",`url(${url}+${time})`);
   }
    function headerScroll(scroH){ 
         if(scroH >50){  //距离顶部大于50px时
            $("#header").addClass("white"); 
            $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/13/wKgB7Fy1b4KAJE5dAAAJTp8Jyh8278.png'); 
        }else{
            $("#header").removeClass("white"); 
            $("#header img").attr('src','https://fastdfs-dev-test.uworks.cc/group1/M00/00/15/wKgB7Fy2xZuALSJTAAAINAO5Mwg530.png'); 
        }
    }
    window.onload = function(){
    	  for(let i=1;i<=3;i++){
    	   $('.content-wrap').on('mouseover','#box-'+i,function(){
    	   	    showImg(i)
    	   })
    	    $('.container').on('mouseover','#box-'+i,function(){
    	   	    showImg(i)
    	   })
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
        $('.content').scroll(function() {
        var scroH = $('.content').scrollTop();  //滚动高度
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
