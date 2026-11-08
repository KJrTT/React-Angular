import Footer from './components/Footer';
import StudentList from './components/StudentList';
import StatCard from './components/StatCard'; 
import { students } from './data/students';

function App() {
  // Вычисления для статистики
  const totalStudents = students.length;
  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
  const youngestAge = Math.min(...students.map((s) => s.age));
  const uniqueCities = new Set(students.map((s) => s.city)).size;

  return (
    <div>
      <h1>Каталог студентов</h1>
      <div className="stats-container">
        <StatCard 
          label="Всего студентов" 
          value={totalStudents} 
          color="blue" 
          icon="👨‍🎓" 
        />
        <StatCard 
          label="Средний балл" 
          value={avgGpa.toFixed(2)} 
          color="green" 
          icon="⭐" 
        />
        <StatCard 
          label="Младший возраст" 
          value={`${youngestAge} лет`} 
          color="yellow" 
          icon="👶" 
        />
        <StatCard 
          label="Городов" 
          value={uniqueCities} 
          color="pink" 
          icon="🏙️" 
        />
      </div>

      <StudentList students={students} />

      <Footer />
    </div>
  );
}

export default App;