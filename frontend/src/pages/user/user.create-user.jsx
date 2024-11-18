import React, { useState } from "react";
import "./user.create-user.style.css";
import axios from "axios";

function CreateUserPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [validationMessage, setValidationMessage] = useState(""); // New state for validation message

  const validateForm = () => {
    if (name==="") {
      setValidationMessage("Can't leave name blank");
      return false;
    }
    if (age==="") {
      setValidationMessage("Can't leave age blank");
      return false;
    }
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 100) {
      setValidationMessage("Age must be a number between 1 and 99.");
      return false;
    }
    setValidationMessage(""); // Clear message if validation passes
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }
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
