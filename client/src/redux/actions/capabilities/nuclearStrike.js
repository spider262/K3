import setUserfeedbackAction from "../setUserfeedbackAction";
// import { CLIENT_SENDING_ACTION } from "../../socketEmits";

const nuclearStrike = invItem => {
	return (dispatch, getState, emit) => {
		dispatch(setUserfeedbackAction("nuclearStrike"));
	};
};

export default nuclearStrike;
