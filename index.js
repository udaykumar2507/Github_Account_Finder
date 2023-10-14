const url = "https://api.github.com/users";
const searchElement = document.getElementById("searchinput");
const searchButton = document.getElementById("button");
const profileContainerEl = document.querySelector(".profilecontainer"); // Updated ID
const loadingEl = document.querySelector(".loading"); // Updated ID

const generateProfile = (profile) => {
    const profileDiv = document.querySelector(".profile"); // Select the profile div
    profileDiv.style.display = "none"; // Hide the profile div

    return `
    <div class="profile">
        <div class="top_section">
            <div class="top_left">
                <div class="image">
                    <img alt="avatar" src="${profile.avatar_url}" height="150" />
                </div>
                <div class="self">
                    <h3>${profile.name}</h3>
                    <h3>${profile.login}</h3>
                </div>
            </div>
            <a href="${profile.html_url}">
                <button class="btn">Check Profile</button>
            </a>
        </div>
        <div class="ABOUT">
            <h1>About</h1>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="follower">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="follower">
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>
            <div class="follower">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>
   `;
};


const fetchProfile = async () => {
    const username = searchElement.value;
    loadingEl.innerText = "Loading..."; // Updated ID
    loadingEl.style.color = "black"; // Updated ID

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if (data.bio) {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        } else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red";
        }
        console.log("data", data);
    } catch (error) {
        console.log({ error });
        loadingEl.innerText = "";
    }
};

searchButton.addEventListener("click", fetchProfile);
