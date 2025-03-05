document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let storyIndex = params.get("index");

    if (storyIndex === null) {
        alert("Không tìm thấy truyện!");
        window.location.href = "admin.html";
        return;
    }

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let story = stories[storyIndex];

    if (!story) {
        alert("Truyện không tồn tại!");
        window.location.href = "admin.html";
        return;
    }

    document.getElementById("story-index").value = storyIndex;
    document.getElementById("story-title").value = story.title;
    document.getElementById("story-category").value = story.category;
    document.getElementById("story-views").value = story.views;
});

function updateStory() {
    let storyIndex = document.getElementById("story-index").value;
    let title = document.getElementById("story-title").value.trim();
    let category = document.getElementById("story-category").value.trim();
    let views = parseInt(document.getElementById("story-views").value);

    if (title === "" || category === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories[storyIndex] = { title, category, views };
    localStorage.setItem("stories", JSON.stringify(stories));

    alert("Cập nhật truyện thành công!");
    window.location.href = "admin.html";
      }
