import { authActions } from "./auth-slice";
import { expenseActions } from "./expense-slice";
import { uiActions } from "./ui-slice";

export const fetchUserDetails = (token) => {
  return async (dispatch) => {
    dispatch(uiActions.loading({ loading: true }));
    const fetchData = async () => {
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
      dispatch(uiActions.loading({ loading: false }));
      if (!response.ok) {
        const data = await response.json();
        console.error("Lookup Failed:", data);
        throw new Error("Fetch Failed");
      }

      const data = await response.json();

      return data;
    };
    try {
      const userData = await fetchData();
      if (userData.users && userData.users.length > 0) {
        dispatch(
          authActions.setProfile({
            name: userData.users[0].displayName || "Not Set",
            email: userData.users[0].email || "",
            url:
              userData.users[0].photoUrl ||
              "https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png",
            isVerified: userData.users[0].emailVerified || false,
          })
        );
        const isProfileComplete =
          userData.users[0].displayName !== undefined &&
          userData.users[0].photoUrl !== undefined &&
          userData.users[0].emailVerified === true;
        dispatch(
          authActions.setCompletion({
            isComplete: isProfileComplete,
          })
        );
      } else {
        console.error("Unexpected response format or no user data:", userData);
        throw new Error("Unexpected response format or no user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserDetails = (token, name, url) => {
  return async (dispatch) => {
    const updateData = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error in updating");
      }
      const updatedUserData = await response.json();

      return updatedUserData;
    };
    try {
      const updatedUserData = await updateData();
      dispatch(
        authActions.setProfile({
          name: updatedUserData.displayName,
          email: updatedUserData.email,
          url: updatedUserData.photoUrl,
          isVerified: updatedUserData.emailVerified,
        })
      );
      console.log("Update Success. Updated User Details:", updatedUserData);
    } catch (error) {
      alert(error.message);
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    const login = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("login Failed");
      }
      const data = await response.json();

      return data;
    };
    try {
      const data = await login();
      // const cleanedMail = `${email.replace(/\.|@/g, "")}`;
      dispatch(authActions.login({ token: data.idToken, email: data.email }));
      // console.log(cleanedMail);
    } catch (error) {
      alert(error.message);
    }
  };
};
export const signUpUser = (email, password) => {
  return async (dispatch) => {
    const signUp = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sign Up Failed");
      }
      const data = await response.json();

      return data;
    };
    try {
      await signUp();
    } catch (error) {
      alert(error.message);
    }
  };
};

export const forgotPasswordSender = (email) => {
  return async (dispatch) => {
    const forgotPassword = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error in sending the reset request");
      }
      console.log("Reset request sent!");
    };
    try {
      await forgotPassword();
    } catch (error) {
      throw new Error("Error in Sending Request");
    }
  };
};

export const userVerificationRequest = (token) => {
  return async (dispatch) => {
    const verificationHandler = async () =>{
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
      if(!response.ok){
        throw new Error("Sending Verification request failed.!");
      }
      console.log("Verification request sent");
    };
    try{
      await verificationHandler();
    }catch(error){
      throw new Error("Sending verification request failed")
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(expenseActions.clear());
    dispatch(uiActions.premium({ premium: false }));
  };
};