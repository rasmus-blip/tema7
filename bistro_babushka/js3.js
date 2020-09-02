document.addEventListener("DOMContentLoaded", hentdata);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detalje = document.querySelector("#detalje");
let retter;



const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";


async function hentdata() {
    const respons = await fetch(link);
    retter = await respons.json();
    visRetter();
}

function visRetter() {
    retter.feed.entry.forEach(ret => {
        if (id == ret.gsx$id.$t) {
            visDetaljer(ret);


        }
    })
}

function visDetaljer(ret) {
    console.log(ret);
    detalje.style.display = "block";
    detalje.querySelector(".kategori").textContent = ret.gsx$kategori.$t;
    detalje.querySelector(".navn").textContent = ret.gsx$navn.$t;
    detalje.querySelector(".pris").textContent = ret.gsx$pris.$t + "kr.";
    detalje.querySelector(".lang").textContent = ret.gsx$lang.$t;
    detalje.querySelector(".oprindelse").textContent += ret.gsx$oprindelse.$t;
    detalje.querySelector(".billede").src = `imgs/small/${
                        ret.gsx$billede.$t}` + "-sm.jpg";
}
