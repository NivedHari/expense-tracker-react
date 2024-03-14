import { expenseActions } from "./expense-slice";
import { uiActions } from "./ui-slice";

export const fetchExpenseData = (email) => {
  const cleanedMail = `${email.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(uiActions.loading({ loading: true }));
      const response = await fetch(
        `https://test-123-d7f3d-default-rtdb.firebaseio.com/${cleanedMail}.json`
      );

      if (!response.ok) {
        throw new Error("Fetch Failed");
      }
      const data = await response.json();

      return data;
    };
    try {
      const expenseData = await fetchData();
      dispatch(
        expenseActions.replace({
          items: expenseData.items || [],
          totalExpense: expenseData.totalExpense,
        })
      );
      dispatch(uiActions.loading({ loading: false }));
    } catch (error) {
      console.log(error);
      dispatch(uiActions.loading({ loading: false }));
    }
  };
};

export const sendExpenseData = (expense, email) => {
  const cleanedMail = `${email.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://test-123-d7f3d-default-rtdb.firebaseio.com/${cleanedMail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: expense.items,
            totalExpense: expense.totalExpense,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Sending Expense Failed: ${JSON.stringify(errorData)}`);
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
