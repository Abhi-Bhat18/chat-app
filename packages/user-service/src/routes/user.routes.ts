import express from 'express'
import { getAllUsers, getProfile} from '../controllers/user.controller';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:id', getProfile);
export default router;
