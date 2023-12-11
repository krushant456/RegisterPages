import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, Setname] = useState("");
  const [valid, SetValid] = useState(true);
  const [validEmail, SetValidEmail] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [confirmpassword, Setconfirmpassword] = useState("");
  const [Validpassword, Setvalidpassword] = useState(true);
  // const [selectedOption, setSelectedOption] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState({
    Reading: false,
    Writeing: false,
    Dancing: false,
    OnlineGame: false,
  });
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setHobbies((prevHobbies) => ({ ...prevHobbies, [name]: checked }));
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  function handleInputChnag(e) {
    const newname = e.target.value;
    Setname(newname);
    SetValid(/^[a-zA-Z0-9]/.test(newname));
  }

  function HandleEmailChnage(e) {
    const newemail = e.target.value;
    SetEmail(newemail);

    SetValidEmail(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newemail)
    );
  }
  function Handlepassword(e) {
    const newpassword = e.target.value;
    Setpassword(newpassword);

    Setvalidpassword(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/.test(
        newpassword
      )
    );
  }

  function Handleconfirmpassword(e) {
    Setconfirmpassword(e.target.value);
  }
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  function HandleDateChange(e) {
    setDate(e.target.value);
    const calculatedAge = calculateAge(e.target.value);
    setAge(calculatedAge);
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user", {
        name,
        email,
        password,
        confirmpassword,
        date,
        gender,
        ...hobbies,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <form className="from" onSubmit={HandleSubmit}>
      <label>Name</label>
      <input type="text" onChange={handleInputChnag} required value={name} />
      {valid ? null : <div style={{ color: "red" }}>UnValid User</div>}
      <label>Email-Id</label>
      <input type="text" onChange={HandleEmailChnage} value={email} required />
      {validEmail ? null : <div style={{ color: "red" }}>UnValid User</div>}
      <label>Password</label>
      <input type="text" onChange={Handlepassword} value={password} required />
      {Validpassword ? null : (
        <div style={{ color: "red" }}>
          Weak password. Please include at least one lowercase letter, one
          uppercase letter, one digit, and one special character.
        </div>
      )}
      <label>Confirm password</label>
      <input
        type="text"
        onChange={Handleconfirmpassword}
        value={confirmpassword}
      />
      <label>Date of Birth</label>
      <input type="date" onChange={HandleDateChange} value={date} />
      {age !== null && <p>Age: {age}</p>}
      <div>
        <label htmlFor="hobby1">
          <input
            type="checkbox"
            id="hobby1"
            name="Reading"
            checked={hobbies.Reading}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
      </div>

      <div>
        <label htmlFor="hobby2">
          <input
            type="checkbox"
            id="hobby2"
            name="Writeing"
            checked={hobbies.Writeing}
            onChange={handleCheckboxChange}
          />
          Writeing
        </label>
      </div>

      <div>
        <label htmlFor="hobby3">
          <input
            type="checkbox"
            id="hobby3"
            name="Dancing"
            checked={hobbies.Dancing}
            onChange={handleCheckboxChange}
          />
          Dancing
        </label>
      </div>

      <div>
        <label htmlFor="hobby4">
          <input
            type="checkbox"
            id="hobby4"
            name="OnlineGame"
            checked={hobbies.OnlineGame}
            onChange={handleCheckboxChange}
          />
          OnlineGame
        </label>
      </div>
      <select value={gender} onChange={handleGenderChange}>
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">other</option>
      </select>

      <button>Submit</button>
    </form>
  );
}

export default App;
