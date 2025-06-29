const state = {
  currentPage: 1,
  currentPosts: "",
  isRateLimit: false,
};

async function fetchPosts(page) {
  state.isRateLimit = true;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR Fetching by posts: ", error.message);
  } finally {
    console.log("Finished fetching by posts");
  }
}

function renderPosts(posts) {
  state.currentPosts = posts;
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  posts.forEach((posts) => {
    const postsElm = document.createElement("div");
    postsElm.className = "border rounded-sm p-3 bg-amber-50 text-amber-500";

    const UserElm = document.createElement("p");
    UserElm.innerHTML = posts.userId;
    UserElm.className = "font-bold";

    const idElm = document.createElement("p");
    idElm.innerHTML = posts.id;
    idElm.className = "font-bold";

    const titleElm = document.createElement("p");
    titleElm.innerHTML = posts.title;

    const bodyElm = document.createElement("p");
    bodyElm.innerHTML = posts.body;

    postsElm.appendChild(UserElm);
    postsElm.appendChild(idElm);
    postsElm.appendChild(titleElm);
    postsElm.appendChild(bodyElm);

    postsContainer.appendChild(postsElm);
  });
}

function renderPagination() {
  const totalPages = 10; // there are 100 total posts in the API

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";
  const prevBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");

  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage === totalPages;

  //previous button doesn't work on first click for some reason
  prevBtn.onclick = async () => {
    if (state.isRateLimit) {
      alert("Rate limit exceeded. Please wait.");
      return;
    }

    state.isRateLimit = true;
    state.currentPage--;

    const data = await fetchPosts(state.currentPage);
    renderPosts(data);
    renderPagination();

    setTimeout(() => (state.isRateLimit = false), 2000);
  };

  nextBtn.onclick = async () => {
    if (state.isRateLimit) {
      alert("Rate limit exceeded. Please wait.");
      return;
    }

    state.isRateLimit = true;

    const data = await fetchPosts(state.currentPage);
    renderPosts(data);
    renderPagination();

    state.currentPage++;

    setTimeout(() => (state.isRateLimit = false), 2000);
  };

  const pageCountElem = document.createElement("p");
  pageCountElem.innerHTML = `Page ${state.currentPage}`; //can't figure out how to get rid on the "Page 1" showing up initially
  pageCountElem.className = "text-center font-bold text-amber-500";
  paginationContainer.appendChild(pageCountElem);
}

renderPagination();
