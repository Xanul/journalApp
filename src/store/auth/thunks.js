import { deleteDoc, doc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from "../../firebase/providers";
import { clearNotesOnLogout, deleteNoteById } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { uid, ok, photoURL, displayName, errorMessage } =
      await loginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {

  return async ( dispatch ) => {

    await logoutFirebase();


    dispatch( clearNotesOnLogout() )
    dispatch( logout() );

  }

}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
    const resp = await deleteDoc( docRef );

    dispatch( deleteNoteById(note.id) );


  }
}