import { randomUUID } from "node:crypto";

export class DatabaseMemory{
    #users = new Map();

    list(){
        return Array.from(this.#users.values());
    }

    find(id){
        return this.#users.get(id);
    }

    create(user) {
        const usersId = randomUUID();
        this.#users.set(usersId, user);
        return usersId;
    }

    update(id, user) {
        this.#users.set(id, user);
    }

    delete(id) {
        this.#users.delete(id);
    }
}