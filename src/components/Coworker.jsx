/* bu dosyayı değiştirmene gerek yok */
export default function Coworker({ person }) {
  return (
    <div className="person">
      <div className="person-initials">
        {person.fullName.split(" ").reduce((a, b) => a + b[0], "")}
      </div>
      <div className="person-infos">
        <h3>{person.fullName}</h3>
        <p>{person.email}</p>
      </div>
    </div>
  );
}
/* bu dosyayı değiştirmene gerek yok */
