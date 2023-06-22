import { Request, Response } from "express";
import permissionService from "../services/permissionService";
import { statusCode } from "../validation/status";
import { logger } from "../winston/logger";

class PermissionController {

    register = async (req: Request, res: Response) => {
        try {
            const { ...body } = req.body;
            const info = await permissionService.register(body);
            logger.info('registered successfully', { info });
            res.status(statusCode.success).json({ status: true, data: info });
        } catch (error) {
            logger.error('unable to register', { error });
            res.status(statusCode.internalServerError).json({ status: false, error: statusCode.error });
        }
    };

    createGroup = async (req: Request, res: Response) => {
        try {
            const { ...body } = req.body;
            const group = await permissionService.createGroup(body);
            logger.info('group created successfully', { group });
            res.status(statusCode.success).json({ status: true, data: group });
        } catch (error) {
            logger.error('unable to create', { error });
            res.status(statusCode.internalServerError).json({ status: false, error: statusCode.error });
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.query };
            const view = await permissionService.get(payload);
            if (view) {
                logger.info('data fetched successfully', { view });
                res.status(statusCode.success).json({ status: true, data: view });
            } else {
                logger.info('no data found', { view });
                res.status(statusCode.success).json({ status: false, data: null });
            }
        } catch (error) {
            logger.error('unable to fetch', { error });
            res.status(statusCode.internalServerError).json({ status: false, error: statusCode.error });
        }
    };

}

export default new PermissionController();