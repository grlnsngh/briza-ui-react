import React from "react";
import { Button, Header } from "briza-ui-react";

function App() {
  return (
    <div>
      <Header user={{ name: "John Doe" }} />
      <Button primary label="Click me" onClick={() => alert("Hello!")} />
    </div>
  );
}

export default App;
