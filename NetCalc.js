// ==UserScript==
// @name         NetCalc
// @namespace    http://your.homepage/
// @version      1.0
// @description  Calculates the amount netted through using Pucatrade
// @author       Alex Berliner
// @match        https://pucatrade.com/trades/past/sent
// @grant        none
// ==/UserScript==

var dToPP = 0.78;
var postageCost = 0.48;
log("start");
var ppEarned = document.getElementsByClassName("explain-text")[0].innerText.split("$")[1].split(" ")[0] * 100;
this.tableData = [];
this.memberData = {};
// Parse all rows, hidden or not (scrolling may have added more entries)
var tableRows = $('tr[id^="user_card_"]');
var curRow, curFields;
var cardName, cardPts;
//log(tableRows.length);
log(ppEarned);
var rows = [];
var rnames = [];
for(var i = 0; i < tableRows.length; i++){
    curRow = $(tableRows).eq(i);
    curFields = $(curRow).find('td');
    var r = new Row(
        $(curFields).eq(0).text().trim().split("\n")[0],
        $(curFields).eq(1).text().trim().split("\n")[0],
        $(curFields).eq(2).text().trim().split("\n")[0],
        $(curFields).eq(3).text().trim().split("\n")[0],
        $(curFields).eq(4).text().trim().split("\n")[0],
        $(curFields).eq(5).text().trim().split("\n")[0].split("\t")[0],
        $(curFields).eq(6).text().trim().split("\n")[0],
        $(curFields).eq(7).text().trim().split("\n")[0],
        $(curFields).eq(8).text().trim().split("\n")[0]
    );
    rows[i] = r;
}

var packagesShipped = rows.length+1;

//remove # package dupes and brian
for(var i = 0; i < rows.length; i++){
    if(rows[i].receiver == "Brian Estes"){
        ppEarned-= rows[i].points;
        packagesShipped--;
        continue;
    }
    if(i != rows.length-1 && rows[i].receiver == rows[i+1].receiver){
        packagesShipped--;
        continue;
    }
    //log(rows[i].receiver);
}
//acct cost
ppEarned -= 45*100/dToPP;

//envelopes
ppEarned -= (119/100) * 1.065 * packagesShipped/dToPP;
//tape
ppEarned -= (300/2400) * 1.065 * packagesShipped/dToPP;
//toploaders
ppEarned -= (297/35) * 1.065 * packagesShipped/dToPP;
//stamps
ppEarned -= (48) * packagesShipped/dToPP;

document.getElementsByClassName("explain-text")[0].innerHTML += "Your sales have netted <b> PP" +
    ppEarned.toFixed(0) + "</b> or <b>$"  + (ppEarned/100*dToPP).toFixed(2) + "</b>, at an exchange rate of <b>"+dToPP+" c/PP</b>." 
    ;
log(ppEarned * dToPP/100);

function log(c){
    console.log(c);
}

function Row (id, set, card, points, foil, receiver, initiated, shipped, completed) {
    this.id =  id;
    this.set = set;
    this.card = card;
    this.points = points;
    this.foil = foil;
    this.receiver = receiver;
    this.initiated = initiated;
    this.shipped = shipped;
    this.completed = completed;
    this.print = function(){
        log(id + " " + set + " " + card + " " + points + " " + foil + " " + receiver + " " + initiated + " " + shipped + " " + completed);
    };
}