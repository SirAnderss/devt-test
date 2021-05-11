import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateProfile from './CreateProfile';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    maxHeight: 500,
  },
  table: {
    minWidth: 650,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

export default function DenseTable(props) {
  const classes = useStyles();
  const [editModal, setEditModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const closeModal = () => {
    setEditModal(false);
    setCardModal(false);
    props.setLocalProfile(null);
  };

  const closePrompt = () => {
    props.setLocalProfile(null);
    setPrompt(false);
  };

  const getProfile = data => {
    props.setLocalProfile(data);
    setCardModal(true);
  };

  const editProfile = data => {
    props.setLocalProfile(data);
    setEditModal(true);
  };

  const removeProfile = data => {
    props.setLocalProfile(data);
    setPrompt(true);
  };

  const aceptPrompt = id => {
    props.removeProfile(id);
    props.setLocalProfile(null);
    setPrompt(false);
  };

  return (
    <>
      <Paper>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label='sticky table'
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Nombre completo</TableCell>
                <TableCell align='right'>Identificación</TableCell>
                <TableCell align='right'>Teléfono</TableCell>
                <TableCell align='right'>Direccón</TableCell>
                <TableCell align='right'>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.profiles.map((item, key) => (
                <TableRow key={key}>
                  <TableCell align='center'>
                    <Avatar src={item.avatar} alt={item.fullName} />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <span
                      className={classes.pointer}
                      onClick={() => getProfile(item)}
                    >
                      {item.fullName}
                    </span>
                  </TableCell>
                  <TableCell align='right'>{item.document}</TableCell>
                  <TableCell align='right'>{item.phoneNumber}</TableCell>
                  <TableCell align='right'>{item.address}</TableCell>
                  <TableCell align='right'>
                    <EditIcon
                      className={classes.pointer}
                      onClick={() => editProfile(item)}
                    />
                    &nbsp;&nbsp;
                    <DeleteIcon
                      className={classes.pointer}
                      onClick={() => removeProfile(item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={editModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editModal}>
          <div className={classes.paper}>
            <Typography variant='h3' component='h4' gutterBottom>
              Actualizar perfil {props.profile ? props.profile.fullName : ''}
            </Typography>
            <CreateProfile
              setProfile={props.updateProfile}
              profile={props.profile}
            />
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={cardModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={cardModal}>
          <div className={classes.paper}>
            <Typography variant='h3' component='h4' gutterBottom>
              <Profile profile={props.profile} />
            </Typography>
          </div>
        </Fade>
      </Modal>
      <Dialog
        open={prompt}
        onClose={closePrompt}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Desea eliminar a {props.profile ? props.profile.fullName : ''}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Está seguro de realizar esta operación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePrompt} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => aceptPrompt(props.profile._id)}
            color='primary'
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
