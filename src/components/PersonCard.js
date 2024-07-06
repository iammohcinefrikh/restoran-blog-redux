const PersonCard = ({ personPicture, personName, personRole }) => {
  return (
    <div className="person-card-container">
      <img className="person-card-picture" src={personPicture} alt={`${personName} profile`} />
      <p className="person-card-name">{personName}</p>
      <p className="person-card-role">{personRole}</p>
    </div>
  )
}

export default PersonCard;