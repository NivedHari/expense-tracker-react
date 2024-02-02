import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  fetchUserDetails,
  userVerificationRequest,
} from "../../store/auth-actions";
import ReactLoading from "react-loading";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const userVerification = useSelector((state) => state.auth.isVerified);
  const userUrl = useSelector((state) => state.auth.url);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  const verificationHandler = async () => {
    dispatch(userVerificationRequest(token));
    setVerificationSent(true);
  };

  return (
    <Fragment>
      <div className={classes.outer}>
        {!isLoading && <div className={classes.round}></div>}

        {!isLoading && (
          <div className={classes.container}>
            <div className={classes.profile}>
              <img
                src={userUrl}
                className={classes.profileImage}
                alt="profilephoto"
              />
              <div className={classes.profileInfo}>
                <h2 className={classes.profileName}>{`${userName}`}</h2>
                <p className={classes.profileEmail}>{`${email}`}</p>
                <div className={classes.verification}>
                   Verification Status : 
                  <span
                    className={
                      userVerification
                        ? ` ${classes.verified}`
                        : `${classes.notVerified}`
                    }
                  >
                    {userVerification ? " Verified" : "Not Verified"}
                  </span>
                  </div>
                  {(!userVerification || verificationSent) && (
                    <div className={classes.control}>
                      <button
                        className={classes.btn}
                        onClick={verificationHandler}
                      >
                        Verify Email
                      </button>
                      {verificationSent && <p>Verification mail sent</p>}
                    </div>
                  )}
                
              </div>
            </div>

            <div className={classes.actions}>
              <Link to="/update">
                <button data-testid="update-profile">Update Profile</button>
              </Link>
            </div>
          </div>
        )}
        {isLoading && (
          <ReactLoading
            className={classes.loading}
            type={"spin"}
            color={"#91abee"}
            height={50}
            width={50}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Profile;
