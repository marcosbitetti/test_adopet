interface IOptions {
    page: number;
    limit: number;
    sort: Array<string>;
}

interface ISearch {
    sex_key?: string;
    size_key?: string;
    age_key?: string;
    specie: any;
    breed_primary: any;
    branch: any;
    _fields: Array<string>;
}

interface ISearchResult {
    count: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
    result: Array<any>;
}

class Options implements IOptions {
    public page: number;
    public limit: number;
    public sort: Array<string>;

    constructor( page: number = 1, limit: number = 5, sort: Array<string> = []) {
        this.page = page;
        this.limit = limit;
        this.sort = sort;
    }
}

class Search implements ISearch {
    
    public sex_key?: string;
    public size_key?: string;
    public age_key?: string;
    public specie: any;
    public breed_primary: any;
    public branch: any;
    public _fields: Array<string>;

    /**
     * @note: I switch age to Adult to propose adoptions of Adults
     */
    constructor( obj: any = null) {
        if (null!==obj) Object.assign( this,obj );
        this._fields = [
            'id',
            'uuid',
            'custom_code',
            'name',
            'specie_id',
            'breed_primary_id',
            'price',
            'created_date',
            'status_key',
            'branch_id',
            'payment_model_key',
            'sex_key', 
            'size_key',
            'age_key',
        ];
        this.specie = {
            with: {
                _fields: [ 'id', 'name'],
            }
        };
        this.breed_primary = {
            with: {
                _fields: [ 'id', 'name'],
            }
        };
        this.branch = {
            with: {
                uuid: 'ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff',
                _fields: [ 'id', 'name'],
            }
        };
    }

}


class SearchResult {
    public count: number = 0;
    public limit: number = 5;
    public offset: number = 0;
    public page: number = 0;
    public pages: number = 0;
    public result: Array<any> = [];

    constructor(obj:any) {
        Object.assign(this, obj);
    }
}

export {
    Search,
    SearchResult,
    Options,
};