const { Game, Event } = require("../../classes");
import { BATTLE_FIGHT_RESULTS, UPDATE_FLAGS } from "../../../client/src/redux/actions/actionTypes";
import { SERVER_REDIRECT, SERVER_SENDING_ACTION } from "../../../client/src/redux/socketEmits";
import { GAME_INACTIVE_TAG } from "../../pages/errorTypes";
const sendUserFeedback = require("../sendUserFeedback");
const giveNextEvent = require("../giveNextEvent");

const confirmBattleSelection = async (socket, payload) => {
    const { gameId, gameTeam, gameController } = socket.handshake.session.ir3;
    const { friendlyPieces } = payload;

    const thisGame = await new Game({ gameId }).init();
    const { gameActive, gamePhase, game0Status, game1Status } = thisGame;

    if (!gameActive) {
        socket.emit(SERVER_REDIRECT, GAME_INACTIVE_TAG);
        return;
    }

    const otherTeam = gameTeam == 0 ? 1 : 0;
    const thisTeamStatus = gameTeam == 0 ? game0Status : game1Status;
    const otherTeamStatus = otherTeam == 0 ? game0Status : game1Status;

    if (thisTeamStatus == 1 && otherTeamStatus == 0) {
        sendUserFeedback(socket, "still waiting stupid...");
        return;
    }

    //confirm the selections
    const thisTeamsCurrentEvent = await Event.getNext(gameId, gameTeam);
    await thisTeamsCurrentEvent.bulkUpdateTargets(friendlyPieces);

    //are we waiting for the other client?
    if (otherTeamStatus == 0) {
        await thisGame.setStatus(gameTeam, 1);
        sendUserFeedback(socket, "confirmed, now waiting on other team...");
        return;
    }

    //if get here, other team was already waiting, need to set them to 0 and handle stuff
    await thisGame.setStatus(otherTeam, 0);

    //Do the fight!
    const fightResults = await thisTeamsCurrentEvent.fight();

    if (fightResults.atLeastOneBattle) {
        const serverAction = {
            type: BATTLE_FIGHT_RESULTS,
            payload: {
                masterRecord: fightResults.masterRecord
            }
        };

        socket.to("game" + gameId).emit(SERVER_SENDING_ACTION, serverAction);
        socket.emit(SERVER_SENDING_ACTION, serverAction);
        return;
    }

    await thisTeamsCurrentEvent.delete();

    const didUpdateFlags = await thisGame.updateFlags();
    if (didUpdateFlags) {
        const updateFlagAction = {
            type: UPDATE_FLAGS,
            payload: {
                island0: thisGame.island0,
                island1: thisGame.island1,
                island2: thisGame.island2,
                island3: thisGame.island3,
                island4: thisGame.island4,
                island5: thisGame.island5,
                island6: thisGame.island6,
                island7: thisGame.island7,
                island8: thisGame.island8,
                island9: thisGame.island9,
                island10: thisGame.island10,
                island11: thisGame.island11,
                island12: thisGame.island12
            }
        };
        socket.to("game" + gameId).emit(SERVER_SENDING_ACTION, updateFlagAction);
        socket.emit(SERVER_SENDING_ACTION, updateFlagAction);
    }

    await giveNextEvent(socket, { thisGame, gameTeam: 0 }); //not putting executingStep in options to let it know not to send pieceMove
    await giveNextEvent(socket, { thisGame, gameTeam: 1 }); //not putting executingStep in options to let it know not to send pieceMove
};

module.exports = confirmBattleSelection;
