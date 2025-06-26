const state = {
  currentPage: 1,
  currentPosts: "",
};


async function fetchPosts(page, posts) {
 state.currentPosts = posts;
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

 fetchPosts(1)
 fetchPosts(2)

// function renderPosts(posts) {

// }