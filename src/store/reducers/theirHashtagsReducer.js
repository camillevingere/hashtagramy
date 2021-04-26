// Action Creators

export const LOAD = "LOAD";

export function load() {
  return {
    type: LOAD,
  };
}

export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

// Action Creators

let noteID = 0;

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note,
  };
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
}

fromStrToArray = (strString) => {
  var array = strString.split(" ");
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var hashtags = array[i];
    newArray.push(hashtags);
  }

  return array;
};

const initialState = { theirHashtags: {} };

function theirHashtagsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      state.theirHashtags[action.note.noteTitle] = fromStrToArray(
        action.note.noteValue
      );
      return {
        ...state,
        theirHashtags: { ...state.theirHashtags },
      };
    }
    case "DELETE_NOTE":
      delete state.theirHashtags[action.payload];
      return {
        ...state,
        theirHashtags: { ...state.theirHashtags },
      };
    default:
      return state;
  }
}

export default theirHashtagsReducer;
