import { useSelector,useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import { uiActions } from "../../store/ui-slice";

const TotalExpense = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalExpense);
  const isLoading = useSelector(state=> state.ui.isLoading);

  const premiumHandler = () => {
    dispatch(uiActions.premium({ premium: true }));
  }
  
  return (
    <div className="m-auto w-150 flex flex-row justify-between items-center p-5 shadow-md bg-sky-300 dark:bg-zinc-600 dark:text-white" data-testid="total-expense">
      {!isLoading && (
        <>
          <p >
            Total Expense : <strong>${totalAmount}</strong>
          </p>
          {totalAmount >= 10000 && (
            <button className="bg-blue-800 text-white hover:bg-blue-900 py-4 px-3 ml-5 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950" onClick={premiumHandler}>Activate Premium</button>
          )}
        </>
      )}
      {isLoading && <ReactLoading className="m-auto" type={"spin"} color={"#91abee"} height={50} width={50} />}
    </div>
  );
};

export default TotalExpense;
