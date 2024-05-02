/*var int*/

let dices = [];
let numberOfDices = 5;
let highestDiceNumber = 6;
let worpen = 0;
let objDiceOccurenceCounter;
let  objStats = {
        eengelijk:0,
        dubbel:0,
        drievoudig:0,
        viervoudig:0,
        vijfvoudig:0
    }; 
let lastLaunch; 
let objStatsKeys = Object.keys(objStats); 

let audio = new Audio('src/media/dices.mp3');




/*dom*/

    //img 
    let dicesDom = document.querySelector("#stenen"); 
    initializeDicesDom(false);

    //stat
    let statsDom = document.querySelector("table"); 
    initializeStatsDom(false);

    //knop
    let buttonDom = document.querySelector("button");
    buttonDom.addEventListener('click', event => {
        audio.play();
        launchDices();
        countMatch();        
        initializeDicesDom(true);
        initializeStatsDom(true);
        initializeWorpenDom(++worpen);
        initializeLastLaunchDom();
        getInfo();
    });

    //worpen
    let worpenDom = document.querySelector("#worpen");
    initializeWorpenDom();

    //last lunch
    let lastLaunchDom = document.querySelector("#last-launch");






/*function*/

    //launch
    function launchDices(){

       //zero
        dices = [];

        //random 6 
        for(let i = 0; i<numberOfDices; ++i){
            dices.push(Math.floor(Math.random() * highestDiceNumber) + 1);
        }

    }



    //initiamize
    function initializeDicesDom(dicesLaunched){
        if(!dicesLaunched){  
            //clear
            dicesDom.innerHTML = "";  
            //add           
            for(let i = 0; i<numberOfDices; ++i){
                dicesDom.innerHTML += "<img src='src/img/dobbel"+ highestDiceNumber + ".gif'>"; 
            }
        } else{
            //clear
            dicesDom.innerHTML = "";  
            //add        
            for(let i = 0; i<numberOfDices; ++i){
                dicesDom.innerHTML += "<img src='src/img/dobbel"+ dices[i] + ".gif'>"; 
            }
        }
    }



    //initialize
    function initializeStatsDom(dicesLaunched){
        if(!dicesLaunched){  
           
            statsDom.innerHTML = "";  
                    
            for(let i = 1; i<=numberOfDices; ++i){
                statsDom.innerHTML += '<tr><td>Max ' + i + ' gelijke: </td><td>0</td></tr>';
            }
        } else{
           
            statsDom.innerHTML = "";  
            
            for(k in objStats){ 
                statsDom.innerHTML += '<tr><td>Max ' + (objStatsKeys.indexOf(k)+1) + ' gelijke: </td><td>'+objStats[k]+'</td></tr>';
            }
        }
    }



    //initialize
    function initializeWorpenDom(){
        worpenDom.innerHTML = worpen+" worpen";
    }



    
    function initializeLastLaunchDom(){
        let resultaat = "Je hebt ";
        for(k in lastLaunch){
            if(lastLaunch[k]!=0){
                resultaat += "<b style='color:red;'>"+lastLaunch[k]+"</b> <b>"+k+"</b>, ";
            }
        }
        lastLaunchDom.innerHTML = resultaat == "Je hebt " ? "Je hebt niks" : resultaat.slice(0, -2)+" gegooid";
    }



    //inint dice 
    function countMatch(){
        lastLaunch = [];
        objDiceOccurenceCounter = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0
        };    
        lastLaunch = {
            eengelijk:0,
            dubbel:0,
            drievoudig:0,
            viervoudig:0,
            vijfvoudig:0
        };     
        for(let i = 0; i<dices.length; ++i){
            switch(dices[i]){
                case 1: ++objDiceOccurenceCounter[1]; break;
                case 2: ++objDiceOccurenceCounter[2]; break;
                case 3: ++objDiceOccurenceCounter[3]; break;
                case 4: ++objDiceOccurenceCounter[4]; break;
                case 5: ++objDiceOccurenceCounter[5]; break;
                case 6: ++objDiceOccurenceCounter[6]; break;
            } 
        }
        for(k in objDiceOccurenceCounter){                   
            switch(objDiceOccurenceCounter[k]){
                case 2: ++objStats.dubbel;         ++lastLaunch.dubbel;          break;
                case 3: ++objStats.drievoudig;     ++lastLaunch.drievoudig;      break;
                case 4: ++objStats.viervoudig;     ++lastLaunch.viervoudig;      break;
                case 5: ++objStats.vijfvoudig;     ++lastLaunch.vijfvoudig;      break;
            }             
        }
        
        if(noMatch()){
            ++objStats.eengelijk;         
            ++lastLaunch.eengelijk;
        }

    } 


    //no match 
    function noMatch(){
        for(k in lastLaunch){
            if(lastLaunch[k]!=0){
                return false;
            } 
        }
        return true;
    }


    
    function getInfo(){
        console.log(dices);
        console.log(objDiceOccurenceCounter);
        console.log(objStats);
        console.log(lastLaunch);
    }

