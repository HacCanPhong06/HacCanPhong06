const ADMIN_EMAIL = "sachcuameonho@gmail.com"; // Thay email admin của bạn vào đây

function checkAdmin() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser !== ADMIN_EMAIL) {
        alert("Bạn không có quyền truy cập!");
        window.location.href = "index.html";
    }
}

function addStory() {
    let title = document.getElementById("story-title").value;
    let genre = document.getElementById("story-genre").value;
    let desc = document.getElementById("story-desc").value;
    let tags = document.getElementById("story-tags").value;
    let cover = document.getElementById("story-cover").files[0];

    if (title && genre && desc && tags && cover) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let newStory = {
                title, genre, desc, tags,
                cover: e.target.result
            };
            let stories = JSON.parse(localStorage.getItem("stories")) || [];
            stories.push(newStory);
            localStorage.setItem("stories", JSON.stringify(stories));
            alert("Thêm truyện thành công!");
            displayStories();
        };
        reader.readAsDataURL(cover);
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function displayStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let storyList = document.getElementById("story-list");
    storyList.innerHTML = "";
    
    stories.forEach((story, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${story.title} - ${story.genre}</span>
            <button class="delete" onclick="deleteStory(${index})">Xóa</button>
        `;
        storyList.appendChild(li);
    });
}

function deleteStory(index) {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.splice(index, 1);
    localStorage.setItem("stories", JSON.stringify(stories));
    displayStories();
}