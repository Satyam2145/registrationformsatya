document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const college = document.getElementById("college").value.trim();
    const department = document.getElementById("department").value.trim();

    // Validate form inputs
    if (!name || !email || !contact || !college || !department) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number must be 10 digits.");
      return;
    }

    const submitButton = document.querySelector(
      "#registrationForm button[type='submit']"
    );
    submitButton.disabled = true;
    submitButton.innerText = "Submitting...";

    // Send data to the server
    fetch("http://localhost:5500/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        contact: contact,
        college: college,
        department: department,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to register user");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Display success message
        document.getElementById("successMessage").innerText = data.message;
        document.getElementById("successMessage").style.color = "black";

        // Reset the form
        document.getElementById("registrationForm").reset();
      })
      .catch((error) => {
        // Handle specific error messages
        if (error.message === "This email address is already registered.") {
          alert(
            "This email address is already registered. Please use a different email."
          );
        } else {
          console.error("Error:", error);
          document.getElementById("successMessage").innerText =
            "Failed to register user.";
          document.getElementById("successMessage").style.color = "red";
        }
      })
      .finally(() => {
        // Reset the submit button
        submitButton.disabled = false;
        submitButton.innerText = "Register";
      });
  });
