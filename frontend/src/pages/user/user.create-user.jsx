import React, { useState } from "react";
import "./user.create-user.style.css";
import axios from "axios";

function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [validationMessage, setValidationMessage] = useState(""); // New state for validation message

  const validateForm = () => {
    if (name.length < 3 || name.length > 40) {
      setValidationMessage("Name must be between 3 and 40 characters.");
      return false;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      setValidationMessage("Please enter a valid email address.");
      return false;
    }
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 100) {
      setValidationMessage("Age must be a number between 1 and 99.");
      return false;
    }
    setValidationMessage(""); // Clear message if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }
    /*
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/create-user",
        {
          name,
          email,
          age,
        }
      );

      alert(
        "Create user successfully. User:" + JSON.stringify(response.data.msg)
      );
    } catch (error) {
      console.log("test github");
      alert(
        "Failed to create user. Error:" +
          JSON.stringify(error.response.data.msg)
      );
    }
      */
  };

  return (
    <div className="createUserPageRoot">
      <h1>Create a new user!</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="nameInput"
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="emailInput"
          value={email}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="ageInput"
          value={age}
          type="text"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Create user</button>
      </form>
      <p id="validationMessage">{validationMessage}</p>
    </div>
  );
}

export default CreateUserPage;
