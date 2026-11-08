function SkillsList({ skills }) {
    if (!skills || skills.length === 0) {
      return <p>Навыки не указаны</p>;
    }
  
    return (
      <div className="skills-list">
        <strong>Навыки:</strong>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SkillsList;