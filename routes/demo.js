const { Router } = require('express');
const router = Router();
const helper = require('../utils/helpers');
const { check, validationResult } = require('express-validator');

const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const users = await db
      .promise()
      .query(`select username, note from tbl_user`);
    if (users) {
      res.status(200).json(users[0]);
    } else {
      res.status(400).json({ msg: 'No user found' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db
      .promise()
      .query(`Select username, note from tbl_user WHERE id = ${id}`);
    if (user) {
      res.status(200).json(user[0]);
    } else {
      res.status(400).json({ msg: `Unable to find tbl_user` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post(
  '/',
  check('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('Username length is from 3 to 10'),
  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 3, max: 10 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: await helper.errorMsgHandler(errors.array()) });
      }
      const { username, password, note } = req.body;
      hashedPass = helper.hashPassword(password);
      await db
        .promise()
        .query(
          `INSERT INTO tbl_user (username, password, note) values ("${username}","${hashedPass}","${note}")`
        );
      res.status(200).json({ msg: 'Successfully Created' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: `An error has occured` });
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const { username, password, note } = req.body;
    const { id } = req.params;
    console.log(id);
    hashedPass = helper.hashPassword(password);
    await db
      .promise()
      .query(
        `Update tbl_user SET username = "${username}", password = "${password}",note = "${note}" where id = ${id} `
      );
    res.status(200).json({ msg: 'Successfully Updated' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: `An error has occured` });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query(`DELETE FROM tbl_user WHERE id = ${id}`);
    res.status(200).json({ msg: 'Successfully Deleted' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: `An error has occured` });
  }
});

module.exports = router;
