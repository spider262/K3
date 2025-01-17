const { Game, InvItem, Capability } = require("../../classes");
import { COMM_INTERRUP_SELECTED } from "../../../client/src/redux/actions/actionTypes";
import { SERVER_REDIRECT, SERVER_SENDING_ACTION } from "../../../client/src/redux/socketEmits";
import { GAME_INACTIVE_TAG, GAME_DOES_NOT_EXIST } from "../../pages/errorTypes";
import { COMMUNICATIONS_INTERRUPTION_TYPE_ID } from "../../../client/src/gameData/gameConstants";
const sendUserFeedback = require("../sendUserFeedback");

const commInterruptConfirm = async (socket, payload) => {
    const { gameId, gameTeam, gameController } = socket.handshake.session.ir3;

    if (payload == null || payload.selectedPositionId == null) {
        sendUserFeedback(socket, "Server Error: Malformed Payload (missing selectedPositionId)");
        return;
    }

    const { selectedPositionId, invItem } = payload;

    const thisGame = await new Game({ gameId }).init();
    if (!thisGame) {
        socket.emit(SERVER_REDIRECT, GAME_DOES_NOT_EXIST);
        return;
    }

    const { gameActive, gamePhase, gameSlice, game0Points, game1Points } = thisGame;

    if (!gameActive) {
        socket.emit(SERVER_REDIRECT, GAME_INACTIVE_TAG);
        return;
    }

    //gamePhase 2 is only phase for comm interrupt
    if (gamePhase != 2) {
        sendUserFeedback(socket, "Not the right phase...");
        return;
    }

    //gameSlice 0 is only slice for comm interrupt
    if (gameSlice != 0) {
        sendUserFeedback(socket, "Not the right slice (must be planning)...");
        return;
    }

    //Only the main controller (0) can use comm interrupt
    if (gameController != 0) {
        sendUserFeedback(socket, "Not the main controller (0)...");
        return;
    }

    const { invItemId } = invItem;

    //Does the invItem exist for it?
    const thisInvItem = await new InvItem(invItemId).init();
    if (!thisInvItem) {
        sendUserFeedback(socket, "Did not have the invItem to complete this request.");
        return;
    }

    //verify correct type of inv item
    const { invItemTypeId } = thisInvItem;
    if (invItemTypeId != COMMUNICATIONS_INTERRUPTION_TYPE_ID) {
        sendUserFeedback(socket, "Inv Item was not a comm interrupt type.");
        return;
    }

    //does the position make sense?
    if (selectedPositionId < 0) {
        sendUserFeedback(socket, "got a negative position for comm interrupt.");
        return;
    }

    //insert the 'plan' for comm interrupt into the db for later use
    if (!(await Capability.insertCommInterrupt(gameId, gameTeam, selectedPositionId))) {
        sendUserFeedback(socket, "db failed to insert comm interrupt, likely already an entry for that position.");
        return;
    }

    await thisInvItem.delete();

    const confirmedCommInterrupt = await Capability.getCommInterrupt(gameId, gameTeam);

    // let the client(team) know that this plan was accepted
    const serverAction = {
        type: COMM_INTERRUP_SELECTED,
        payload: {
            invItem: thisInvItem,
            confirmedCommInterrupt
        }
    };
    socket.emit(SERVER_SENDING_ACTION, serverAction);
};

module.exports = commInterruptConfirm;
