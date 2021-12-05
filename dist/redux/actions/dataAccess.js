import { SubmissionError } from 'redux-form';
const MIME_TYPE = 'application/json';
const LD_MIME_TYPE = 'application/ld+json';
const PATCH_MIME_TYPE = 'application/merge-patch+json';
export function fetch(id, options = {}, type = LD_MIME_TYPE) {
    const ENTRYPOINT = process.env.REACT_APP_API_ENDPOINT;
    if ('undefined' === typeof options.headers)
        options.headers = new Headers();
    if (null === options.headers.get('Accept'))
        options.headers.set('Accept', type);
    if (null === options.headers.get('Authorization') && localStorage.getItem('token'))
        options.headers.set('Authorization', "Bearer " + JSON.parse(localStorage.getItem('token')));
    if ('undefined' !== options.body &&
        !(options.body instanceof FormData) &&
        null === options.headers.get('Content-Type'))
        options.headers.set('Content-Type', (options.method === "PATCH") ? PATCH_MIME_TYPE : MIME_TYPE);
    return global.fetch(new URL(id, ENTRYPOINT), options).then(response => {
        if (response.ok)
            return response;
        return response.json().then(json => {
            const error = json['hydra:description'] ||
                json['hydra:title'] ||
                'An error occurred.';
            if (!json.violations)
                throw Error(json.detail);
            let errors = { _error: error };
            json.violations.forEach(violation => errors[violation.propertyPath]
                ? (errors[violation.propertyPath] +=
                    '\n' + errors[violation.propertyPath])
                : (errors[violation.propertyPath] = violation.message));
            throw new SubmissionError(errors);
        }, () => {
            throw new Error(response.statusText || 'An error occurred.');
        });
    });
}
export function ldfetch(id, options = {}) {
    const ENTRYPOINT = process.env.REACT_APP_API_ENDPOINT;
    if ('undefined' === typeof options.headers)
        options.headers = new Headers();
    if (null === options.headers.get('Accept'))
        options.headers.set('Accept', LD_MIME_TYPE);
    if (null === options.headers.get('Authorization') && localStorage.getItem('token'))
        options.headers.set('Authorization', "Bearer " + JSON.parse(localStorage.getItem('token')));
    if ('undefined' !== options.body &&
        !(options.body instanceof FormData) &&
        null === options.headers.get('Content-Type'))
        options.headers.set('Content-Type', (options.method === "PATCH") ? PATCH_MIME_TYPE : LD_MIME_TYPE);
    return global.fetch(new URL(id, ENTRYPOINT), options).then(response => {
        if (response.ok)
            return response;
        return response.json().then(json => {
            const error = json['hydra:description'] ||
                json['hydra:title'] ||
                'An error occurred.';
            if (!json.violations)
                throw Error(error);
            let errors = { _error: error };
            json.violations.forEach(violation => errors[violation.propertyPath]
                ? (errors[violation.propertyPath] +=
                    '\n' + errors[violation.propertyPath])
                : (errors[violation.propertyPath] = violation.message));
            throw new SubmissionError(errors);
        }, () => {
            throw new Error(response.statusText || 'An error occurred.');
        });
    });
}
