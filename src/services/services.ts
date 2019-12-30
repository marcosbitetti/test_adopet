import React from 'react';
import { message } from 'antd';
import Config from './../config';

function _headers(xhr:XMLHttpRequest) {
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
    return xhr;
}

function _call( endpoint:string, method:string='GET', data:any=null) {
    return new Promise( (resolve,reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.timeout = Config.requestTimeout;
            xhr.responseType = 'json';
            xhr.open( method, Config.api + endpoint, true );
            _headers(xhr);
            xhr.addEventListener('load', evt => console.log(evt) )
            xhr.addEventListener('progress', evt => console.log(evt) )
            xhr.addEventListener('error', evt => console.log(evt) )
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

/**
 * start point, check if session exists and it is logged
 * 
 */
function useLoggedStatus() : boolean {
    const {sessionStorage} = window;
    const [ isLogged, setIsLogged ] = React.useState(
        !!sessionStorage.getItem('user-logged')
    );
    
    // grant bronser compatibility
    if (!sessionStorage) {
        message.error( 'Brownser unsupported', Config.messageDuration);
        return false;
    }
    setTimeout(()=> {
        //sessionStorage.setItem('access-key','oi');
        setIsLogged(true);
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

function getCredentials() {
    return _call('auth/session-request','POST',{'system_api_key':Config.apiKey});
}

export {
    getCredentials,
    useLoggedStatus,
};