import { useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../store/auth-actions";

const StartingPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileComplete = useSelector((state) => state.auth.isComplete);
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-300 dark:bg-sky-700">
      <div className=" flex flex-col justify-center items-center">
        <div >
          <h1 className="text-3xl mb-4 dark:text-white">Welcome To Expense Tracker</h1>
        </div>
        <div className="bg-slate-950 w-16 h-16 rounded-full flex justify-center items-center">
          <Link className='text-white text-4xl' to="/expenses">
            <p >&#8594;</p>
          </Link>
        </div>
        {!profileComplete && (
          <div className="absolute top-16 right-10 bg-sky-200 p-5 rounded dark:bg-opacity-50">
            <div >
              <h2 className="text-2xl font-bold ">Your Profile is Incomplete !</h2>
              <Link to="/update">
                <div className="bg-blue-800 w-fit p-3 my-4 rounded hover:bg-blue-900 ">
                  <h3 className="text-white font-semi-bold">Complete now&#8594;</h3>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartingPage;

