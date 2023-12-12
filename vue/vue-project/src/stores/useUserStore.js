//useUserStore.js
import { defineStore } from 'pinia';
//import { io } from "socket.io-client";
//import {socket} from "@/utils/socket.js";
export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    actions: {
        async addUser(user) {
            const response = await fetch('/api/agregar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                this.users.push(data);
            } else {
                console.error('Error adding user:', data.message);
            }
        },
        async removeUser(userId) {
            const response = await fetch(`/api/eliminar-usuario/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.users = this.users.filter(user => user.id !== userId);
            } else {
                const data = await response.json();
                console.error('Error removing user:', data.message);
            }
        },
        async updateUserStatus(userId, loggedIn) {
            const response = await fetch(`/api/actualizar-usuario/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loggedIn }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.error('Error updating user status:', data.message);
            }

            const user = this.users.find(user => user.id === userId);
            if (user) {
                user.loggedIn = loggedIn;
            }
        },
    },
});
