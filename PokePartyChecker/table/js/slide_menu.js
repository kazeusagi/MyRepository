$(function(){
    $('nav').hover(function(){
        $(this).toggleClass('open');
        $('.arrow').toggleClass('open');
    })
    $('.arrow').hover(function(){
        $('nav').toggleClass('open');
        $(this).toggleClass('open');
    })
    
});
