async function get_article(id) {
    let response = await fetch("http://localhost:8000/api/article/" + id) // Отправляем запрос на API
    if (response.ok) {
        let json = await response.json()
        return json
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}
async function update_form() {
    let params = new URLSearchParams(document.location.search) // Находит айди в поисковике
    let id = params.get("id") // Переменной id присваиваем params.get
    if (id == null) {
        document.getElementById("_button").innerText = "Добавить"
        document.getElementById("_button").onclick = add_article
        return
    }
    document.getElementById("_button").innerText = "Редактировать" // Замена текста у кнопки, если есть айди
    document.getElementById("_button").onclick = edit_article
    let article = await get_article(id)
    document.getElementById("Heading").value = article["Heading"]  // Получение элементов и вставка их в форму
    document.getElementById("description").value = article["description"]
    document.getElementById("picture").value = article["picture"]
    document.getElementById("dfc").value = article["dfc"]

}
async function edit_article() {
    let params = new URLSearchParams(document.location.search)
    let id = params.get("id")
    let response = await fetch("http://localhost:8000/api/article/" + id, {
        method: "PUT",
        body: new FormData(document.getElementById("article_form"))
    }) // Отправка данных для изменения статьи
    if (response.ok) {
        window.location = "./"
    } 
    else { 
        alert("Ошибка HTTP: " + response.status)
        alert("Ошибка")
        
    }
}
async function add_article() {
    let response = await fetch("http://localhost:8000/api/article", 
    {
        method: "POST",
        body: new FormData(document.getElementById("article_form"))
    }) // Отправка данных на добавление статьи
    if (response.ok) {
        window.location = "./" // Возвращаем на страницу назад
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}
update_form()