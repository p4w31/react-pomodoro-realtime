const dbMocks = {
    getUser: function() {
        return ({
            "uid":"user123456789",
            "displayName":null,
            "photoURL":null,
            "email":"mail@mail.com",
            "emailVerified":true,
            "phoneNumber":null,
            "isAnonymous":false,
            "lastLoginAt":"1549641932857",
            "createdAt":"1538408639000"
        });
    }
};

export default dbMocks;