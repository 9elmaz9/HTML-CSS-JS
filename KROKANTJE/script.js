

let objAllDishes = {

    dish1 : {
        category: "Voorgerechten",
        name : "Sprinkhaan",
        price : 5.99,
        description : "Krokante sprinkhaan op een bedje van kakkerlak",
        foto: "Foto1.jpg",
        aantaal: 0
    },  
    dish2 : {
        category: "Voorgerechten",
        name : "Tandoori Burger",
        price : 4.99,
        description : "Burger op basis van Tandoori, een snelle hap als hongerstillertje",
        foto: "Foto3.jpg",
        aantaal: 0
    },           
    dish3 : {
        category: "Voorgerechten",
        name : "Cupcake",
        price : 2.99,
        description : "Eetbare Cupcake, met wormpjes",
        foto: "Foto9.jpg",
        aantaal: 0
    },      


    dish4 : {
        category: "Hoofdgerechten",
        name : "Sushi",
        price : 7.99,
        description : "Speciale sushi met een summum aan krakertjes",
        foto: "Foto8.jpg",
        aantaal: 0
    },       
    dish5 : {
        category: "Hoofdgerechten",
        name : "Insect Burger",
        price : 4.99,
        description : "Een burger met lekkers en Pont-Neuf frietjes",
        foto: "Foto5.jpg",
        aantaal: 0
    },       
    dish6 : {
        category: "Hoofdgerechten",
        name : "Salade",
        price : 1.99,
        description : "Salade op basis van zelfgevonden items",
        foto: "Foto10.jpg",
        aantaal: 0
    },        


    dish7 : {
        category: "Desserts",
        name : "Lolly",
        price : 2.99,
        description : "Een lolly met inhoud, een vleugje notalgie",
        foto: "Foto6.jpg",
        aantaal: 0
    },        
    dish8 : {
        category: "Desserts",
        name : "Ijsje",
        price : 2.99,
        description : "Lekker ijs met licht glimmende worms on the side",
        foto: "Foto7.jpg",
        aantaal: 0
    }      

};

let selectedDish;

let nbrButtonOrderPressed = 0;

//




/*Dom*/

//mp3
let audio = new Audio('src/media/music.mp3');
let pop = new Audio('src/media/pop.mp3');
let cashier = new Audio('src/media/cashier.mp3');
let audioIsPlaying = true;
let mia = new Audio('src/media/mia.mp3');
audio.play();
let audioDom = document.querySelector("#audioicone");
audioDom.addEventListener('click', event => {
    audioPlay();
});

//choice
let choicesDom = document.querySelector('#keuze');
choicesDom.addEventListener('change', function() {
    let selectedOptions = [];
    let options = choicesDom.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            for(dish in objAllDishes){
                if(objAllDishes[dish].name == options[i].value){
                    selectedDish = objAllDishes[dish];
                    aantaalDom.value = selectedDish.aantaal;
                    changeDish(selectedDish);
                    break;
                }
            }
            break;
        }
    }    
});

//select
let categoryDom = document.querySelector('#gang');
categoryDom.addEventListener('change', function() {
    let selectedOptions = [];
    let options = categoryDom.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            changeCategory(options[i].value);
        }
    }
});

//aantal
let aantaalDom = document.querySelector('#aantaal');
aantaalDom.addEventListener('change', function() {
    selectedDish.aantaal = aantaalDom.value;
    pop.play();
});

//order
let orderButtonDom = document.querySelector('#order-button');
orderButtonDom.addEventListener('mousedown', function() {
    orderButtonDom.style.backgroundColor = '#0daabe';
});
orderButtonDom.addEventListener('mouseup', function() {
    orderButtonDom.style.backgroundColor = 'black';
});
orderButtonDom.addEventListener('mouseout', function() {
    orderButtonDom.style.backgroundColor = 'black';
});
orderButtonDom.addEventListener('click', function() {
    placeOrder();
    ++nbrButtonOrderPressed;
    if(nbrButtonOrderPressed==10){   
        nbrButtonOrderPressed=0;         
        audioIsPlaying = true;
        audioPlay();
        mia.play();
    }
});

//symarry
orderSummaryDom = document.querySelector("#bestelling");
orderSummaryDom.style.display = "none";


let dishDom = document.querySelector("#beschrijving");


iconeHomeDom = document.querySelector("#homeicone");
iconeHomeDom.addEventListener('click', function() {
    homepage();
});






/*functions*/

//back
function homepage(){

    dishDom.innerHTML = "";

    dishDom.innerHTML += `
        <div>   
            <video autoplay loop muted>                    
                <source src="src/media/videonosound.mp4" type="video/mp4">
            </video>               
        </div> 
    `;   

    //tag
    window.scrollTo(0, 0);
            
}

//change
function changeDish(dish){

    dishDom.innerHTML = "";

    dishDom.innerHTML += `
        <div> 
            <img id="imgDish" src="src/media/`+dish.foto+`">                   
        </div>                
        <div id="product-description">
            <h4><span>Naam :</span></h4>  
            <p>`+dish.name+`</p> 
        
            <h4><span>Prijs :</span></h4>  
            <p>`+dish.price+` €</p>   
        
            <h4><span>Beschrijven :</span></h4>  
            <p>`+dish.description+`</p>               
        </div> 
    `;                   
}

//chanfe2
function changeCategory(name){
    switch(name){
            case "Voorgerechten": 
                choicesDom.innerHTML = `            
                    <option value="Sprinkhaan">Sprinkhaan</option>
                    <option value="Tandoori Burger">Tandoori Burger</option>
                    <option value="Cupcake">Cupcake</option> 
                `;   
                break;
            case "Hoofdgerechten": 
                choicesDom.innerHTML = `   
                    <option value="Sushi">Sushi</option>
                    <option value="Insect Burger">Insect Burger</option>
                    <option value="Salade">Salade</option>  
                `;    
                break;
            case "Desserts": 
                choicesDom.innerHTML = `                        
                    <option value="Lolly">Lolly</option>
                    <option value="Ijsje">Ijsje</option>    
                `;    
                break;
    }
            
}


function placeOrder(){
    
   
    cashier.play();

    //SHOW SECTION
    orderSummaryDom.style.display = "flex";        

    //RESET SECTION
    let bestellingDom = document.querySelector("#bestelling");
    bestellingDom.innerHTML = `
        <div>
            <h2>Uw Bestellingen :</h2>          
        </div>  
    `;

    //INIT TOTAL
    let total = 0;

    //SHOW PRICE OF EACH DISH
    for(dish in objAllDishes){
        if(objAllDishes[dish].aantaal > 0 ){
            total+= (objAllDishes[dish].price * objAllDishes[dish].aantaal);
            bestellingDom.innerHTML += `               
                <div class="bestelling-summary">
                    `+objAllDishes[dish].category+`<br>
                    `+objAllDishes[dish].name+`, Prijs: `+objAllDishes[dish].price+` €, Aantaal: `+objAllDishes[dish].aantaal+`
                </div>
            `; 
        }
    }

    //ADD TOTAL PRICE
    bestellingDom.innerHTML += `               
        <div class="bestelling-summary" id="total">
            TOTAL: `+total.toFixed(2)+` €
        </div>
    `; 

    //SCROLL DOWN TO SECTION
    window.scrollTo(0, document.body.scrollHeight);
}


//AUDIO PLAYING
function audioPlay(){
    if(!audioIsPlaying) {
        audio.play();
        mia.pause();
        audioDom.src = "src/media/pause.png";
        audioIsPlaying = true;
    } else{
        audio.pause();
        audioDom.src = "src/media/play.png";
        audioIsPlaying = false;
    } 
}

/*@@@@ END OF FUNCTIONS*/