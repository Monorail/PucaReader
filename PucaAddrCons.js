// ==UserScript==
// @name         pucaAddressConsolidator
// @namespace    http://your.homepage/
// @version      1
// @description  Provides a more readable form for Pucatrade package sending
// @author       Alex Berliner
// @match        https://pucatrade.com/trades/active
// @grant        none
// ==/UserScript==
this.tableData = [];
this.memberData = {};
// Parse all rows, hidden or not (scrolling may have added more entries)
var tableRows = $('tr[id^="user_card_"]');
var curRow, curFields;
var cardName, cardPts;
//log(tableRows.length);

var receivers = [];
var addrs = document.getElementsByClassName("address_text");
var rnames = [];
for(var i = 0; i < tableRows.length; i++){
    curRow = $(tableRows).eq(i);
    curFields = $(curRow).find('td');
    if($(curFields).eq(5).text().trim().split("\n")[0] == "Unshipped" && $(curFields).eq(9).text().trim().split("\n")[0] == "Report Problem"){
        n = $(curFields).eq(6).text().trim().split("\n")[0];
        if(receivers[n] == null){
            var r = new Receiver(n,addrs[i]);
            rnames.push(n);
            receivers[n] = r;
        }
        receivers[n].cards.push($(curFields).eq(2).text().trim().split("\n")[0]);
    }
}
var newHTML         = document.createElement ('div');
newHTML.innerHTML   += "<b>" + rnames.length + " packages</b><br><br>";
for(var i = 0; i < rnames.length; i++){
    for(var j = 0; j < receivers[rnames[i]].cards.length; j++){
        newHTML.innerHTML   += receivers[rnames[i]].cards[j] + "<br>";
    }
    newHTML.innerHTML   += receivers[rnames[i]].addr.innerHTML.replace("<b>","") + "<br>";
    newHTML.innerHTML   +="<br>";
}
document.body.appendChild (newHTML);

function Receiver (memberName, addr) {
    this.addr = addr;
    this.cards = [];
    this.memberName = memberName;
}

function log(c){
    console.log(c);
}
//document.append("\n\n\n\n\n\n\n\nsd");
/*
curRow = $(tableRows).eq(0);
curFields = $(curRow).find('td');
var c = 0;
log(c++ + " " + $(curFields).eq(0).text().trim().split("\n")[0]);//0
log(c++ + " " + $(curFields).eq(1).text().trim().split("\n")[0]);//1
log(c++ + " " + $(curFields).eq(2).text().trim().split("\n")[0]);//2
log(c++ + " " + $(curFields).eq(3).text().trim().split("\n")[0]);//3
log(c++ + " " + $(curFields).eq(4).text().trim().split("\n")[0]);//4
log(c++ + " " + $(curFields).eq(5).text().trim().split("\n")[0]);//5
log(c++ + " " + $(curFields).eq(6).text().trim().split("\n")[0]);//6
log(c++ + " " + $(curFields).eq(7).text().trim().split("\n")[0]);//7
log(c++ + " " + $(curFields).eq(8).text().trim().split("\n")[0]);//8
log(c++ + " " + $(curFields).eq(9).text().trim().split("\n")[0]);//9
receivers[r.memberName].cards.push($(curFields).eq(2).text().trim().split("\n")[0]);
receivers[r.memberName].cards.push($(curFields).eq(2).text().trim().split("\n")[0]);
log(receivers[r.memberName].memberName);
log(receivers[r.memberName].cards);
*/
/*
var i;
var curRow, curFields;
var cardName, cardPts;
var memberName, memberPts;

// For each row in the trade table
for (i = 0; i < tableRows.length; i++) {
    curRow = $(tableRows).eq(i);
    curFields = $(curRow).find('td');

    // Extract the relevant table fields
    cardName   =           $(curFields).eq(1).text().trim();
    cardPts    = parseInt( $(curFields).eq(2).text(), 10 );
    memberName =           $(curFields).eq(4).text().trim();
    memberPts  = parseInt( $(curFields).eq(5).text(), 10 );

    // Data per row
    this.tableData.push({
        dom:        curRow,
        memberName: memberName,
        memberPts:  memberPts,
        cardName:   cardName,
        cardPts:    cardPts
    });

    // Data per member
    if ( !this.memberData[memberName] ) {
        // Make a new entry
        this.memberData[memberName] = {
            memberPts: memberPts,
            cardQty: 1,
            totalCardPts: cardPts,
            hasAlert: false,
            hasBundleAlert: false,
            hasOutgoingAlert: false
        };

    } else {
        // Update an existing entry
        this.memberData[memberName].cardQty++;
        this.memberData[memberName].totalCardPts += cardPts;
    }
}

function Card (set, name, value, foil) {
    this.set = set;
    this.name = name;
    this.value = value;
    this.foil = foil;
    this.member = member;
    this.memberpts = memberpts;
    this.country = country;
    this.href = href;
    this.getInfo = function() {
        return "function";
    };
}

var traders = document.getElementsByClassName("address_text");
for(var i = 0; i < traders.length; i++){
    if(i == traders.length-1 || traders[i].innerText != traders[i+1].innerText)
        log(traders[i].innerText + "\n\n\n");
}


*/