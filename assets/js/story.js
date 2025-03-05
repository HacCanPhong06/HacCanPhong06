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

    // Lấy ID truyện từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get("id");

    function loadStory() {
        fetch("data/stories.json")
            .then(response => response.json())
            .then(stories => {
                const story = stories.find(s => s.id == storyId);
                if (story) {
                    document.getElementById("story-image").src = "assets/images/" + story.image;
                    document.getElementById("story-title").textContent = story.title;
                    document.getElementById("story-description").textContent = story.description;
                } else {
                    document.getElementById("story-details").innerHTML = "<p>Truyện không tồn tại.</p>";
                }
            });
    }

    function loadChapters() {
        fetch("data/chapters.json")
            .then(response => response.json())
            .then(chapters => {
                const chapterList = document.getElementById("chapter-list");
                const storyChapters = chapters.filter(c => c.storyId == storyId);

                if (storyChapters.length > 0) {
                    storyChapters.forEach(chapter => {
                        let li = document.createElement("li");
                        li.innerHTML = `<a href="chapter.html?id=${chapter.id}">${chapter.title}</a>`;
                        chapterList.appendChild(li);
                    });
                } else {
                    chapterList.innerHTML = "<p>Chưa có chương nào.</p>";
                }
            });
    }

    // Chức năng theo dõi
    document.getElementById("follow-btn").addEventListener("click", function () {
        let followedStories = JSON.parse(localStorage.getItem("followedStories")) || [];
        if (!followedStories.includes(storyId)) {
            followedStories.push(storyId);
            localStorage.setItem("followedStories", JSON.stringify(followedStories));
            alert("Đã theo dõi truyện này!");
        } else {
            alert("Bạn đã theo dõi truyện này rồi!");
        }
    });

    loadStory();
    loadChapters();
});

document.addEventListener("DOMContentLoaded", function () {
    let followBtn = document.getElementById("follow-btn");
    let storyId = getStoryId(); // Hàm lấy ID truyện hiện tại
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (!user) {
        followBtn.style.display = "none"; // Ẩn nút nếu chưa đăng nhập
        return;
    }

    let followedStories = JSON.parse(localStorage.getItem("followedStories")) || {};

    if (followedStories[user.email] && followedStories[user.email].includes(storyId)) {
        followBtn.textContent = "✅ Đang theo dõi";
    }

    followBtn.addEventListener("click", function () {
        let followed = followedStories[user.email] || [];

        if (followed.includes(storyId)) {
            followed = followed.filter(id => id !== storyId);
            followBtn.textContent = "⭐ Theo dõi";
        } else {
            followed.push(storyId);
            followBtn.textContent = "✅ Đang theo dõi";
        }

        followedStories[user.email] = followed;
        localStorage.setItem("followedStories", JSON.stringify(followedStories));
    });
});

function getStoryId() {
    let params = new URLSearchParams(window.location.search);
    return params.get("id"); // Lấy ID truyện từ URL
}

document.addEventListener("DOMContentLoaded", function () {
    let stars = document.querySelectorAll(".star");
    let ratingResult = document.getElementById("average-score");
    let storyId = getStoryId();
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    let ratings = JSON.parse(localStorage.getItem("storyRatings")) || {};

    function updateRatingDisplay() {
        let scores = ratings[storyId] || [];
        let avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0";
        ratingResult.textContent = avgScore;
    }

    stars.forEach(star => {
        star.addEventListener("click", function () {
            if (!user) {
                alert("Vui lòng đăng nhập để đánh giá!");
                return;
            }

            let score = parseInt(this.getAttribute("data-score"));
            if (!ratings[storyId]) ratings[storyId] = [];
            ratings[storyId].push(score);

            localStorage.setItem("storyRatings", JSON.stringify(ratings));
            updateRatingDisplay();
        });
    });

    updateRatingDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    let likeButton = document.getElementById("like-button");
    let likeCountDisplay = document.getElementById("like-count");
    let storyId = getStoryId();
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    let likes = JSON.parse(localStorage.getItem("storyLikes")) || {};

    function updateLikeDisplay() {
        let count = likes[storyId]?.length || 0;
        likeCountDisplay.textContent = count;
        if (user && likes[storyId]?.includes(user.email)) {
            likeButton.classList.add("liked");
            likeButton.textContent = "💔 Bỏ tim";
        } else {
            likeButton.classList.remove("liked");
            likeButton.textContent = "❤️ Thả tim";
        }
    }

    likeButton.addEventListener("click", function () {
        if (!user) {
            alert("Vui lòng đăng nhập để thả tim!");
            return;
        }

        if (!likes[storyId]) likes[storyId] = [];

        if (likes[storyId].includes(user.email)) {
            likes[storyId] = likes[storyId].filter(email => email !== user.email);
        } else {
            likes[storyId].push(user.email);
        }

        localStorage.setItem("storyLikes", JSON.stringify(likes));
        updateLikeDisplay();
    });

    updateLikeDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    let followButton = document.getElementById("follow-button");
    let followCountDisplay = document.getElementById("follow-count");
    let storyId = getStoryId();
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    let follows = JSON.parse(localStorage.getItem("storyFollows")) || {};

    function updateFollowDisplay() {
        let count = follows[storyId]?.length || 0;
        followCountDisplay.textContent = count;
        if (user && follows[storyId]?.includes(user.email)) {
            followButton.classList.add("followed");
            followButton.textContent = "🚫 Bỏ theo dõi";
        } else {
            followButton.classList.remove("followed");
            followButton.textContent = "⭐ Theo dõi";
        }
    }

    followButton.addEventListener("click", function () {
        if (!user) {
            alert("Vui lòng đăng nhập để theo dõi truyện!");
            return;
        }

        if (!follows[storyId]) follows[storyId] = [];

        if (follows[storyId].includes(user.email)) {
            follows[storyId] = follows[storyId].filter(email => email !== user.email);
        } else {
            follows[storyId].push(user.email);
        }

        localStorage.setItem("storyFollows", JSON.stringify(follows));
        updateFollowDisplay();
    });

    updateFollowDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const averageRatingDisplay = document.getElementById("average-rating");
    const storyId = new URLSearchParams(window.location.search).get("id");

    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};

    function updateAverageRating() {
        if (ratings[storyId] && ratings[storyId].length > 0) {
            let total = ratings[storyId].reduce((a, b) => a + b, 0);
            let average = (total / ratings[storyId].length).toFixed(1);
            averageRatingDisplay.textContent = average;
        } else {
            averageRatingDisplay.textContent = "0";
        }
    }

    stars.forEach(star => {
        star.addEventListener("click", function () {
            const value = parseInt(this.getAttribute("data-value"));

            if (!ratings[storyId]) ratings[storyId] = [];
            ratings[storyId].push(value);

            localStorage.setItem("ratings", JSON.stringify(ratings));

            stars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add("active");
            }

            updateAverageRating();
        });
    });

    updateAverageRating();
});
