import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
  } from "@mui/material";
  
  function InfoDialog({ open, onClose }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>
          About Challenger.gg
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: "black" }}>
          <Typography variant="body1" sx={{ color: "white" }}>
            Challenger.GG is a website where you can search for League of Legends players, check their matches and explore champions' stats.
          </Typography>
          <Typography variant="body1" sx={{ color: "white", mt: 2 }}>
            Contact the developer:{" "}
            <a
              href="https://github.com/kbdev-21"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9", textDecoration: "none" }}
            >
              github.com/kbdev-21
            </a>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "black" }}>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default InfoDialog;
  