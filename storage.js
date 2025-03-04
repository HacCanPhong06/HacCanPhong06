const stories = [
    { title: "Truyện 1", views: 1200, rating: 4.8 },
    { title: "Truyện 2", views: 900, rating: 4.5 }
];

function loadStories() {
    const storyList = document.getElementById('story-list');
    stories.forEach(story => {
        let div = document.createElement('div');
        div.innerHTML = `<h3>${story.title}</h3><p>Lượt đọc: ${story.views}</p><p>Đánh giá: ${story.rating}</p>`;
        storyList.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", loadStories);
