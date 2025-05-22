import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6KsEukf_ZCLihRGNIdHjxJsQa5zTIdj4",
  authDomain: "my-blog-project-78b84.firebaseapp.com",
  databaseURL: "https://my-blog-project-78b84-default-rtdb.firebaseio.com",
  projectId: "my-blog-project-78b84",
  storageBucket: "my-blog-project-78b84.firebasestorage.app",
  messagingSenderId: "531624482514",
  appId: "1:531624482514:web:17e25835a98587eb07ff0b",
  measurementId: "G-E57HREWSL0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// جلب البيانات
const blogEl = document.getElementById("blog-text");
const videoEl = document.getElementById("youtube-video"); // بدلاً من "video-frame"


get(ref(db)).then(snapshot => {
  const data = snapshot.val();
  blogEl.textContent = data.blog;
  videoEl.src = data.video;
});
