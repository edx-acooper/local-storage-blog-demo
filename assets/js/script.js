const submitBtn = document.querySelector('#submit');
const modeBtn = document.querySelector('#mode');
const contentInput = document.querySelector('#content');
const titleInput = document.querySelector('#title');
const userNameInput = document.querySelector('#username');
const postsEl = document.querySelector('#posts');
const htmlEl = document.querySelector('html');

const setTheme = function() {
  htmlEl.dataset.theme = localStorage.getItem('theme');
}

const renderPosts = function() {
  // Retrives data from localStorage if it exists.
  const data = localStorage.getItem('posts');

  // Parse the data and tf no posts are stored, provide an empty array
  const posts = JSON.parse(data) || [];

  for (let post of posts) {
    const headerEl = document.createElement('header');
    const blogPostEl = document.createElement('article');
    const pEl = document.createElement('p');
    const footerEl = document.createElement('footer');

    headerEl.textContent = post.title; 
    pEl.textContent = post.content;
    footerEl.textContent = post.username;

    blogPostEl.appendChild(headerEl);
    blogPostEl.appendChild(pEl);
    blogPostEl.appendChild(footerEl);
    postsEl.prepend(blogPostEl);
  }
}

const toggleTheme = function() {
  if (htmlEl.dataset.theme === 'dark') {
    htmlEl.dataset.theme = 'light';
  } else {
    htmlEl.dataset.theme = 'dark';
  }
  localStorage.setItem('theme', htmlEl.dataset.theme);
}

const handleSubmit = function(event) {
  event.preventDefault();

  // Retrives data from localStorage if it exists.
  const data = localStorage.getItem('posts');

  // Parse the data and tf no posts are stored, provide an empty array
  const posts = JSON.parse(data) || [];

  // Retrives the title input's value and trims unecessary whitespace 
  const content = contentInput.value.trim();
  const title = titleInput.value.trim();
  const username = userNameInput.value.trim();
  
  // Creates a post object
  const post = {
    content: content,
    title: title,
    username: username,
  };

  // Append the post object to the posts collection
  posts.push(post);

  // Serialize the data prior to saving to localStorage
  const serializedData = JSON.stringify(posts);

  // Save serialized data to localStorage
  localStorage.setItem('posts', serializedData);

  setTimeout(function() {
    location.assign('./blog.html');
  }, 250);
};


if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

if (modeBtn) modeBtn.addEventListener('click', toggleTheme);

if (postsEl) renderPosts();

setTheme();
