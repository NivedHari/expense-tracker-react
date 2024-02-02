import { useSelector,useDispatch } from "react-redux";
import classes from './TotalExpense.module.css';
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
    <div className={classes.amount_container} data-testid="total-expense">
      {!isLoading && (
        <>
          <p className={classes.amount}>
            Total Expense : <strong>${totalAmount}</strong>
          </p>
          {totalAmount >= 10000 && (
            <button className={classes.premium} onClick={premiumHandler}>Activate Premium</button>
          )}
        </>
      )}
      {isLoading && <ReactLoading className={classes.loading} type={"spin"} color={"#91abee"} height={50} width={50} />}
    </div>
  );
};

export default TotalExpense;
