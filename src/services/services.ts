import React from 'react';
import { message } from 'antd';

import Config from './../config';
import {
    ESexKeyNames,
    ESizeKeyNames,
    EAgeKeyNames,
    ESexKey,
    ESizeKey,
    EAgeKey
} from './../enums/enums';
import { Search, SearchResult, Options } from './../dto/SearchDTO';

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
        if (accessKey===undefined || accessKey==='undefined') return null;
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
            if (null===_headers(xhr)) {
                reject()
                return logout();
            }
            xhr.addEventListener('progress', (evt) => {
                !!progress&&progress( Math.ceil((evt.loaded/evt.total * 100.0))  );
            });
            xhr.onload = (evt:any) => {
                if ( parseInt(evt.currentTarget.response.status) === 200 ) {
                    const { data } = evt.currentTarget.response;
                    if (data.access_key) sessionStorage.setItem(ACCESS_KEY,data.access_key);
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
    const [ search, setSearch ] = React.useState( new Search({sex_key:ESexKey[ESexKey.FEMALE]}) );
    const [ options, setOptions ] = React.useState( new Options() );
    const [ searchResult, setResult ] = React.useState( new SearchResult({}) );
    const [ progress, setProgress ] = React.useState( 0 );

    function _doSearch() {
        setProgress(0);
        new Promise((resolve, reject) => {
            _call('pet/search', 'POST', { search: search, options: options }, (progress:any) => setProgress(progress) ).then(
                (res) => {
                    console.log(res);
                    setResult( new SearchResult(res) );
                },
                (err) => reject()
            );
        });
    }

    React.useMemo(
        () => _doSearch(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ search, options ]
    );
    
    return [
        search,
        (event: any) => {
            setOptions( new Options( 1, options.limit, options.sort ) );
            setSearch( new Search(event) );
        },
        searchResult,
        options,
        (event: any) => {
            setOptions( new Options(event.page, event.limit, event.sort) );
        },
        progress,
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

function logout() {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(USER);
    sessionStorage.removeItem(USER_LOGGED);
    return window.location.href='/login';
}

export {
    login,
    logout,

    useLoggedStatus,
    useSearch,
};