import BaseNamespace from "../BaseNamespace.js";

class AdminNamespace extends BaseNamespace
{
    constructor() {
        super('/admin');
    }

    handle() {
        console.log('admin namespace')
    }

    createNewUser() {

    }
}

export default AdminNamespace;