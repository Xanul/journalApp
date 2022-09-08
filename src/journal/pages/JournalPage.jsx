import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingNotes, startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {

    dispatch( startNewNote() );
    

  }

  return (
    <JournalLayout>
      
      {
        (!!active) ? <NoteView /> : <NothingSelectedView />
      }

      {/* <NothingSelectedView /> */}
      {/* <NoteView /> */}

      <IconButton
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.8 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}
        onClick={ onClickNewNote }
        disabled={ isSaving ? true : false }
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
      

    </JournalLayout>
  )
}
