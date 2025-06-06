async function get_article() {
    let response = await fetch("http://localhost:8000/api/article/all");
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function render_article() {
    let template = `
    <div class="card m-2 border-primary align-items-center d-flex justify-content-center" style="max-width: 540px">
        <div class="row g-0">
            <div class="col-md-4 d-flex">
                <img class="img-fluid rounded-start" src="{КАРТИНКА}" alt="Фотография">
            </div>
            <div class="col-md-8">
                <div class="card-body text-center">
                    <a href="page.html?id={ИД}" class="card-title link-body-emphasis link-offset-2 link-underline-opacity-0">{ЗАГОЛОВОК}</a>
                    <p class="card-text">{ОПИСАНИЕ}</p>
                    <p class="card-text"><small class="text-body-secondary">Дата создания статьи:{ДАТАСОЗДАНИЯ}</small></p>
                </div>
            </div>
        </div>
    </div>`;

    let articles = await get_article();
    let container = document.getElementById("article");
    articles.forEach(element => {
        let article = template
            .replaceAll("{ЗАГОЛОВОК}", element.Heading)
            .replace("{ОПИСАНИЕ}", element.description)
            .replace("{КАРТИНКА}", element.picture)
            .replace("{ДАТАСОЗДАНИЯ}", element.dfc)  
            .replaceAll("{ИД}", element.id);  
        container.innerHTML += article;
    });
}

render_article();
