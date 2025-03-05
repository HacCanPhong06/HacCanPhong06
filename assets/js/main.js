document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        document.getElementById("username").textContent = user.username;
    } else {
        window.location.href = "login.html"; // Chuyển về trang đăng nhập nếu chưa đăng nhập
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });

    function loadStories() {
        fetch("data/stories.json")
            .then(response => response.json())
            .then(stories => {
                const hotStoriesContainer = document.querySelector("#hot-stories .story-list");
                hotStoriesContainer.innerHTML = stories.slice(0, 5).map(story => `
                    <div class="story">
                        <img src="assets/images/${story.image}" alt="${story.title}">
                        <h3><a href="story.html?id=${story.id}">${story.title}</a></h3>
                        <p>${story.description}</p>
                    </div>
                `).join("");
            });
    }

    function loadRanking() {
        fetch("data/stories.json")
            .then(response => response.json())
            .then(stories => {
                const rankingContainer = document.querySelector("#ranking .ranking-list");
                stories.sort((a, b) => b.likes - a.likes);
                rankingContainer.innerHTML = stories.slice(0, 5).map((story, index) => `
                    <div class="rank">
                        <span>#${index + 1}</span>
                        <h3><a href="story.html?id=${story.id}">${story.title}</a></h3>
                        <p>${story.likes} lượt thích</p>
                    </div>
                `).join("");
            });
    }

    function loadComments() {
        fetch("data/comments.json")
            .then(response => response.json())
            .then(comments => {
                const commentContainer = document.querySelector("#latest-comments .comment-list");
                commentContainer.innerHTML = comments.slice(0, 10).map(comment => `
                    <div class="comment">
                        <strong>${comment.user}:</strong>
                        <p>${comment.text}</p>
                    </div>
                `).join("");
            });
    }

    loadStories();
    loadRanking();
    loadComments();
});
