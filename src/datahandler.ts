import { v4 } from "uuid";
import { User, UserWithoutId } from "./types";

class DataHandler {
    private users: User[] = [];

    addUser(userData: UserWithoutId): User {
        const newUser = {
            id: v4(),
            ...userData,
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: string, userData: UserWithoutId): User | undefined {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return undefined;
        }

        this.users[index] = { id, ...userData };

        return this.users[index];
    }

    getUserById(id: string): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    deleteUser(id: string): User | undefined {
        const deleted = this.users.find((user) => user.id === id);
        this.users = this.users.filter((user) => user.id !== id);
        return deleted;
    }

    getAllUsers() {
        return this.users;
    }
}

export const datahandler = new DataHandler();