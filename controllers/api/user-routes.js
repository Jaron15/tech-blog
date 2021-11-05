const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

module.exports = router;