import { useRef, useContext } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const nameRef = useRef();
  const urlRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;

    let url;
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCGsfKHWAjmDu8yEHWUSWa8NmvoH1Vnv0s";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        displayName: enteredName,
        photoUrl: enteredUrl,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Update SuccesFull");
        return res.json();
      } else {
        {
          return res.json()
            .then((data) => {
              let errorMessage = "Update Failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            })
            
            .catch((err) => {
              alert(err.message);
            });
        }
      }
    });
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
