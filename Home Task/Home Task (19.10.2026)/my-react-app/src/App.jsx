import CatFact from './components/CatFact';
import Weather from './components/Weather';
import Pagination from './components/Pagination';
import DebouncedSearch from './components/DebouncedSearch';
import ReviewForm from './components/ReviewForm';
import DependentForm from './components/DependentForm';
import FocusOnErrorForm from './components/FocusOnErrorForm';
import FileInput from './components/FileInput';
import InactivityTimerForm from './components/InactivityTimerForm';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <div>
      <h1>Мои упражнения</h1>
      
      <hr />
      <CatFact />
      
      <hr />
      <Weather />
      
      <hr />
      <Pagination />
      
      <hr />
      <DebouncedSearch />
      
      <hr />
      <ReviewForm />
      
      <hr />
      <DependentForm />
      
      <hr />
      <FocusOnErrorForm />
      
      <hr />
      <FileInput />
      
      <hr />
      <InactivityTimerForm />
      
      <hr />
      <MultiStepForm />
    </div>
  );
}

export default App;