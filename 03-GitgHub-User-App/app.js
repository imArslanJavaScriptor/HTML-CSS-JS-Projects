document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("username");
    const userContainer = document.getElementById("user-container");
  
    const fetchGitHubUser = async (username) => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const user = await response.json();
        displayUser(user);
      } catch (error) {
        userContainer.innerHTML = `<p class="placeholder">${error.message}</p>`;
      }
    };
  
    const displayUser = (user) => {
      userContainer.innerHTML = `
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
  
    searchButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username) {
        fetchGitHubUser(username);
      } else {
        userContainer.innerHTML = `<p class="placeholder">Please enter a username!</p>`;
      }
    });
  
    usernameInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
  });
  