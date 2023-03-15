import { User } from './types'
import { APIGatewayEventIdentity } from 'aws-lambda'
import * as dataAccessLayer from './dataLayer'


type FindByUserIdInput = {
    userId: string
    requester: APIGatewayEventIdentity
}


type ListAllUsersInput = {
    requester: APIGatewayEventIdentity
}

export async function findUserById({ userId, requester }: FindByUserIdInput): Promise<User> {
    const targetUser = await dataAccessLayer.getUserById(userId)
    const requesterDetails = await dataAccessLayer.getUserByUsername(requester?.user)

    // we have to make sure that the person requesting this users details is allowed to see them
    // aka: are they in the same org
    if (targetUser.orgId !== requesterDetails.orgId) {
        throw new Error('You are not allowed')
    }

    return targetUser
}


export async function listAllUsers({ requester }: ListAllUsersInput): Promise<User[]> {
    
    const requesterDetails = await dataAccessLayer.getUserByUsername(requester?.user)
    // by getting the requesters org ID, we make sure they can only see users in their org and no one else
    const usersInOrg = await dataAccessLayer.findAllUsersInOrg(requesterDetails.orgId)

    return usersInOrg
}