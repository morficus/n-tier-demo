import { APIGatewayEvent } from 'aws-lambda'
import * as serviceLayer from './serviceLayer'

export async function findUserById(input: APIGatewayEvent) {

    const body = JSON.parse(input.body || '')
    const whoMadeTheApiCall = input.requestContext.identity

    // if we did not get an ID as part of the input... then throw an error
    if (!body || !body.id) {
        throw new Error('You must provide an ID')
    }

    return serviceLayer.findUserById({ userId: body.id, requester: whoMadeTheApiCall })

}

export async function listAllUsers(input: APIGatewayEvent) {
    const whoMadeTheApiCall = input.requestContext.identity

    const users = await serviceLayer.listAllUsers({ requester: whoMadeTheApiCall })

    // if there was any type of data-reshaping that needed to take place, then I would do that here
    return users

}