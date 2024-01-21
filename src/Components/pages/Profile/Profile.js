import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [userName, setUserName] = useState("Not Set");
  const [userEmail, setUserEmail] = useState("");
  const [userUrl, setUserUrl] = useState("https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png");
  const [userVerification, setUserVerification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

        if (userData.users && userData.users.length > 0) {
          setUserName(userData.users[0].displayName || "Your Name");
          setUserEmail(userData.users[0].email || "your.email@example.com");
          setUserUrl(userData.users[0].photoUrl || "");
          setUserVerification(userData.users[0].emailVerified);
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token,verificationStatus]);

  const verificationHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Verification Failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      setVerificationStatus("Verification email sent successfully!");
    } catch (error) {
      setVerificationStatus(`Verification Failed: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log("Verification Status:", verificationStatus);
  }, [verificationStatus]);

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <img
          src={userUrl}
          className={classes.profileImage}
          alt="profilephoto"
        />
        <div className={classes.profileInfo}>
          <h2 className={classes.profileName}>{`Name : ${userName}`}</h2>
          <p className={classes.profileEmail}>{`Email : ${userEmail}`}</p>
          <div>
            <p className={classes.verification}>
              {userVerification
                ? "Verification Status: Verified"
                : "Verification Status: Not Verified"}
            </p>
            {!userVerification && (
              <div className={classes.control}>
                <button className={classes.btn} onClick={verificationHandler}>
                  Verify Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Link to="/update">
          <button>Update Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
