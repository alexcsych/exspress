const Student = require('../models/studentModel')

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get a list of students.
 *     tags: [Students]
 *     description: Retrieve a list of all students.
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Bad request.
 */
module.exports.listOfStudents = async (req, res, next) => {
  try {
    const students = await Student.find({})
    res.status(200).send(students)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /student:
 *   put:
 *     summary: Create a new student.
 *     tags: [Students]
 *     description: Add a new student to Student collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Alex Sich
 *               group:
 *                 type: string
 *                 description: The user's group.
 *                 example: RPZ 20 1/9
 *               photo:
 *                 type: string
 *                 description: The user's photo.
 *                 example:
 *               mark:
 *                 type: integer
 *                 description: The user's mark.
 *                 example: 10
 *               IsDonePr:
 *                 type: boolean
 *                 description: The user's IsDonePr.
 *                 example: true
 *     responses:
 *       201:
 *         description: A new student.
 *         content:
 *           application/json:
 *             example:
 *               name: Dima,
 *               photo:
 *               group: RPZ 20 1/9,
 *               mark: 12,
 *               _id: 65797b1cd4ea0c5169201a87,
 *               createdAt: 2023-12-13T09:36:28.765Z,
 *               updatedAt: 2023-12-13T09:36:28.765Z,
 *               __v: 0
 *       500:
 *         description: Bad request.
 */
module.exports.createStudent = async (req, res, next) => {
  try {
    console.log('req.body :>> ', req.body)
    const students = new Student(req.body)
    const student = await students.save()
    res.status(201).send(student)
  } catch (error) {
    next(error)
  }
}

module.exports.updateStudent = async (req, res, next) => {
  try {
    console.log('req.params :>> ', req.query)
    console.log('req.body :>> ', req.body)
    const student = await Student.findOneAndUpdate(req.query, req.body, {
      new: true
    })
    if (!student) {
      return res.status(404).send('Student not found')
    }
    res.status(200).send(student)
  } catch (error) {
    next(error)
  }
}

module.exports.deleteStudent = async (req, res, next) => {
  try {
    console.log('req.params :>> ', req.params)
    const student = await Student.findOneAndDelete(req.params)
    console.log('student :>> ', student)
    if (!student) {
      return res.status(404).send('Student not found')
    }
    res.status(200).send(student)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /student/avg:
 *   get:
 *     summary: Get a average mark by group.
 *     tags: [Students]
 *     description: Retrieve a average mark by group.
 *     parameters:
 *       - in: query
 *         name: group
 *         schema:
 *           type: string
 *         description: Filter students by group.
 *     responses:
 *       200:
 *         description: A average mark by group.
 *         content:
 *           application/json:
 *             example:
 *               averageMark: 2
 *       404:
 *         description: No students match the specified criteria.
 *       500:
 *         description: Bad request.
 */
module.exports.avgMark = async (req, res, next) => {
  try {
    console.log('req.query :>> ', req.query)
    const students = await Student.aggregate([
      { $match: req.query },
      { $group: { _id: null, total: { $avg: '$mark' } } }
    ])
    console.log('students :>> ', students)
    if (students.length === 0) {
      return res.status(404).send('No students match the specified criteria')
    }
    const averageMark = students[0].total
    res.status(200).send({ averageMark })
  } catch (error) {
    next(error)
  }
}
