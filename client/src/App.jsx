import { Container } from "@chakra-ui/react";
import Header from "./components/Header";
import VotePage from "./Pages/VotePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import userAtom from "./atoms/userAtom";
import AuthPage from "./Pages/AuthPage";
import ResultsPage from "./Pages/ResultsPage";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW={"620px"}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user && !user.isVoted ? <VotePage /> : <Navigate to={"/results"} />
          }
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/results"
          element={user?.isVoted ? <ResultsPage /> : <Navigate to={"/auth"} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
