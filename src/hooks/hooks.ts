import React from 'react';
import { message } from 'antd';

import { USER_LOGGED, _call } from './../services/services';
import {
    ESexKey} from './../enums/enums';
import {
    Search,
    SearchResult,
    Options
} from './../dto/SearchDTO';
import Config from './../config';

/**
 * This hook verify users login
 * : check if session exists and it is logged
 * 
 */
function useLoggedStatus() : boolean {
    const [ isLogged ] = React.useState(
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
                () => reject()
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


export {
    useLoggedStatus,
    useSearch,
};