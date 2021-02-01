import {
  CHECK_IN,
  RECEIVE_VENUES,
  RECEIVE_COMMENT,
} from "../actions/venue_actions";
import { formatVenues } from "./venue_selectors";
const VenuesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [...state];
  switch (action.type) {
    case RECEIVE_VENUES:
      // return Object.assign({}, state, formatVenues(action.venues));
      return action.venues;
    case CHECK_IN:
      // venue_id and the user_id

      for (let i = 0; i < newState.length; i++) {
        if (
          newState[i]._id.toString() === action.venueSchedule.venueID.toString()
        ) {
          newState[i].currentUser = action.venueSchedule.currentUser;
          newState[i].available = false;
          newState[i].expiresAt = action.venueSchedule.expiresAt;
        }
      }
      return newState;
    case RECEIVE_COMMENT:
      let wholeVenue = newState.find(
        (venue) => venue._id === action.comment.data.venue
      );
      wholeVenue.comments.push(action.comment.data._id);
      return newState;

    default:
      return state;
  }
};

export default VenuesReducer;
