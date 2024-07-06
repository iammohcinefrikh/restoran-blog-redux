import { useEffect } from "react";
import PersonCard from "./PersonCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersons } from "../slices/personSlice";

const TeamSection = () => {
  const dispatch = useDispatch();
  const persons = useSelector((state) => state.persons.persons);
  const personsStatus = useSelector((state) => state.persons.status);
  const error = useSelector((state) => state.persons.error);

  useEffect(() => {
    if (personsStatus === "idle") {
      dispatch(fetchPersons());
    }
  }, [personsStatus, dispatch]);

  let content;

  if (personsStatus === "loading") {
    content = <p>Loading...</p>;
  } 
  
  else if (personsStatus === "succeeded") {
    content = persons.map((person) => (
      <PersonCard key={person.id} personPicture={person.personPicture} personName={person.personName} personRole={person.personRole} />
    ));
  }
  
  else if (personsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="team-section-container">
      <h3 className="team-section-header">L'équipe</h3>
      <div className="team-section-members">
        {content}
      </div>
    </div>
  )
}

export default TeamSection;