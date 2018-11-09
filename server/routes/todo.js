const express = require('express');
const passport = require('passport');

const Todo = require('../models/Todo');
const User = require('../models/User');

const router = express.Router();

router.delete('/:id', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      if (!user) { return res.status(404).json({msg: 'Unable to find user'}); }

      const todo = await user.todos.find((id) => id.toString() === req.params.id);
      if (!todo) { return res.status(404).json({msg: 'Unable to find todo in user todos'}); }

      user.todos = user.todos.filter((id) => id.toString() !== req.params.id);

      user = await user.save();

      const {todos} = await user.populate('todos').execPopulate();

      await Todo.findByIdAndDelete(req.params.id);

      res.json({todos});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.get('/all', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('todos').exec();

      if (!user) { return res.status(404).json({msg: 'Unable to find user'}); }

      res.json({todos: user.todos});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.get('/:id', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('todos').exec();
      if (!user) { return res.status(404).json({msg: 'Unable to find user'}); }

      const todo = await user.todos.find((todo) => todo.id.toString() === req.params.id);
      if (!todo) { return res.status(404).json({msg: 'Unable to find todo in user todos'}); }

      return res.json({todo});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.patch('/:id', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('todos').exec();
      if (!user) { return res.status(404).json({msg: 'Unable to find user'}); }

      let todo = await user.todos.find((todo) => todo.id.toString() === req.params.id);
      if (!todo) { return res.status(404).json({msg: 'Unable to find todo in user todos'}); }

      const {_id, __v, ...lightTodo} = todo._doc;

      for (const prop in lightTodo) {
        if (req.body[prop]) {
          lightTodo[prop] = req.body[prop];
        }
      }

      todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {$set: lightTodo},
        {new: true},
      );

      return res.json({todo});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.post('/new', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id);

      if (!user) { return res.status(404).json({msg: 'Unable to find user'}); }
      if (!req.body.title) { return res.status(400).json({msg: 'Title is required'}); }

      const newTodo = new Todo({
        title: req.body.title
      });

      const todo = await newTodo.save();

      user.todos.push(todo);

      user = await user.save();

      const {todos} = await user.populate('todos').execPopulate();

      res.json({todos});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;