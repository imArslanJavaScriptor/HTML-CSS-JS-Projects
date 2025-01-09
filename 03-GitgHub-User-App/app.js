document.addEventListener("DOMContentLoaded", () => {
    const searchBtnEl = document.getElementById("search-button")
    const usernameInputEl = document.getElementById("username") 
    const userContainerEl = document.getElementById("user-container")

    const fetchGitHubUser = async (username) => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if(!response.ok) {
          throw new Error("User not found")
        }
        const user = await response.json()
        displayUser(user)
      } catch (error) {
        userContainerEl.innerHTML = 
        `<p class="placeholder">${error.message}</p>`
        
      }
    }

    const displayUser = (user) => {
      userContainerEl.innerHTML = `
        <div class="user-card">
          <img src="${user.avatar_url}" alt="${user.login}'s avatar" />
          <div class="user-details">
            <h2>${user.name || "No Name Available"}</h2>
            <p>${user.bio || "No bio available"}</p>
            <div class="user-stats">
              <span>Repos: ${user.public_repos}</span>
              <span>Followers: ${user.followers}</span>
              <span>Following: ${user.following}</span>
            </div>
            <div class="user-link">
              <a href="${user.html_url}" target="_blank">Visit Profile</a>
            </div>
          </div>
        </div>
      `;
    };
  
    searchBtnEl.addEventListener("click", () => {
      const username = usernameInputEl.value.trim();
      if (username) {
        fetchGitHubUser(username);
      } else {
        userContainerEl.innerHTML = `<p class="placeholder">Please enter a username!</p>`;
      }
    });
  

    usernameInputEl.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchBtnEl.click();
      }
    });
    
  });
  