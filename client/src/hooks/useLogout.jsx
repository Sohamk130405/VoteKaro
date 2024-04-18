import useShowToast from "./useShowToast";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      localStorage.removeItem("user-voteKaro");
      setUser(null);
      showToast("Logout", res.data.message, "success");
      navigate("/auth");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        showToast("Error", errorMessage, "error");
      } else {
        // If the error object does not contain the expected structure
        showToast(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
    }
  };
  return { logout };
};

export default useLogout;
