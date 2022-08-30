import InitialLoad from "./Components/InitialLoad/InitialLoad";
import UserContextProvider from "./Providers/UserContextProvider";
import Routers from "./routes/Routers";

function App() {
  return (
    <>
      <UserContextProvider>
        <InitialLoad>
          <Routers />
        </InitialLoad>
      </UserContextProvider>
    </>
  );
}

export default App;
