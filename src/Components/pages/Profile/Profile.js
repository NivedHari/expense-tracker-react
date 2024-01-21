import { useContext,useEffect } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Profile.module.css";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  return (
    <div className={classes.profile}>
      <img
        src="https://example.com/your-profile-image.jpg" 
        className={classes.profileImage} alt="profilephoto"
      />
      <div className={classes.profileInfo}>
        <h2 className={classes.profileName}>Your Name</h2>
        <p className={classes.profileEmail}>your.email@example.com</p>
        <p className={classes.verification}> Verification Status : Yes</p>
      </div>
    </div>
  );
};

export default Profile;
