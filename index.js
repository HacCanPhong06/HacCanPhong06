document.addEventListener("DOMContentLoaded", function() {
    loadTopStories();
    loadRankings();
    loadRecentComments();
    showUserInfo();
});

function loadTopStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let topStories = stories.sort((a, b) => b.views - a.views).slice(0, 10);
    let topStoriesContainer = document.getElementById("top-stories");

    topStoriesContainer.innerHTML = topStories.map(story => `
        <div class="story">
            <img src="${story.cover}" alt="${story.title}" width="100">
            <p>${story.title}</p>
        </div>
    `).join("");
}

function loadRankings() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    let topLiked = stories.sort((a, b) => b.likes - a.likes).slice(0, 5);
    let topRated = stories.sort((a, b) => b.rating - a.rating).slice(0, 5);

    document.getElementById("top-liked").innerHTML = topLiked.map(story => `<p>${story.title} - ❤️ ${story.likes}</p>`).join("");
    document.getElementById("top-rated").innerHTML = topRated.map(story => `<p>${story.title} - ⭐ ${story.rating.toFixed(1)}</p>`).join("");
}

function loadRecentComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let recentComments = comments.slice(-10).reverse();

    document.getElementById("recent-comments").innerHTML = recentComments.map(comment => `
        <p><strong>${comment.user}</strong>: ${comment.text}</p>
    `).join("");
}

function filterGenre(genre) {
    alert(`Lọc truyện theo thể loại: ${genre}`);
}

function showUserInfo() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        document.getElementById("user-email").textContent = currentUser;
    } else {
        document.getElementById("user-info").innerHTML = `<a href="login.html">Đăng nhập</a>`;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
}