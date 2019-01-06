// import IAdalConfig from "./AdalConfig";

export default class AdalConfigProvider {
    get getAdalConfig() {
        return {
            tenant: "TENANT", //placeholder for Tenant
            clientId: "CLIENT_ID", //placeholder for Client Id
            redirectUri: window.location.origin + "/#/",
            postLogoutRedirectUri: window.location.origin + "/#/",
            additionalQueryParameter: "nux=1"
        };
    }
}