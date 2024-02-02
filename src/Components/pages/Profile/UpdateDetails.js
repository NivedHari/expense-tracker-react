import React, { useEffect, useState } from "react";
import classes from "./UpdateDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateUserDetails,fetchUserDetails } from "../../store/auth-actions";

const UpdateDetails = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const userName = useSelector((state) => state.auth.name);
  const userUrl = useSelector((state) => state.auth.url);

  const [enteredData, setEnteredData] = useState({
    displayName: "",
    photoUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUserDetails(token));
      setEnteredData({
        displayName: userName,
        photoUrl: userUrl,
      });

      if(userUrl === 'https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png' || userName === 'Not Set'){
        setEnteredData({
          displayName: "",
          photoUrl: "",
        });
      }
    };

    fetchData();
  }, [token, userName, userUrl, dispatch]);

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

    let enteredName = enteredData.displayName;
    let enteredUrl = enteredData.photoUrl;

    dispatch(updateUserDetails(token, enteredName, enteredUrl));
    history.replace("/profile");
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
              value={enteredData.displayName}
              onChange={handleNameChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input
              type="text"
              id="photo"
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
