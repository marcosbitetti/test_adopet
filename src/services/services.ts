import React from 'react';
import { message } from 'antd';

import Config from './../config';
import { Search, Options } from './../dto/SearchDTO';

const {sessionStorage} = window;

const ACCESS_KEY = 'access_key';
const USER_LOGGED = 'user_logged';
const USER = 'organization_user';

// cached user
let _user: any = null;

/*
 * Low level calls
 */
function _headers(xhr:XMLHttpRequest) {
    const accessKey = sessionStorage.getItem(ACCESS_KEY);
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
    if (accessKey!==null) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessKey);
    }
    return xhr;
}

function _call( endpoint:string, method:string='GET', data:any=null, progress: any = null) {
    return new Promise( (resolve,reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.timeout = Config.requestTimeout;
            xhr.responseType = 'json';
            xhr.open( method, Config.api + endpoint, true );
            _headers(xhr);
            xhr.addEventListener('progress', (evt) => {
            });
            xhr.onload = (evt:any) => {
                if ( parseInt(evt.currentTarget.response.status) === 200 ) {
                    const { data } = evt.currentTarget.response;
                    sessionStorage.setItem(ACCESS_KEY,data.access_key);
                    resolve(data);
                } else reject();
            }
            xhr.onerror = (evt) => {
                console.log(evt);
                reject();
            }
            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        } catch( e ) {
            // console.log(e);
            reject();
        }
    });
}

function _getCredentials() {
    return new Promise( (resolve, reject) => {
        _call('auth/session-request','POST',{'system_api_key':Config.apiKey}).then(
            (res:any) => {
                const accessKey = res[ACCESS_KEY];
                if (accessKey) {
                    // sotre
                    sessionStorage.setItem(ACCESS_KEY, accessKey);
                    return resolve(res);
                }
                reject();
            },
            (err) => {
                console.log(err);
                reject();
            }
        );
    } );
}


/*
 * / Low level calls
 */


/**
 * This hook verify users login
 * : check if session exists and it is logged
 * 
 */
function useLoggedStatus() : boolean {
    const [ isLogged, setIsLogged ] = React.useState(
        !!sessionStorage.getItem(USER_LOGGED)
    );
    
    // grant bronser compatibility
    if (!sessionStorage) {
        message.error( 'Brownser unsupported', Config.messageDuration);
        return false;
    }
    setTimeout(()=> {
        //sessionStorage.setItem('access-key','oi');
        //setIsLogged(true);
    }, 5000);

    /*React.useEffect(() => {

    });
    if( !sessionStorage.getItem('access-key') ) {
        //getCredentials();
        setTimeout(()=>{},5000);
        return false;
    }*/
    return isLogged;
}


/**
 * Search hook
 * 
 */
function useSearch(): any {
    const [ search, setSearch ] = React.useState({});

    /*new Promise((resolve, reject) => {
        const s = new Search();
        _call('pet/search', 'POST', s, (progress:any) => console.log(progress) ).then(
            (res) => {
                console.log(res);
            },
            (err) => reject()
        );
    });*/
    console.log(search);

    return [
        search,
        (event: any) => {
            setSearch(event);
        }
    ];
}


function login(email:string, password:string) {
    return new Promise( (resolve, reject) => {
        if (sessionStorage.getItem(ACCESS_KEY)==null) {
            //message.error( 'Login error', Config.messageDuration);
            return _getCredentials().then(
                (res) => {
                    login(email,password).then(
                        (res) => { resolve(res) },
                        (err) => { reject() }
                    );
                },
                (err) => { reject() }
            )
        }
        _call('auth/session-register', 'POST', {
            'organization_user': {
                email: email,
                password: password,
            }
        }).then(
            (res:any) => {
                sessionStorage.setItem(USER,JSON.stringify( res.organization_user ));
                sessionStorage.setItem(USER_LOGGED,'true');
                _user = {...res.organization_user};
                resolve(_user);
            },
            (err) => {
                console.log(err);
                reject()
            }
        );
    } );
}

export {
    login,

    useLoggedStatus,
    useSearch,
};