const button = document.getElementById("mainBtn");
const mainContain = document.getElementById("mainContainer");

button.addEventListener("click", function(){
    callNewsManager().then((articles) => {
        mainContain.innerHTML = "";
        createElements(articles);
   }).catch((err) => {
        fetch('../Test/Test.txt')
            .then(response => response.text())
            .then(text => {
                mainContain.innerHTML = "";
                createElements(text); // Your text file content is here
            })
            .catch(error => console.error('Error fetching the file:', error));
        console.log(err);
   })

});

async function callNewsManager(){
    let res = await fetch('http://localhost:8080/api/run');
    let result = await res.text();
    console.log(result);
    return result;
}

function createElements(articles) {
    const blocks = articles.split("Title: ").slice(1); // one chunk per article

    for (const block of blocks) {
        const get = (label) => {
            const m = block.match(new RegExp("^" + label + ": (.*)$", "m"));
            return m ? m[1] : "";
        };

        const newElement = document.createElement("div");
        newElement.className = "newsContain";

        const title = document.createElement("h3");
        title.className = "title";
        // the title is the first line of the block, since "Title: " was the split point
        title.textContent = block.split("\n")[0];

        const link = document.createElement("a");
        link.href = get("Link");
        link.textContent = "LINK";

        const summary = document.createElement("p");
        summary.className = "summary";
        summary.textContent = get("Summary");

        const facts = document.createElement("p");
        facts.className = "facts";
        facts.textContent = get("Important Detail");

        newElement.append(title, link, summary, facts);
        newElement.addEventListener("click", function(){
            window.open(link.href, '_blank');
        });
        mainContain.appendChild(newElement);
    }
}
