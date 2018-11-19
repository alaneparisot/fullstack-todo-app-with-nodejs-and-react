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
import TextField from '@material-ui/core/TextField/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

import { getTodos, addTodo, updateTodo, deleteTodo } from '../redux/actions/todoActions';
import Button from '@material-ui/core/Button/Button';

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
  paperTodoAdd: {
    ...theme.mixins.gutters(),
    maxWidth: 360,
    marginTop: 36,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Todos extends Component {
  state = {
    todos: [],
    newTodoTitle: '',
    errors: {},
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

  handleNewTodoTitleChange = (event) => {
    this.setState({newTodoTitle: event.target.value});
  };

  handleNewTodoSubmit = async (event) => {
    event.preventDefault();
    await this.props.addTodo(this.state.newTodoTitle);
    this.setState({newTodoTitle: ''});
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
          color="default"
          disableRipple
        />
        <ListItemText primary={todo.title}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete"
                      onClick={() => this.handleTodoDelete(todo._id)}>
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

        <Paper className={classes.paperTodoAdd}>
          <Typography variant="h5" align="center" gutterBottom>
            Add a New Todo
          </Typography>
          <form className={classes.container}
                noValidate autoComplete="off"
                onSubmit={this.handleNewTodoSubmit}>
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.newTodoTitle}
              onChange={this.handleNewTodoTitleChange}
              margin="normal"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="default"
              fullWidth
            >
              Add a New Todo
            </Button>
          </form>
        </Paper>

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
  addTodo: PropTypes.func.isRequired,
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
  connect(mapStateToProps, {getTodos, addTodo, updateTodo, deleteTodo}),
)(Todos);