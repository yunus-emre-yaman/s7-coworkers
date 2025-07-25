import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NewMemberForm from "./components/NewMemberForm";
import CoworkerList from "./components/CoworkerList";

const team = [
  { fullName: "John Doe", email: "john.doe@somewhere.com", notes: "" },
  {
    fullName: "James Morgan",
    email: "james.morgan@somewhere.com",
    notes: "",
  },
];

function App() {
  const [members, setMembers] = useState(team);

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  return (
    <div className="main-container">
      <div className="mid-container">
        <div className="form-container">
          <h2>Takım arkadaşı ekle</h2>
          <NewMemberForm addMember={handleAddMember} />
        </div>
        <div className="list-container">
          <h2>Takım arkadaşların</h2>
          <CoworkerList members={members} />
        </div>
      </div>
    </div>
  );
}

export default App;
