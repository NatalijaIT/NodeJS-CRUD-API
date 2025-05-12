import { validate } from "uuid";
import { datahandler } from "./datahandler";
import { RequestData } from "./types";

export const addUser = (req: RequestData) => {
    if (req.body === undefined) {
        return {
            statusCode: 400,
            body: { error: "Body is required" },
        };
    }

    try {
        const { username, age, hobbies } = req.body;

        if (!username || !age || !hobbies) {
            return {
                statusCode: 400,
                body: {
                    error:
                        "Username, age and hobbies are required. Hobbies can be an empty array.",
                },
            };
        }

        if (
            typeof username !== "string" ||
            typeof age !== "number" ||
            !hobbies.every((item) => typeof item === "string")
        ) {
            return {
                statusCode: 400,
                body: {
                    error: "Invalid data type"
                },
            };
        }

        const newUser = datahandler.addUser({ username, age, hobbies: hobbies });

        return {
            statusCode: 201,
            body: newUser,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};

export const updateUser = (req: RequestData) => {
    if (req.body === undefined) {
        return {
            statusCode: 400,
            body: { error: "Body is required" },
        };
    }
    try {
        const { username, age, hobbies } = req.body;

        if (!username || !age || !hobbies) {
            return {
                statusCode: 400,
                body: {
                    error:
                        "Username, age and hobbies (can be an empty array) are required.",
                },
            };
        }

        if (
            typeof username !== "string" ||
            typeof age !== "number" ||
            !hobbies.every((item) => typeof item === "string")
        ) {
            return {
                statusCode: 400,
                body: { error: "Invalid data type" },
            };
        }

        const userData = req.body;
        const userId = req.params?.id;

        if (!userId || !validate(userId)) {
            return {
                statusCode: 400,
                body: { error: "Invalid user ID" },
            };
        }

        const updated = datahandler.updateUser(userId, userData);
        if (!updated) {
            return {
                statusCode: 404,
                body: { error: "User is not founded" },
            };
        }

        return {
            statusCode: 200,
            body: updated,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};

export const getUserById = (req: RequestData) => {
    try {
        const userId = req.params?.id;

        if (!userId || !validate(userId)) {
            return {
                statusCode: 400,
                body: { error: "Invalid user ID" },
            };
        }

        const user = datahandler.getUserById(userId);
        if (!user) {
            return {
                statusCode: 404,
                body: { error: "User not found" },
            };
        }

        return {
            statusCode: 200,
            body: user,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};

export const deleteUser = (req: RequestData) => {
    try {
        const userId = req.params?.id;

        if (!userId || !validate(userId)) {
            return {
                statusCode: 400,
                body: { error: "Invalid user's ID" },
            };
        }

        const deleted = datahandler.deleteUser(userId);
        if (!deleted) {
            return {
                statusCode: 404,
                body: { error: "User is not founded" },
            };
        }

        return {
            statusCode: 204,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};

export const getUsers = () => {
    try {
        return {
            statusCode: 200,
            body: datahandler.getAllUsers(),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};
