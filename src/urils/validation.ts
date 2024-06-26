

// Validates the email
// converts it to lowercase
// returns null of no match else returns the match
export const validateEmail = (email: string) => {
    return regex['email'].test(String(email).toLocaleLowerCase());
};


/**
 * Validates password
 * Is at least 8 characters long and no more than 15 characters long.
 * Contains at least one lowercase letter ([a-z]).
 * Contains at least one uppercase letter ([A-Z]).
 * Contains at least one digit (\\d).
 * Contains at least one special character from the set [@$!%*?&].
 * @param password the password value
 * @returns boolean true if the validation meets or false if does not
 */
export const validatePassword = (password: string) => {
    return regex['password'].test(String(password).toLocaleLowerCase());
};
    


const regex = {
    'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'name': /^[A-Za-z]*$/,
    'phone': /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    'number': /[0-9]/,
    'text': /^(\w)*$/,
    'fullName': /^(\w)*$/,
    'street': /^\s*\S+(?:\s+\S+){2}/,
    '': /.*/,
    'password': /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
}


/**
 * 
 * @param type This is the type of 
 * @param data 
 * @returns 
 */
export const validateFields = (type: any, data: string | File, label: string) : boolean | string=>{

    let msg:string | boolean = '';
    Object.entries(regex).forEach(([key, value]) => {
        
        if(key == type){
            if(data){
                var reg = value.test(String(data).toLocaleLowerCase());
                
                if(!reg){
                    msg = `Invalid ${label}`;
                    if(type == 'password') {
                        msg = `Passwort should contain at least 1 
                        Number [0-9], 
                        Uppercase [A-Z], 
                        Lowercase [a-z], 
                        Special character [@$!%*#?&]`;
                    }
                } else {msg = true;}
            }else msg = 'This field is required'
        }
        
    });
    return msg;
}