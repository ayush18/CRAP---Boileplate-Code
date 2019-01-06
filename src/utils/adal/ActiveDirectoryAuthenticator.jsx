export default class ActiveDirectoryAuthenticator {
    adalConfig;
    context;

    constructor(adalConfigProvider) {
        var AuthContext = require("adal-angular");
        window.authenticationContext = AuthContext;
        const adalConfig = adalConfigProvider.getAdalConfig;

        this.context = new AuthContext(adalConfig);
        this.adalConfig = adalConfig;
        window.authenticator = this;
    }

    login() {
        this.context.login();
    }

    logout() {
        this.context.logOut();
    }

    handleCallback() {
        this.context.handleWindowCallback();
    }

    get getActiveDirectoryApplicationId() {
        return this.adalConfig.clientId;
    }

    get userInfo() {
        return this.context.getCachedUser();
    }

    get accessToken() {
        return this.context.getCachedToken(this.adalConfig.clientId);
    }

    get isAuthenticated() {
        return this.accessToken && this.userInfo;
    }
}