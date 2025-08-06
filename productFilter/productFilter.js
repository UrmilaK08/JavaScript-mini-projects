let products={
    data:[
        {
            productName:"Regular White Shirt",
            category:"Shirts",
            price:"710",
            image:"./assets/shirt.webp",
        },
        {
            productName:"Beige Short Skirt",
            category:"Bottomwear",
            price:"456",
            image: "./assets/skirt.avif"
        },
        {
            productName:"Black Leather",
            category:"Jacket",
            price:"397",
            image:"./assets/jacket.webp",
        },
        {
            productName:"Stylish Pink Watch",
            category:"Watch",
            price:"496",
            image:"./assets/watch.jpg",
        },
        {
            productName:"Basic Knitted Top",
            category:"Topwear",
            price:"266",
            image:"./assets/top.png",
        },
        {
            productName:"White Leather Jacket",
            category:"Jacket",
            price:"407",
            image:"./assets/jacket2.webp",
        },

    ]
};
for(let i of products.data){
    //to create a card
    let card=document.createElement("div");

    //card should have category
    card.classList.add("card", i.category, "hide");

    //img div
    let imgContainer=document.createElement("div");
    imgContainer.classList.add("image-conatiner");

    //img tag
    let image=document.createElement("img");
    image.setAttribute("src",i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);

    //container
    let container = document.createElement("div");
    container.classList.add("container");

    //product name
    let name=document.createElement("h5");
    name.classList.add("product-name");
    name.innerText=i.productName.toUpperCase();
    container.appendChild(name);

    //price
    let price=document.createElement("h6")
    price.innerText=i.price;
    container.appendChild(price)


    card.appendChild(container)
    document.getElementById("products").appendChild(card);
}

//parameter passes from button(parameter same as category)
function filterProduct(value){
    let buttons=document.querySelectorAll(".button-value");
    buttons.forEach((button)=>{
        if(value.toUpperCase()==button.innerText.toUpperCase()){
            button.classList.add("active");
        }
        else{
            button.classList.remove("active");
        }
    });

    let elements=document.querySelectorAll(".card");

    elements.forEach(element =>{
        //display all cards in "all" button 
        if(value=="all"){
            element.classList.remove("hide");
        }
        else{
            if(element.classList.contains(value)){
                element.classList.remove("hide");
            }
            else{
                element.classList.add("hide");
            }
        }
    })
}

//search button click
document.getElementById("search").addEventListener("click",()=>{
    let searchInput=document.getElementById("search-input").value;
    let elements=document.querySelectorAll(".product-name");
    let cards=document.querySelectorAll(".card");
    
    elements.forEach((element,index)=>{
        if(element.innerText.includes(searchInput.toUpperCase()))
        {
           //display matching card
           cards[index].classList.remove("hide");
        }
        else{
            cards[index].classList.add("hide");
        }
    });
    
    console.log(searchInput);
});

window.onload=()=>{
    filterProduct("all");
}