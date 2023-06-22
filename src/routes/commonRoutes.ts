import { Router } from 'express';
import permissionController from '../controllers/permissionController';
import { registerSchema, groupSchema } from "../validation/joi"

const router: Router = Router();

router.post('/register', registerSchema, permissionController.register);

router.post('/createGroup', groupSchema, permissionController.createGroup);

router.get('/get', permissionController.get);

export default router;
