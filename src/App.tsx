import { useState } from "react";
import FirstPage from "./components/firstPage";
import LastPage from "./components/lastpage";
import GlobalStyles from "./GlobalStyles";

function App() {
  const [signed, setSigned] = useState(false);

  return (
    <>
      <GlobalStyles />
      {signed ? <LastPage /> : <FirstPage setSigned={setSigned} />}
    </>
  );
}

export default App;
