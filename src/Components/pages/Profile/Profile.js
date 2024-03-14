import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
      <div className="bg-sky-200 mt-20 w-96 h-max p-6 rounded m-auto dark:bg-opacity-50">
        

        {!isLoading && (
          <div className=" p-4 h-max">
            <div className="text-center">
              <img
                src={userUrl}
                className="w-48 h-48 m-auto rounded-full"
                alt="profilephoto"
              />
                <h2 className="text-2xl font-semibold mb-8">{`${userName}`}</h2>
                <p className="text-xl text-slate-500 dark:text-slate-200">{`${email}`}</p>
                <div className="m-4">
                   Verification Status : 
                  <span
                    className={
                      userVerification
                        ? ` ${"text-lime-500"}`
                        : `${"text-rose-500"}`
                    }
                  >
                    {userVerification ? " Verified" : "Not Verified"}
                  </span>
                  </div>
                  {(!userVerification || verificationSent) && (
                    <div >
                      <button
                        className="border-2 border-slate-950 m-4 py-1 px-2 rounded"
                        onClick={verificationHandler}
                      >
                        Verify Email
                      </button>
                      {verificationSent && <p>Verification mail sent</p>}
                    </div>
                  )}
                
            </div>

            <div className="flex justify-center">
              <Link to="/update">
                <button className="bg-blue-800 text-white hover:bg-blue-900 py-2 px-5 ml-5 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950"  data-testid="update-profile">Update Profile</button>
              </Link>
            </div>
          </div>
        )}
        {isLoading && (
          <ReactLoading
            className="m-auto"
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
