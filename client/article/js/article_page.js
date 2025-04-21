async function get_article() {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let response = await fetch("http://localhost:8000/api/article_page/" + id);
    if (response.ok) {
        let json = await response.json();
        return json; 
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}
async function render_article() {
    let template = `
    <figure class="figure rounded mx-auto d-block">
        <img src="{КАРТИНКА}" class="img-fluid rounded mx-auto d-block" alt="Тут должна была быть картинка?">
        <figcaption class="figure-caption text-center">{ЗАГОЛОВОК}</figcaption>
    </figure>
    <p class="text-lg-end">{ОПИСАНИЕ}</p>
    <h5>{ДАТАСОЗДАНИЯ}</h5>
    `;
    let article = await get_article(); 
    let container = document.getElementById("article_page");
    let element = template
        .replace("{ЗАГОЛОВОК}", article.Heading)
        .replace("{ОПИСАНИЕ}", article.description)
        .replace("{КАРТИНКА}", article.picture)
        .replace("{ДАТАСОЗДАНИЯ}", article.dfc);
    
    container.innerHTML = element; 
}

render_article();