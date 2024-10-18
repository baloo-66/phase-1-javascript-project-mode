// Simulated database for users, videos, and comments
const database = {
    videos: [
        {
            id: 1,
            title: "My First Vlog",
            description: "This is my first vlog, hope you enjoy it!",
            views: 120,
            videoUrl: "path/to/video1.mp4",
            comments: [
                { user: "jane_doe", text: "Great vlog! Keep it up." }
            ]
        },
        {
            id: 2,
            title: "Tech Review: New Phone",
            description: "Here's my review of the latest smartphone.",
            views: 250,
            videoUrl: "path/to/video2.mp4",
            comments: [
                { user: "john_doe", text: "Very informative, thanks!" }
            ]
        }
    ]
};

// Current video ID being viewed
let currentVideoId = null;

// Load videos on page load
window.onload = function () {
    loadVideoList();
};

// Load video list into the #videos-container div
function loadVideoList() {
    const videoContainer = document.getElementById("videos-container");
    videoContainer.innerHTML = ""; // Clear the container

    database.videos.forEach(video => {
        const videoDiv = document.createElement("div");
        videoDiv.className = "video-item";
        videoDiv.textContent = video.title;
        videoDiv.onclick = () => loadVideoDetails(video.id);
        videoContainer.appendChild(videoDiv);
    });
}

// Load video details when a video is clicked
function loadVideoDetails(videoId) {
    currentVideoId = videoId;
    const video = database.videos.find(v => v.id === videoId);

    // Set video details in the DOM
    document.getElementById("video-title").textContent = video.title;
    document.getElementById("video-description").textContent = video.description;
    document.getElementById("video-views").textContent = video.views;
    document.getElementById("video-file").src = video.videoUrl;

    // Load comments
    loadComments(video.comments);
}

// Load comments into the comments section
function loadComments(comments) {
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.innerHTML = ""; // Clear old comments

    comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.textContent = `${comment.user}: ${comment.text}`;
        commentsContainer.appendChild(commentDiv);
    });
}

// Add a new comment
function addComment() {
    const commentInput = document.getElementById("comment-input");
    const newComment = commentInput.value.trim();

    if (newComment && currentVideoId) {
        // Find the current video in the database
        const video = database.videos.find(v => v.id === currentVideoId);

        // Add the new comment to the video's comments array
        video.comments.push({ user: "guest_user", text: newComment });

        // Reload comments
        loadComments(video.comments);

        // Clear the input
        commentInput.value = "";
    }
}
