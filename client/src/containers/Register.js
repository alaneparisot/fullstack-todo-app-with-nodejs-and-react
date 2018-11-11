import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { registerUser } from '../redux/actions/authActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paperForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  paperError: {
    marginTop: theme.spacing.unit * 8,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends Component {
  state = {
    email: '',
    password: '',
    errors: null
  };

  // TODO: Use `getDerivedStateFromProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {email, password} = this.state;
    const newUser = {email, password};

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <Paper className={classes.paperForm}>
          <Avatar className={classes.avatar}>
            <LockIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus
                     value={this.state.email} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password"
                     value={this.state.password} onChange={this.handleChange}/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
        {this.state.errors ? (
          <Paper className={classes.paperError} elevation={1}>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">
              {this.state.errors.msg}
            </Typography>
          </Paper>
        ) : null}
      </Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

// TODO: Use Hooks
export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {registerUser}),
)(Register);