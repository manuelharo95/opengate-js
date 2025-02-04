module.exports = {
    /* fields validations */
    _checkType: function(type, TYPE_ENUM) {
        let not_found = [];
        let found = TYPE_ENUM.find(function(type) {
            return type == this;
        }, type);

        if (typeof found === "undefined") {
            not_found.push(type);
        }
        if (not_found.length !== 0) {
            throw new Error({ message: "OGAPI_NOT_ALLOWED_PARAMETER", parameter: JSON.stringify(not_found), allowed: JSON.stringify(TYPE_ENUM) });
        }
        return type;
    },

    _checkString: function(parameter, length, name) {
        if (typeof parameter !== 'string' || parameter.length > length) {
            throw new Error([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_MAX_LENGTH', parameter: length }]);
        }
    },

    _checkNumber: function(parameter, name) {
        if (typeof parameter !== 'number') {
            throw new Error([{ message: 'OGAPI_NUMBER_PARAMETER', parameter: name }]);
        }
    },
    _checkArray: function(parameter, name) {
        if (!Array.isArray(parameter) || parameter.length === 0) {
            throw new Error({ message: 'OGAPI_ARRAY_PARAMETER', parameter: name });
        }
    }

}