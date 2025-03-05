function saveStory() {
    let title = document.getElementById("story-title").value.trim();
    let category = document.getElementById("story-category").value.trim();
    let views = parseInt(document.getElementById("story-views").value);

    if (title === "" || category === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title, category, views });
    localStorage.setItem("stories", JSON.stringify(stories));

    alert("Truyện đã được thêm thành công!");
    window.location.href = "admin.html";
}
