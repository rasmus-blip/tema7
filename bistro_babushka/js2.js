        let filter = "alle";
        let retter;
        document.addEventListener("DOMContentLoaded", hentdata);
        const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";


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
            console.log(ret);
            location.href = `babushka_detalje.html?id=${ret.gsx$id.$t}`;
        }


        function addEventListenersToButtons() {
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.addEventListener("click", filterBTNs);
            })
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
