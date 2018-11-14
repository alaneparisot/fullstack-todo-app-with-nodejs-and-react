import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

import { getTodos, updateTodo, deleteTodo } from '../redux/actions/todoActions';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    maxWidth: 360,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paperError: {
    marginTop: theme.spacing.unit * 8,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Todos extends Component {
  state = {
    todos: [],
    errors: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    this.setState({todos: nextProps.todos.list})
  }

  componentDidMount() {
    this.props.getTodos();
  }

  handleTodoDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleTodoToggle = async (todo) => {
    todo.isDone = !todo.isDone;
    this.props.updateTodo(todo);
  };

  render() {
    const {todos, errors} = this.state;
    const {classes} = this.props;

    const todoList = todos.map((todo) => (
      <ListItem key={todo._id} role={undefined} dense button
                onClick={() => this.handleTodoToggle(todo)}>
        <Checkbox
          checked={todo.isDone}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={todo.title}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => this.handleTodoDelete(todo._id)}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    return (
      <>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          My Todos
        </Typography>

        {todos.length > 0 ? (
          <Paper className={classes.root}>
            <List>
              {todoList}
            </List>
          </Paper>
        ) : (
          <Typography variant="body2" align="center" color="textSecondary" paragraph>
            There is no to-do yet.
          </Typography>
        )}

        {errors && errors.msg ? (
          <Paper className={classes.paperError} elevation={1}>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">
              {errors.msg}
            </Typography>
          </Paper>
        ) : null}
      </>
    );
  }
}

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  todos: state.todos,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {getTodos, updateTodo, deleteTodo}),
)(Todos);