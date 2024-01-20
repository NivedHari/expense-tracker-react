import { useRef, useContext, useEffect,useState } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const nameRef = useRef();
  const urlRef = useRef();


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
        console.log("User Details:", userData.users[0]);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUserData();
  }, [token]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;

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
            <input type="text" id="name" ref={nameRef}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input type="text" id="photo" ref={urlRef}></input>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
