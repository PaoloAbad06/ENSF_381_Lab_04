const USERS_API_URL ="https://69a1e23a2e82ee536fa2780d.mockapi.io/users_api/users_api";

const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

let users = [];

function render(userArray) {
  if (!Array.isArray(userArray) || userArray.length === 0) {
    userGrid.innerHTML = "No users loaded.";
    return;
  }

  let html = "";
  for (let i = 0; i < userArray.length; i++) {
    const user = userArray[i];

    html += `
      <article class="user-card">
        <h3>${user.first_name}</h3>
        <p>first_name: ${user.first_name}</p >
        <p>user_group: ${user.user_group}</p >
        <p>id: ${user.id}</p >
      </article>
    `;
  }

  userGrid.innerHTML = html;
}

async function retrieveData() {
  try {
    const res = await fetch(USERS_API_URL);

    if (!res.ok) {
      console.error("Failed to fetch users. Status:", res.status);
      userGrid.innerHTML = "Failed to load users.";
      return;
    }

    users = await res.json();
    console.log(users);

    render(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    userGrid.innerHTML = "Error loading users.";
  }
}

retrieveData();

viewToggleBtn.addEventListener("click", () => {
  if (userGrid.classList.contains("grid-view")) {
    userGrid.classList.remove("grid-view");
    userGrid.classList.add("list-view");
  } else if (userGrid.classList.contains("list-view")) {
    userGrid.classList.remove("list-view");
    userGrid.classList.add("grid-view");
  } else {
    userGrid.classList.add("grid-view");
  }
})