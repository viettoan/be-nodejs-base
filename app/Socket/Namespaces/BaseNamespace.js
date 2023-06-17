import {socketIOServer} from "../../../index.js";
class BaseNamespace {
    constructor(namespace) {
        this.namespace = namespace;
        this.namespaceIO = socketIOServer.of(this.namespace)
    }
}

export default BaseNamespace;