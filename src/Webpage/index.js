const button = document.getElementById("mainBtn");
button.addEventListener("click", function(){
   let articles = callNewsManager();
   createElements(articles);
});

async function callNewsManager(){


}

function createElements(articles){
    alert(articles);
}
