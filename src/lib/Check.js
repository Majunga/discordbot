const isNullOrWhitespace = (value) => {
    if(value === null  || value === undefined){
        return true
    }
    
    if(typeof value !== "string") throw Error(`value is not a type of string ${value}`)

    return value.replace(/\s/g, '').length < 1;
}

const isDefined = (value) => {
    return value !== undefined && value !== null
}

const checkIsDefined = (value, message) => {
    if(isDefined(value) === false) {
        if(isNullOrWhitespace(message)){
            message = "value is not defined"
        }

        throw Error(message)
    }

    return value
}


export {
    isNullOrWhitespace,
    isDefined,
    checkIsDefined
}