document.addEventListener("DOMContentLoaded", function () {
    // Chế độ Dark Mode
    let mode = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("light-mode", mode === "light");

    document.getElementById("toggle-mode").addEventListener("click", function () {
        mode = mode === "dark" ? "light" : "dark";
        localStorage.setItem("theme", mode);
        document.body.classList.toggle("light-mode", mode === "light");
        this.textContent = mode === "light" ? "🌞 Chế độ sáng" : "🌙 Chế độ tối";
    });

    // Kiểm tra đăng nhập
    let user = localStorage.getItem("user");
    if (user) {
        let userData = JSON.parse(user);
        document.getElementById("login-link").textContent = `Xin chào, ${userData.name}`;
        if (userData.role === "admin") {
            document.getElementById("admin-link").style.display = "inline";
        }
    }

    // Load truyện hot và bình luận gần đây
    loadHotStories();
    loadRecentComments();
});

function loadHotStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let hotStories = stories.sort((a, b) => b.views - a.views).slice(0, 5);
    let container = document.getElementById("hot-stories");
    container.innerHTML = hotStories.map(story =>
        `<div class="story">
            <img src="${story.cover}" alt="${story.title}">
            <h3>${story.title}</h3>
            <p>${story.views} lượt đọc</p>
        </div>`
    ).join("");
}

function loadRecentComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let recentComments = comments.slice(-5);
    let container = document.getElementById("recent-comments");
    container.innerHTML = recentComments.map(comment =>
        `<div class="comment">
            <p><strong>${comment.user}:</strong> ${comment.text}</p>
        </div>`
    ).join("");
                        }
