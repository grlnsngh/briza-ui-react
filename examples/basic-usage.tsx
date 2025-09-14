import React from "react";
import { Button } from "briza-ui-react";

function App() {
  return (
    <div>
      <Button primary label="Click me" onClick={() => alert("Hello!")} />
    </div>
  );
}

export default App;
