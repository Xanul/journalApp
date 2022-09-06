import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"




export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea hic autem, et quis voluptatem reprehenderit officia neque nemo pariatur blanditiis magnam itaque expedita, nobis temporibus exercitationem officiis atque soluta.</Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />

      <IconButton
        
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.8 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
      

    </JournalLayout>
  )
}
