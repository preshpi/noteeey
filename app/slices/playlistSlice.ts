export const SET_PLAYLIST_EMBED_CODE = "SET_PLAYLIST_EMBED_CODE";

export const setPlaylistEmbedCode = (embedCode: string | null) => ({
  type: SET_PLAYLIST_EMBED_CODE,
  payload: embedCode,
});

const initialState = {
  playlistEmbedCode: null as string | null,
};

const playlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PLAYLIST_EMBED_CODE:
      return {
        ...state,
        playlistEmbedCode: action.payload,
      };
    default:
      return state;
  }
};
export default playlistReducer;
