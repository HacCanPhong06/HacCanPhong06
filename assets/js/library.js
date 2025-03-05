document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    let libraryList = document.getElementById("library-list");

    if (!user) {
        libraryList.innerHTML = "<p>Vui lòng đăng nhập để xem thư viện!</p>";
        return;
    }

    let followedStories = JSON.parse(localStorage.getItem("followedStories")) || {};
    let userStories = followedStories[user.email] || [];

    if (userStories.length === 0) {
        libraryList.innerHTML = "<p>Chưa có truyện nào trong thư viện.</p>";
        return;
    }

    let allStories = JSON.parse(localStorage.getItem("stories")) || [];

    userStories.forEach(storyId => {
        let story = allStories.find(s => s.id === storyId);
        if (story) {
            let li = document.createElement("li");
            li.innerHTML = `<a href="story.html?id=${story.id}">${story.title}</a>`;
            libraryList.appendChild(li);
        }
    });
});
