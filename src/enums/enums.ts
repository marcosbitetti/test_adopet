
enum ESexKey { MALE, FEMALE };
enum ESizeKey { S, M, L, XL };
enum EAgeKey { BABY, YOUNG, ADULT, SENIOR };

const ESexKeyNames = new Map<number,string>([
    [ ESexKey.MALE, 'Male' ],
    [ ESexKey.FEMALE, 'Female' ]
]);

const ESizeKeyNames = new Map<number,string>([
    [ ESizeKey.S, 'Small' ],
    [ ESizeKey.M, 'Medium' ],
    [ ESizeKey.L, 'Large' ],
    [ ESizeKey.XL, 'Giant' ],
]);

const EAgeKeyNames = new Map<number,string>([
    [ EAgeKey.BABY, 'Baby' ],
    [ EAgeKey.YOUNG, 'Young' ],
    [ EAgeKey.ADULT, 'Adult' ],
    [ EAgeKey.SENIOR, 'Senior' ],
]);


export {
    ESexKeyNames,
    ESizeKeyNames,
    EAgeKeyNames,

    ESexKey,
    ESizeKey,
    EAgeKey,
}