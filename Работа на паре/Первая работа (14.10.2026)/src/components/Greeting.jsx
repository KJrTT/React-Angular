function Greeting({ name = "Гость", greeting = "Привет" }) {
    return (
      <p>
        {greeting}, {name}!
      </p>
    );
  }
  
  export default Greeting;