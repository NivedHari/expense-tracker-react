import { useRef,useEffect, useState } from "react";
import classes from "./UpdateDetails.module.css";
import { authActions } from "../../store/auth-slice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const UpdateDetails = () => {
  // const authCtx = useContext(AuthContext);
  // const token = authCtx.token;
  const token = useSelector(state => state.auth.token);
  const nameRef = useRef();
  const urlRef = useRef();
  const history = useHistory();

  const [enteredData, setEnteredData] = useState({
    displayName: "",
    photoUrl: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "get Failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }

        const userData = await response.json();

        // console.log("User Details:", userData.users[0]);

        setEnteredData({
          displayName: userData.users[0].displayName,
          photoUrl: userData.users[0].photoUrl,
        });
      } catch (error) {
        alert(error.message);
      }
    };

    fetchUserData();
  }, [token]);

  const handleNameChange = (event) => {
    setEnteredData((prevData) => ({
      ...prevData,
      displayName: event.target.value,
    }));
  };

  const handleUrlChange = (event) => {
    setEnteredData((prevData) => ({
      ...prevData,
      photoUrl: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let enteredName = nameRef.current.value;
    let enteredUrl = urlRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Update Failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const updatedUserData = await response.json();
      console.log("Update Success. Updated User Details:", updatedUserData);
      history.replace("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={classes.profile}>
      <h2>Contact Details</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.field}>
          <div className={classes.control}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              value={enteredData.displayName}
              onChange={handleNameChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input
              type="text"
              id="photo"
              ref={urlRef}
              value={enteredData.photoUrl}
              onChange={handleUrlChange}
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
    </section>
  );
};

export default UpdateDetails;
