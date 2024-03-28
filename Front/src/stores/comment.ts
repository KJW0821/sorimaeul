import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Comment {
  commentCode: string;
  nickname: string;
  profileImage: string;
  content: string;
  time: string;
}


export interface CommentState {
  category: string;
  selectedPostId: string | null;
  comments: Comment[];
}

const initialState: CommentState = {
  selectedPostId: null,
  category: "",
  comments: [],
}

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(comment => comment.commentCode !== action.payload);
    }, 
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setSelectedPostId: (state, action: PayloadAction<string | null>) => {
      state.selectedPostId = action.payload;
    }, 
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  },
});

export const { addComment, removeComment, setComments, setSelectedPostId, setCategory } = commentSlice.actions;
export default commentSlice.reducer;