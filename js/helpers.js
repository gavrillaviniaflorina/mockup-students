//functie ce primeste ce primeste ca parametru un obj si returneaza un card

let setHome = () => {


    appendCardsPerPag(1);



    window.addEventListener("resize", () => {

        appendCardsPerPag(1);
    })

    selectPage();

}


let createCard = (obj) => {
    let artic = document.createElement("article");
    artic.innerHTML = `
    
                 <img class="img" src="${obj.picture.large}" alt="">
                <article class="full">
                    <h3 class="first-name"> ${obj.name.first}</h3>
                    <h3 class="last-name">${obj.name.last}</h3>
                </article>

                <p class="mail">${obj.email}</p>
                <p class="join">Joined: ${obj.registered.date}</p>
    
    
    
    `
    artic.classList = "student";

    return artic;

}




//functie ce primeste ca parametru un arr si ataseaza carduriile 

let appendCards = (arr) => {

    let students = document.querySelector(".students");

    students.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {

        let card = createCard(arr[i]);
        students.append(card);


        // console.log(students);

    }
}


//functie ce primeste ca parametru nr paginii si ataseaza carduri

let appendCardsPerPag = (nrPag) => {

    let cards = [];
    if (window.innerWidth < 720) {
        cards = cardsPerPag(nrPag, 5, data);
    } else if (window.innerWidth < 1024) {
        cards = cardsPerPag(nrPag, 6, data);
    } else {
        cards = cardsPerPag(nrPag, 9, data);
    }

    appendCards(cards);

    attatchButtons(calculateButtons());





}



//functie ce primeste ca si parametru  nrPaginii perPagina arr


let cardsPerPag = (nrPag, perPag, arr) => {


    let currentPag = 1;

    for (let i = 0; i < arr.length; i = i + perPag) {
        if (currentPag == nrPag) {


            return arr.slice(i, i + perPag);
        }

        currentPag++;
    }




}


let attatchButtons = (nr) => {
    let buttons = document.querySelector(".buttons");
    buttons.innerHTML = '';
    for (let i = 1; i <= nr; i++) {
        let button = document.createElement("button");
        button.classList = "button";
        button.innerHTML = `${i}`;
        buttons.append(button);



    }

    //console.log(buttons);

}


let calculateButtons = () => {
    let nr = data.length;

    if (window.innerWidth < 720) {

        return Math.ceil(nr / 5);
    } else if (window.innerWidth < 1024) {
        return Math.ceil(nr / 6);
    } else {
        return Math.ceil(nr / 9);
    }
}

let selectPage = () => {

    let buttons = document.querySelector(".buttons");
    buttons.addEventListener('click', (e) => {
        let obj = e.target;

        if (obj.tagName == "BUTTON") {

            obj.classList.add("selected");

            let value = obj.textContent;

            appendCardsPerPag(value);




            console.log(obj);
            return obj;

        }
    })





}

let searchingName = (name, arr) => {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.first == name) {


            return arr[i];
        }

    }
}

let search = () => {
    let submit = document.querySelector(".submit");
    let searching = document.querySelector(".searching");

    submit.addEventListener('click', (e) => {
        let obj = e.target;

        if (obj.tagName == "BUTTON") {

            obj.classList.add("selected");

            let value = obj.textContent;

            appendCardsPerPag(value);




            console.log(obj);
        }

    })
}