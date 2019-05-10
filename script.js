var capturing = false;
var events = [];
var timer = setInterval(refreshTimer, 1000);
var attack_spells = ["Mimblewimble","Locomotor","Stupefy","Incendio","Oppugno"];
var defense_spells = ["Wingardium Leviosa","Arresto Momentum","Finite Incantatem","Expelliarmus","Aquamenti"];
var player1score = 0;
var player2score = 0;
$(document).ready(function() {
    
});

$("#start_button").click(function(){
    capturing = !capturing;
    console.log("In capturing");
    if(capturing) {
        $("#start_button").text = "Stop";
        $("#start_button").css("background-color","salmon");
    } else {
        $("#start_button").text = "Start";
        $("#start_button").css("background-color","aquamarine");
        console.log("Stopping");
        var player1 = {};
        var player2 = {};
        var name1 = events[0].name;
        var player1spells = [];
        var player2spells = [];
        for(var i = 0; i < events.length; i++) {
            var curSpell = events[i].spell;
            if(events[i].name === name1) {
                player1[curSpell] = player1[curSpell] ? player1[curSpell] + 1 : 1;
                player1spells.push(curSpell);
            } else {
                player2[curSpell] = player2[curSpell] ? player2[curSpell] + 1 : 1;
                player2spells.push(curSpell);
            }
        }
        console.log(player1);
        console.log(player2);
        var p1set = new Set(player1spells);
        var p2set = new Set(player2spells);

        player1spells = Array.from(p1set);
        player2spells = Array.from(p2set);

        console.log("After set");
        console.log(player1spells);
        console.log(player2spells);

        var player1max = player1spells[0];
        console.log("length: " + player1spells.length);

        for (var x = 0; x<player1spells.length; x++) {
            var spell = player1spells[x]
            console.log("spell: " + spell);
            console.log("player1[spell]: " + player1[spell]);
            if(player1[spell] > player1[player1max]) {
                player1max = spell;
            }
        }
        console.log("Max spell p1: " + player1max);

        var player2max = player2spells[0];
        for (var y = 0; y<player2spells.length; y++) {
            var spell = player2spells[y];
            if(player2[spell] > player2[player2max]) {
                player2max = spell;
            }
        }
        console.log("Max spell p2: " + player2max);   
        score(player1max, player2max);
        $('#score').append("Player 1: " + player1score + " Player 2: " + player2score);
    }
});

function score(spell1, spell2) {
    if(spell1 === undefined) {
        return;
    } else if (spell2 === undefined) {
        return;
    } else {
        if (attack_spells.contains(spell1) && attack_spells.contains(spell2)) {
            player1score = player1score + 1;
            player2score = player2score + 1;
        } else if (attack_spells.contains(spell1) && defense_spells.contains(spell2)) {
            player2score = player2score + 3;
        } else if (attack_spells.contains(spell1) && spell2 === "None") {
            player1score = player1score + 3;
        } else if (attack_spells.contains(spell2) && attack_spells.contains(spell1)) {
            player1score = player1score + 1;
            player2score = player2score + 1;
        } else if (attack_spells.contains(spell2) && defense_spells.contains(spell1)) {
            player1score = player1score + 3;
        } else if (attack_spells.contains(spell2) && spell1 === "None") {
            player2score = player2score + 3;
        }
    }
    
}

function refreshTimer() {    
    if (capturing) {
        $.ajax({
            url: "http://10.10.235.162:3030/events",
            success: function(result) {
                //$('#content').text("");
                console.log(result);
                for (i = 0; i < result.length; i++) {
                    cur = result[i]
                    events[i] = (result[i]); // check pass by reference v. pass by value
                    $('#content').append("player: " + cur.name + " spell: " + cur.spell + "<p>")
                }
            }
        });
    }
}