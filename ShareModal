import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';

// Position modal in center of window
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: 'relative',
  };
};

// Style modal and modal components
const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textTransform: 'none',
    outline: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  shareButton: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    textTransform: 'none',
  },
  listContainer: {
    backgroundColor: '#f0f8ff',
    width: theme.spacing.unit * 38,
    maxHeight: 150,
    overflow: 'auto',
    borderRadius: 5,
    border: 5,
  },
});

// Change default color palette and text-alterations
const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#828282",
    },
  },
});

// Create user in shared users list
function SharedUser(props) {
  const val = props.val;
  
  return (
    <ListItem 
      dense={'true'}
      divider={val}
      id="item"
    >
      <ListItemText
        primary={props.userEmail}
      />
        <IconButton 
          edge="end" 
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
    </ListItem>
  )
}

// Toggle hide/show shared user list
function hideList() {
  var userList = document.getElementById("userList");
  userList.style.display = userList.style.display == "none" ? "block" : "none";
}

// Get rid of last divider in shared user list
function lastEmail(list, email) {
  const last = list.length - 1;
  if (list.indexOf(email) === last) {
    return false;
  }
  else {
    return true;
  }
}

// ** To delete ** (the following two arrays)
// Create temporary emails for typeahead function
const sharedUsers = [
  "ben@decision.ai", 
  "sasha@decision.ai", 
  "dan@decision.ai",
];
const mockEmailList = [
  'dan@decision.ai',
  'david@decision.ai',
  'sasha@decision.ai',
  'sarah@decision.ai',
  'ben@decision.ai',
  'brooke@decision.ai',
  'benlehrburger@gmail.com',
  'saniri11@gmail.com',
  'danbecker@gmail.com',
];

// Initialize tag to contain close icon
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  
  return (
    <MuiDialogTitle 
      disableTypography 
      className={classes.root} {...other}
    >
      <Typography variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton 
          className={classes.closeButton} 
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// Initialize tag to contain modal body
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

// Initialize tag to contain share button
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// Create ShareModal class, define mouse events, and implement modal structure with JSX
class ShareModal extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
      <MuiThemeProvider theme={theme}>

      {/* Share button on Your Models page */}
        <Button 
          variant="contained" 
          type="button" 
          onClick={this.handleOpen}
        >
          Share
        </Button>

        {/* Modal */}
        <Modal 
          open={this.state.open} 
          onClose={this.handleClose}
        >
          <div 
            style={getModalStyle()} 
            className={classes.paper} 
          >
            <DialogContent>

              {/* Modal Title */}
              <Grid container 
                spacing="1" 
                alignItems="center"
              >
                <Grid item>
                  <Avatar>
                    <PersonAddIcon 
                      style={{ fontSize: 'large' }}
                      style={{ display: 'block' }}
                    >
                    </PersonAddIcon>
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography 
                    variant="h6"
                  >
                    Enter valid email address
                  </Typography>
                </Grid>
              </Grid>
              <DialogTitle 
                id="customized-dialog-title" 
                onClose={this.handleClose}
              >
              </DialogTitle>

              {/* Input bar */}
              <Autocomplete
                options={mockEmailList}
                ListboxProps={{ 
                  style: { 
                    maxHeight: 180, 
                    overflow: 'auto' 
                  } 
                }}                
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    label="Add email" 
                    variant="outlined" 
                    fullWidth="true" 
                  />}
              />

              {/* Shared users expansion */}
              <Button 
                type="button" 
                color="secondary" 
                onClick={hideList}
                id="button"
              >
                Shared with {sharedUsers.length} users
              </Button>
              <div 
                style={{ height: 8 }}
              >
              </div>
                <Grid>
                  <div 
                    id="userList" 
                    style={{display: "none"}}
                    className={classes.listContainer}
                  >
                    <List>
                      <div 
                        id="users"
                      >
                        {sharedUsers.map(email => 
                          <SharedUser 
                            userEmail={email}
                            val={lastEmail(sharedUsers, email)}
                          />
                        )}
                      </div>
                    </List>
                  </div>
                </Grid>
            </DialogContent>
            <div 
              style={{ height: 4 }}
            >
            </div>

            {/* Share button */ }
            <DialogActions>
              <Button autoFocus 
                color="primary" 
                variant="contained" 
                classname={classes.shareButton}
              >
                Share
              </Button>

            </DialogActions>
          </div>
        </Modal>
      </MuiThemeProvider>
      </div>
    );
  }
}

ShareModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Initialize intermediary variable
const ShareModalWrapped = withStyles(styles)(ShareModal);

export default ShareModalWrapped;
