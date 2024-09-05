export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g // aqui busca o nome do campo q esta sendo enviado

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') // esse $1 pega o que primeiro retorno de routeParametersRegex e nomeia o grupo da regex.

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}