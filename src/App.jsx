import { useState } from "react";
import "./App.css";

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

  return (
    <div className="main-container">
      <div className="mid-container">
        <div className="form-container">
          <h2>Takım arkadaşı ekle</h2>
          {/*
            NewMemberForm componentı aşağıdaki gibi kullanılmalı.
            Gerekli dosyayı oluşturup kodları yazdıktan sonra alttaki satırı yorumdan çıkar.
          */}
          {/* <NewMemberForm addMember={handleAddMember} /> */}
        </div>
        <div className="list-container">
          <h2>Takım arkadaşların</h2>
          {/*
            CoworkerList componentı aşağıdaki gibi kullanılmalı.
            Gerekli dosyayı oluşturup kodları yazdıktan sonra alttaki satırı yorumdan çıkar.
          */}
          {/* <CoworkerList members={members} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
