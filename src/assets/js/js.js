
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
            $("#box-"+index).css("background-image","url('images/why-"+index+".gif?"+new Date().getTime()+"')");
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
        $("#navToggler").click(function () {
            $("#navLink").toggle();
        });    
        $("#navLink a").click(function () {
            $("#navLink").hide();
        });
    })