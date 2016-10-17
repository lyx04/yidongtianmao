$(function() {
    var h = $(document).height()
    $(".sort .tuijian .details").height(h)
    $(".sort").on("touchend", ".tuijian", function () {
        $(".tuijian").removeClass("active")
        $(".tuijian .details").removeClass("active")
        $(this).addClass("active")
        $(this).find(".details").addClass("active")
    })
    var mySwiper = new Swiper('#banner', {
        direction: 'horizontal',
        autoplay : 1000,
        speed:300,
        loop:true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    })
    var hot = new Swiper('#tiaomu', {
        direction: 'vertical',
        autoplay : 1000,
        speed:300,
        loop:true,
    })
    var today = new Swiper('#today', {
        direction: 'horizontal',
    })
    $(document).on("scroll",function(){
        var t=$(document).scrollTop()
        if(t>$("#banner").height()){
            $(".sousuo").css({"background":"red"})
        }else{
            $(".sousuo").css({"background": "linear-gradient(to bottom, #000004, transparent)"})
        }
    })
})