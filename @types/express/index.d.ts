import { User } from "../../src/model/User";

declare global {
    namespace Express {
        interface Request {
            user: User | null
        }
    }
}