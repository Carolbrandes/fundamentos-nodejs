export function extractQueryParams(query) {
    // chamada http://localhost:3333/users?search=Diego&page=2
    // ex: quando fazemos query.substr(1).split('&') sera retornado ['search=Diego', 'page=2']
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=') // ['search', '2']

        queryParams[key] = value

        return queryParams
    }, {})
}