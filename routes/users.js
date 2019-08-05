const router = require('express-promise-router')()
const UserController = require('./../controllers/UserController')
const { loadHeader, loadParam } = require('../middleware/loaders')
const { validateBody, validateHeader, schema } = require('../middleware/validation')

router.route('/users/register')
    .post(validateBody(schema.createUser), UserController.createOne)

router.route('/auth/users')
    .get(UserController.getAll)

// router.param('userId',loadParam.userId)

router.route('/auth/users/:userId/userId')
    .get(UserController.getOne)
    .patch(validateBody(schema.updateUser), UserController.updateOne)
    .delete(UserController.deleteOne)

module.exports = router 