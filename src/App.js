import "./App.css";

function App() {
  const data = {
    username: "mike",
    password: "asdfasdf",
  };

  fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  })
    .then((res) => {
      return Promise.all([res.json(), res.headers]);
    })
    .then(([data, headers]) => {
      const authorisationValue = headers.get("authorization")
      console.log(authorisationValue)
    });

  return <div className='App'></div>;
}

export default App;
