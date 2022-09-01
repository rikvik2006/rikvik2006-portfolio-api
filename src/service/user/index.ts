import axios from "axios";
import Users, { User } from "../../database/schemas/Users";

export const getUserInformationService = async (id: string) => {
    const userInf = await Users.findById(id);
    return userInf;
}