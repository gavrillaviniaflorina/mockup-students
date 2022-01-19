//functie ce primeste ce primeste ca parametru un obj si returneaza un card

let setHome = () => {


    appendCardsPerPag(1, data);

    attatchButtons(calculateButtons());

    window.addEventListener("resize", () => {

        appendCardsPerPag(1, data);
        attatchButtons(calculateButtons());
    })


    let buttons = document.querySelector(".buttons");

    buttons.addEventListener('click', (e) => {
        let obj = e.target;

        if (obj.tagName == "BUTTON") {
            let val = obj.textContent;
            appendCardsPerPag(val, data);
            obj.classList.add("selected");

        }
    })


    //search();


    let input = document.querySelector(".searching");

    input.addEventListener("input", (e) => {


        let text = input.value;


        let arr = searchingName(text);


        if (arr.length > 0) {
            appendCardsPerPag(1, [...arr]);
        } else {
            let students = document.querySelector(".students");
            students.innerHTML = `<setion>No results</section>`;
        }



    })


    createOver();





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




    }
}

let createOver = () => {
    let students = document.querySelector(".students");
    let body = document.querySelector(".body");
    let over = document.createElement("section");


    students.addEventListener("click", (e) => {
        let obj = e.target;


        if (obj.tagName == "IMG") {



            over.classList = "over";



            let result = document.createElement("article");
            result.classList = "student1";
            let parent = obj.parentNode;
            result.innerHTML = `${parent.innerHTML}`;

            let left = document.createElement("i");
            left.classList = "fas";
            left.classList.add("fa-arrow-left");

            result.appendChild(left);


            let right = document.createElement("i");
            right.classList = "fas";
            right.classList.add("fa-arrow-right");

            result.appendChild(right);



            over.appendChild(result);
            body.appendChild(over);
            arrowRight();


        }


    })


    // over.addEventListener(("click"), (e) => {



    //     over.removeChild(over.firstElementChild);
    //     body.removeChild(over);
    // })



}



let arrowRight = () => {
    let right = document.querySelector(".fa-arrow-right");
    // let student1 = document.querySelector("student1");
    let over = document.querySelector(".over");
    let student1 = over.firstElementChild;

    right.addEventListener("click", (e) => {

        let email = student1.firstElementChild.nextElementSibling.nextElementSibling.textContent;
        console.log(email);
        let a = searchNext(email);
        console.log(a);
        over.removeChild(over.firstElementChild);
        let card = createCard(searchNext(email));


        card.classList = "student1";

        let left = document.createElement("i");
        left.classList = "fas";
        left.classList.add("fa-arrow-left");

        let right = document.createElement("i");
        right.classList = "fas";
        right.classList.add("fa-arrow-right");

        card.append(left);
        card.append(right);

        over.appendChild(card);


    })
}






//functie ce primeste ca parametru nr paginii si ataseaza carduri

let appendCardsPerPag = (nrPag, arr) => {

    let cards = [];
    if (window.innerWidth < 720) {
        cards = cardsPerPag(nrPag, 5, arr);
    } else if (window.innerWidth < 1024) {
        cards = cardsPerPag(nrPag, 6, arr);
    } else {
        cards = cardsPerPag(nrPag, 9, arr);
    }

    appendCards(cards);


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
        button.classList.add("button");
        button.innerHTML = `${i}`;
        buttons.append(button);
    }




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


let searchingName = (name) => {
    let arr = data;
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.first.includes(name) || arr[i].name.last.includes(name)) {

            results.push(arr[i]);
        }
    }


    return results;

}

let searchNext = (mail) => {

    let arr = data;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].email.includes(mail)) {
            console.log(arr[i + 1]);

            break;


        }
        return arr[i + 1];
    }
}