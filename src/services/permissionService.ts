import { Info } from "../models/info";
import { Group } from "../models/group";
import { Permission } from "../models/permission";
import { SubModule } from "../models/subModule";
import bcrypt from "bcrypt";

class PermissionService {

    register = async (body: any) => {
        try {
            const { user_name, email, password, role } = body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const info = await Info.create({ user_name, email, password: hashedPassword, role });
            return info;
        } catch (error) {
            console.log("Error", error);
        }
    };

    createGroup = async (body: any) => {
        try {
            const group = await Group.create(body);
            const permission = body.permission.map((allow: any) => ({
                group_id: group.id,
                subModule_id: allow.subModule_id,
                all: allow.all,
                create: allow.create,
                view: allow.view,
                canUpdate: allow.canUpdate,
                delete: allow.delete,
            }));
            await Permission.bulkCreate(permission);
            return {
                group,
                permission
            };
        } catch (error) {
            console.log("Error", error);
        }
    };

    get = async (payload: any) => {
        try {
            const whereCondition: any = {};
            if (payload.group_id) {
                whereCondition.group_id = payload.group_id;
            }
            if (payload.subModule_id) {
                whereCondition.subModule_id = payload.subModule_id;
            }
            const view = await Permission.findAll({
                include: [
                    { model: SubModule, attributes: ['id', 'mainModule_id', 'subModule'] },
                    { model: Group, attributes: ['id', 'user_id', 'group_name'] }
                ],
                where: whereCondition
            });
            return view;
        } catch (error) {
            console.log("Error", error);
        }
    };

};

export default new PermissionService();