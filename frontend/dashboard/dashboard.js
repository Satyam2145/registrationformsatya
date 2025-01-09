// Fetch users from the server and display them in the table
document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.querySelector("#userTable tbody");
    const statusMessage = document.getElementById("statusMessage");

    const API_URL = "https://registrationformcodemonk.onrender.com/api/users";

    // Fetch users
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            return response.json();
        })
        .then((users) => {
            if (users.length === 0) {
                statusMessage.innerText = "No users found.";
                return;
            }

            // Clear any existing message
            statusMessage.innerText = "";

            users.forEach((user, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.contact}</td>
                    <td>${user.college}</td>
                    <td>${user.department}</td>
                `;

                userTableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            statusMessage.innerText = "Unable to fetch user data. Please try again later.";
        });
});
