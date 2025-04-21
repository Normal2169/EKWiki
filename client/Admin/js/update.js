async function get_article(id) {
    let response = await fetch("http://localhost:8000/api/article/" + id)
    if (response.ok) {
        let json = await response.json()
        return json
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}
async function update_form() {
    let params = new URLSearchParams(document.location.search)
    let id = params.get("id")
    if (id == null) {
        document.getElementById("_button").innerText = "Добавить"
        document.getElementById("_button").onclick = add_article
        return
    }
    document.getElementById("_button").innerText = "Редактировать"
    document.getElementById("_button").onclick = edit_article
    let article = await get_article(id)
    document.getElementById("Heading").value = article["Heading"]
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
    })
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
    })
    if (response.ok) {
        window.location = "./"
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}
update_form()