import {DJANGO_URL} from "../consts/consts";

export function giveAccess(body) {
    let url = DJANGO_URL + '/accesses/';
    return dispatch => fetch(url, {
        method: 'POST',

        body: JSON.stringify(body)
    });
}

export function addGroup(body) {
    let url = DJANGO_URL + '/groups/';
    return dispatch => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export function addUserToGroup(body, groupId) {
    let url = DJANGO_URL + `/groups-insert/${groupId}/`;
    return dispatch => fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}