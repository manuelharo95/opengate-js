'use strict';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to user resource into Opengate North API.
 */
export default class GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     * @param {string} source - Relative url where is located the resource.
     * @param {string} reponseJsonData - Relative url where is located the resource. Can be null
     * @param {string} error_not_found - String error which will be thrown on not_found error.
     */
    constructor(ogapi, source, entity, error_not_found) {
        this._api = ogapi.Napi;
        this._baseUrl = source;
        this._entity = entity;
        this._error_not_found = error_not_found;
        this._id = undefined;
        this._headers = undefined;
        this._urlParameters = undefined;
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._id;
    }

    _withId(_id) {
        this._id = _id;
        return this;
    }

    _getExtraHeaders() {
        return this._headers;
    }

    _setExtraHeaders(headers) {
        if (this._headers) {
            var keys = Object.keys(headers);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._headers[key] = headers[key];
            }
        } else {
            this._headers = headers;
        }
    }

    _getUrlParameters() {
        return this._urlParameters;
    }

    _setUrlParameters(parameters) {
        if (this.parameters) {
            var keys = Object.keys(parameters);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._urlParameters[key] = parameters[key];
            }
        } else {
            this._urlParameters = parameters;
        }
    }

    /**
     * @return {Promise}
     * @private
     */
    _execute() {
        let defered = q.defer();
        let promise = defered.promise;
        let _entity = this._entity;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((req) => {
                //console.log("STATUS_CODE: " + JSON.stringify(req));
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    // if (req.body.syncCache) {
                    //     defered.resolve({
                    //         data: req.body[_entity],
                    //         statusCode: req.statusCode,
                    //         syncCache: req.body.syncCache
                    //     });
                    // } else {
                    var data = req.body[_entity] && req.body.provision ? req.body : req.body[_entity];
                    defered.resolve({
                        data: data ? data : req.body,
                        statusCode: req.statusCode
                    });
                    // }
                }
            })
            .catch((error) => {
                // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                //console.log("ERROR: " + error.statusCode);
                if (error.statusCode === 400) {
                    error.statusCode = HttpStatus.NOT_FOUND;
                }

                defered.reject(error);
            });
        return promise;
    }

}