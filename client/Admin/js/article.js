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
    <tr>
        <th scope="row">{ИД}</th>
        <td>{ЗАГОЛОВОК}</td>
        <td>{ОПИСАНИЕ}</td>
        <td>{ДАТАСОЗДАНИЯ}</td>
        <td><img src="{КАРТИНКА}" width="75px" class="img-fluid rounded-start" alt="..."></td>
    </tr>`;

    let articles = await get_article();
    let container = document.getElementById("article");
    articles.forEach(element => {
        let article = template
            .replace("{ИД}", element.id)
            .replace("{ЗАГОЛОВОК}", element.Heading)
            .replace("{ОПИСАНИЕ}", element.description)
            .replace("{КАРТИНКА}", element.picture)
            .replace("{ДАТАСОЗДАНИЯ}", element.dfc);  
        container.innerHTML += article;
    });
}

render_article();
