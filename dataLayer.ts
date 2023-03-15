import { User } from './types'

export async function getUserById(userId: string | null): Promise<User> {
    // pretend this is doing some database queries or what ever
}

export async function getUserByUsername(username: string | null): Promise<User> {
    // pretend this is doing some database queries or what ever
}

export async function findAllUsersInOrg(orgId): Promise<User[]> {
    // pretend this is doing some database queries or what ever
}