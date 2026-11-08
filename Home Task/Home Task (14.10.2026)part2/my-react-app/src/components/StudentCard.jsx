import Badge from './Badge';
import SkillsList from './SkillsList';

function StudentCard({ student }) {
  const { name, age, course, city, gpa, skills } = student;
  
  const courseColor = course >= 3 ? 'badge-green' : 'badge-yellow';

  return (
    <div className="student-card">
      <div className="student-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        <img 
          src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`} 
          alt={name} 
          width="50" 
          height="50"/>

        <h3 style={{ flex: 1, margin: 0 }}>
          {name} {gpa >= 4.5 && <span title="Отличник">🏆</span>}
        </h3>
        
        <Badge text={`${course} курс`} color={courseColor} /></div>

      <p><strong>Возраст:</strong> {age} лет</p>
      <p><strong>Город:</strong> {city}</p>
      <p><strong>Средний балл:</strong> {gpa}</p>
      <SkillsList skills={skills} />
      
    </div>
  );
}

export default StudentCard;