export function required(value){
    return !!value ? undefined : "Required field!!!";
}


export function maxLength (length) {
    return function (value) {
        return value.length <= length ? undefined :  `Max ${length} characters!!!`;
    }
}


export function minLength (length) {
    return function (value) {
        return value.length >= length ? undefined :  `Min ${length} characters!!!`;
    }
}


export function emailValidation(email) {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return undefined;
    }
    return "Enter a valid email";
};


// export function validation(dataObj) {
//     for (let key in dataObj) {
//         if (typeof dataObj[key] === "object" && !dataObj[key].valid)
//             return false;
//     }
//     return true;
// }