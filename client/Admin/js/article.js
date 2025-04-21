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
        <td div class = "col-sm-6">{ОПИСАНИЕ}</td>
        <td>{ДАТАСОЗДАНИЯ}</td>
        <td><img src="{КАРТИНКА}" width="75px" class="img-fluid rounded-start" alt="Picture"></td>
        <td>
         <button class="btn btn-danger me-2" onclick="delete_article({ИД})">🗑</button>
         <a class="btn btn-warning" href="create_article.html?id={ИД}">✏️</a>
        </td>
    </tr>`;
    let articles = await get_article();
    let container = document.getElementById("article");
    articles.forEach(element => {
        let article = template
            .replaceAll("{ИД}", element.id)
            .replace("{ЗАГОЛОВОК}", element.Heading)
            .replace("{ОПИСАНИЕ}", element.description)
            .replace("{КАРТИНКА}", element.picture)
            .replace("{ДАТАСОЗДАНИЯ}", element.dfc);  
        container.innerHTML += article;
    });
}
render_article();
async function delete_article(id) 
{ // Удаление статьи по id
    let response = await fetch("http://localhost:8000/api/article/" + id, {"method": "DELETE"})
    if (response.ok) {
        window.location.reload();
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}