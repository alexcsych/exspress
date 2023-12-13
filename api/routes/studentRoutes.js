const express = require('express')
const router = express.Router()
const {
  listOfStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  avgMark
} = require('../controllers/studentController')

router
  .route('/student')
  .get(listOfStudents)
  .put(createStudent)
  .patch(updateStudent)

router.route('/student/avg').get(avgMark)

router.route('/student/:_id').delete(deleteStudent)

module.exports = router
