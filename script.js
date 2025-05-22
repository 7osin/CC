async function fetchData() {
  const res = await fetch('https://cc-five-flame.vercel.app/api/data');
  const data = await res.json();

  document.getElementById('blog-text').textContent = data.blog;
  document.getElementById('youtube-video').src = data.video;
}

fetchData();