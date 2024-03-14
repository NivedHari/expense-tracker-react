import React, { useEffect, useState } from "react";
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
    <section className="bg-sky-200 mt-20 h-max p-6 rounded m-auto w-max dark:bg-opacity-50">
      <h2 className="text-3xl mb-8 text-center">Contact Details</h2>
      <form onSubmit={submitHandler}>
        <div className="flex flex-row">
          <div className="mb-2">
            <label className="my-2 mr-2 mb-5" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={enteredData.displayName}
              onChange={handleNameChange}
              className="my-2 mr-5 w-52 outline-none rounded-md px-2"
            />
          </div>
          <div >
            <label className="my-2 mr-2 mb-5" htmlFor="photo">Profile Photo URL</label>
            <input
              type="text"
              id="photo"
              value={enteredData.photoUrl}
              onChange={handleUrlChange}
              className="my-2 w-52 outline-none rounded-md px-2"
            />
          </div>
        </div>

        <div className="flex justify-center m-8">
          <button className="bg-blue-800 text-white hover:bg-blue-900 py-2 px-6 ml-5 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950">Update</button>
        </div>
      </form>
    </section>
  );
};

export default UpdateDetails;
