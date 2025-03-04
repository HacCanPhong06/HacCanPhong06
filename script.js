// Dữ liệu mẫu
let users = JSON.parse(localStorage.getItem('users')) || [];
let stories = JSON.parse(localStorage.getItem('stories')) || [];
const adminEmail = 'sachcuameonho@gmail.com';

// Đăng ký
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    const user = { email, username, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
    window.location.href = 'login.html';
});

// Đăng nhập
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        alert('Đăng nhập thành công!');
        if (email === adminEmail) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
});

// Thêm truyện (admin)
document.getElementById('story-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('story-title').value;
    const author = document.getElementById('story-author').value;
    const description = document.getElementById('story-description').value;

    const story = { title, author, description };
    stories.push(story);
    localStorage.setItem('stories', JSON.stringify(stories));
    alert('Thêm truyện thành công!');
    loadStories();
});

// Hiển thị truyện
function loadStories() {
    const storyList = document.getElementById('story-list') || document.getElementById('admin-story-list');
    storyList.innerHTML = stories.map(story => `
        <div class="story-item">
            <h3>${story.title}</h3>
            <p><strong>Tác giả:</strong> ${story.author}</p>
            <p>${story.description}</p>
        </div>
    `).join('');
}

// Load truyện khi trang được tải
window.onload = function () {
    loadStories();
};
