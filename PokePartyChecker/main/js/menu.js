$(function(){
    changeMenu()
    $("input[name='menu']").change(function(){
        changeMenu();
    })
})

var changeMenu = function(){
    target_menu = $("input[name='menu']:checked").val();
    $(".hidden").css({
        'display': "none"
    });
    $("#"+target_menu).css({
        'display': "block"
    });
}