const isDomElement = el => {
    return el instanceof Element || el instanceof HTMLDocument
}

export {
    isDomElement
}