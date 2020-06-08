
$(document).ready(function(){
    var to;
    $("#nodemailerBtn").click(function(){     
        to=$("#nodemailerEmail").val();
        console.log(to);
        $.post("http://localhost:8080/send",{to:to},function(data){
        if(data=="sent")
        {
         $("#nodemailerBtn").empty()

        }

});
    });
});