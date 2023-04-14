const exporess = require('express');
const router = exporess.Router();
const {
    getAllUsers,
   
} = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_List');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin),getAllUsers)
 


module.exports = router;