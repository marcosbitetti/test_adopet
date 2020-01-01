
interface IOptions {
    page: number;
    limit: number;
    sort: Array<string>;
}

interface ISearch {
    sex_key: string;
    specie: any;
    breed_primary: any;
    branch: any;
    _fields: Array<string>;
}


enum ESexKey { MALE, FEMALE };
enum ESizeKey { S, M, L, XL };
enum EAgeKey { BABY, YOUNG, ADULT, SENIOR };


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
    
    public sex_key: string;
    public specie: any;
    public breed_primary: any;
    public branch: any;
    public _fields: Array<string>;
    public options: Options;

    constructor( ) {
        this.sex_key = ESexKey[ESexKey.FEMALE];
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
        this.options = new Options();
    }

}

export {
    Search,
    Options,

    ESexKey,
    ESizeKey,
    EAgeKey,
};