var capturing = false
var timer = setInterval(refreshTimer, 1000)
$(document).ready(function() {
    
});

$("#toggle_collection").click(function(){
    capturing = !capturing
    
});

function refreshTimer() {
    if (capturing) {
        $.ajax({
            url: "http://192.168.27.197:3030/events",
            success: function(result) {
                $('#content').text("")
                console.log(result)
                for (i = 0; i < result.length; i++) {
                    $('#content').append("player: " + result[i].name + " spell: " + result[i].spell + "<p>")
                }      
            }
        });
    }
}