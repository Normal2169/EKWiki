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
    <div class="card m-2 border-primary" style="max-width: 540px">
        <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" src="{КАРТИНКА}" alt="Фотография">
            </div>
            <div class="col-md-8">
                <div class="card-body text-center">
                    <h5 class="card-title">{ЗАГОЛОВОК}</h5>
                    <p class="card-text">{ОПИСАНИЕ}</p>
                    <p class="card-text"><small class="text-body-secondary">Дата создания статьи: {ДАТАСОЗДАНИЯ}</small></p>
                </div>
            </div>
        </div>
    </div>`;

    let articles = await get_article();
    let container = document.getElementById("article");
    articles.forEach(element => {
        let article = template
            .replace("{ЗАГОЛОВОК}", element.Heading)
            .replace("{ОПИСАНИЕ}", element.description)
            .replace("{КАРТИНКА}", element.picture)
            .replace("{ДАТАСОЗДАНИЯ}", element.DCF);  
        container.innerHTML += article;
    });
}

render_article();