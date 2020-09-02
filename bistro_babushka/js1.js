let filter = "alle";
let retter;
document.addEventListener("DOMContentLoaded", hentdata);
const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
const popup = document.querySelector("#popup");

async function hentdata() {
    const respons = await fetch(link);
    retter = await respons.json();
    addEventListenersToButtons();
    visRetter();
}

function visRetter() {
    const container = document.querySelector("#liste");
    const retTemplate = document.querySelector("template");
    container.innerHTML = "";
    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            let klon = retTemplate.cloneNode(true).content;
            klon.querySelector(".kategori").textContent += ret.gsx$kategori.$t;
            klon.querySelector(".navn").textContent += ret.gsx$navn.$t;
            klon.querySelector(".pris").textContent += ret.gsx$pris.$t + "kr.";
            klon.querySelector(".kort").textContent += ret.gsx$kort.$t;
            klon.querySelector(".lang").textContent += ret.gsx$lang.$t;
            klon.querySelector(".oprindelse").textContent += ret.gsx$oprindelse.$t;
            klon.querySelector(".billede").src = `imgs/small/${
                        ret.gsx$billede.$t}` + "-sm.jpg";

            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

            container.appendChild(klon);


        }
    })
}

function visDetaljer(ret) {
    popup.style.display = "block";
    popup.querySelector(".pop_navn").textContent = ret.gsx$navn.$t;
    popup.querySelector(".pop_pris").textContent = ret.gsx$pris.$t + "kr.";
    popup.querySelector(".pop_kort").textContent = ret.gsx$kort.$t;
    popup.querySelector(".pop_lang").textContent = ret.gsx$lang.$t;
    popup.querySelector(".pop_oprindelse").textContent += ret.gsx$oprindelse.$t;
    popup.querySelector(".pop_billede").src = `imgs/small/${
                        ret.gsx$billede.$t}` + "-sm.jpg";

}

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

document.querySelector("#luk").addEventListener("click", lukPopup);

function lukPopup() {
    popup.style.display = "none";
}


function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();

}
