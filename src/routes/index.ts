import { Router } from 'express';
import commonRoutes from './commonRoutes';

const router: Router = Router();

router.use('/admin', commonRoutes);

export default router;