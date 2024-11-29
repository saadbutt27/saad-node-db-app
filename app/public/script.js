// public/script.js

async function fetchUsers() {
    try {
      const response = await fetch("/users");
      const users = await response.json();
  
      const table = document.getElementById("userTable");
      const tableBody = document.getElementById("userTableBody");
  
      tableBody.innerHTML = ""; // Clear any existing rows
  
      users.forEach((user) => {
        const row = document.createElement("tr");
  
        const userIdCell = document.createElement("td");
        userIdCell.textContent = user.user_id;
        row.appendChild(userIdCell);
  
        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        row.appendChild(nameCell);
  
        const emailCell = document.createElement("td");
        emailCell.textContent = user.email_id;
        row.appendChild(emailCell);
  
        const dobCell = document.createElement("td");
        dobCell.textContent = user.date_of_birth;
        row.appendChild(dobCell);
  
        tableBody.appendChild(row);
      });
  
      table.style.display = "table"; // Show the table after data is added
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  