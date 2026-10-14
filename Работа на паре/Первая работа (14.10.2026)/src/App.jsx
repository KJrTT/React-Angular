import Greeting from './components/Greeting';
import Product from './components/Product';
import Avatar from './components/Avatar';
import Card from './components/Card';
import Button from './components/Button';
function App() {
  // return (
  //   <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
  //     <h1>Задача 1: Greeting</h1>

  //     <Greeting name="Иван" />
  //     <Greeting name="Мария" greeting="Здравствуйте" />
  //     <Greeting />
  //     <Greeting greeting="Добрый день" />
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Задача 2</h1>
  //     <Product title = "Наушиники" price={2500} />
  //     <Product title = "Лампа" price={3000} discount = {1}/>
  //     <Product title = "Мышь" price={1500} discount = {20}/>
  //     <Product title = "Телефон" price={18999} discount = {5}/>
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Задача 3</h1>
  //     <Avatar name = "Иван" size = {32}/>
  //     <Avatar name = "Иван" size = {48}/>
  //     <Avatar name = "Иван" size = {80}/>
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Задача 4</h1>
  //     <Card title={"О себе"} >
  //       <p>Меня зову Иван, учу реакт</p>
  //     </Card>
  //     <Card title={"Навыки"} >
  //     <ul>
  //         <li>JavaScript</li>
  //         <li>HTML</li>
  //         <li>CSS</li>
  //       </ul>
  //     </Card>
  //     <Card title={"О себе"} >
  //       <button>Нажми меня</button>
  //     </Card>
  //   </div>
  // )
  return (
    <div>
      <h1>Задача 5: Button</h1>

      <Button>Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="danger">Удалить</Button>{' '}
      <Button disabled>Недоступна</Button>{' '}
      <Button variant="danger" disabled>Удалить (disabled)</Button>{' '}
      <Button onClick={() => alert('Клик!')}>С обработчиком</Button>
    </div>
  );

}

export default App;

