import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const blogInput = document.getElementById("blog-input");
const videoInput = document.getElementById("video-link");
const status = document.getElementById("status");
const saveBtn = document.getElementById("save-btn");

// تحميل البيانات الحالية
get(ref(db)).then(snapshot => {
  const data = snapshot.val();
  blogInput.value = data.blog;
  videoInput.value = data.video;
});

// عند الضغط على "حفظ"
saveBtn.addEventListener("click", async () => {
  await set(ref(db), {
    blog: blogInput.value,
    video: videoInput.value
  });
  status.textContent = "✅ تم الحفظ بنجاح!";
});
