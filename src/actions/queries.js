import {DJANGO_URL} from "../consts/consts";

export const AddGroup = (groupName) => {
    let url = DJANGO_URL + '/groups/';
    let body = {
        name: groupName
    };
    return dispatch => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};


export const addToGroup = (groupId, userId, username) => {
    console.log("Hello");
    let url = DJANGO_URL + `/groups-insert/${groupId}/`;
    let body = {
        participants: [
            {
                id: userId,
                username: username
            }
        ]
    };
    console.log(body);
    return dispatch => fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(resp => {
        console.log(resp)
    })
};


export const holdSales = (sale, groupId) => {
    let url = DJANGO_URL + `/groups-editor/${groupId}/`;
    return dispatch => fetch(url)
        .then(resp => resp.json())
        .then(body => {
            console.log(body);
            let data = {
                sale: sale,
                sale_started: new Date()
            };
            console.log(data);
            fetch(DJANGO_URL + `/editors-add-sale/${body[0].id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(resp => {
                console.log(resp);})
        }).catch(e => {console.log(e)});
};



export const groupEditor = (groupId) => {
    return dispatch => fetch(DJANGO_URL + `/groups-editor/${groupId}/`)
        .then(resp => resp.json()).then(body => {
            console.log("body");
            console.log(body);
            return body[0].id
        })
};


export const giveAuthorAccess = (groupId, userId, socialId, groupEditor) => {
    return dispatch => groupEditor(groupId).then( editorId =>  {
            let data = {
                social_name: parseInt(socialId),
                customer: parseInt(userId),
                editor: parseInt(editorId),
                date_start: new Date(),
                date_end: "2021-06-10T12:00:34.140Z",


            };
            console.log(JSON.stringify(data));
            let url = DJANGO_URL + '/accesses/';
            fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(resp => {
                console.log(resp)
            });
        }).catch(e => {
        console.log(e);
    });
};

export const denyAccess = (customerId, groupId, groupEditor) => {

    return dispatch => groupEditor(groupId)
        .then(editorId => {
            fetch(DJANGO_URL + `/user-author-access/${customerId}/${editorId}/`)
                .then(resp => resp.json()).then(body => {
                    let data = {
                       ...body[0],
                       date_end: new Date()
                    };
                    fetch(DJANGO_URL + '/accesses/', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    }).then(e => {
                        console.log("Access Denied");
                        console.log(e);
                    })
            })
        }).catch(e => {
            console.log(e);
        })
};

export const orderMessage = (customerId, groupId, text, styleId, networkId, groupEditor) => {
    return dispatch => groupEditor(groupId)
        .then(editorId => {
            fetch(DJANGO_URL + `/user-author-access/${customerId}/${editorId}/`)
                .then(resp => resp.json()).then(body => {
                let data = {
                    style: styleId,
                    date: new Date(),
                    text: text,
                    access: body[0] === undefined ? "" : body[0]["access"]
                };
                // // console.log(body);
                // for (let i = 0; i < body.length; ++i) {
                //     let el = body[i];
                //     if (el["social"] === networkId) {
                //         data.access = el["id"];
                //         break;
                //     }
                // }

                fetch(DJANGO_URL + '/system_messages/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(e => {
                    console.log("message ordered");
                    console.log(e);
                }).catch(e => {console.log(e)})
            });

        }).catch(e => {
            console.log(e);
        })
};




