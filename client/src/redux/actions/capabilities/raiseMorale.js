import setUserfeedbackAction from "../setUserfeedbackAction";
// import { CLIENT_SENDING_ACTION } from "../../socketEmits";

const raiseMorale = invitem => {
	return (dispatch, getState, emit) => {
		dispatch(setUserfeedbackAction("raiseMorale"));
	};
};

export default raiseMorale;