# win-auth-demo-app
Demo app for windows authentication testing. Used for the session "E2E testing goes corporate", presented at NDC Oslo 2020. [Slides](https://bit.ly/3dYzYrK)

## Brief usage guide

Decide if you want to use hostnames or not. Without hostnames, you can run the demo app and api from Visual Studio. With hostnames, you need to deploy to IIS. If you want to experiment with https, you need to pick the "with hostnames" path, generate the certs for the sites and make sure Node.js is configured to accept the CA cert for those certs (see the slides on how this is done).

## Without hostnames

1. Open WinAuthDemoApp in Visual Studio and start it (Debug mode works). Note the URL used.
2. Open WinAuthDemoApi in Visual Studio and start it (Debug mode works). Note the URL used.
3. Continue in the config section below

## With hostnames

1. Create certificates for the hostnames you have decided to use
2. Create websites for WinAuthDemoApp and WinAuthDemoApi in IIS
3. Setup https bindings for these websites with the created certificates
4. Unless you have added them to your DNS, edit the hosts file on your machine (`c:\Windows\System32\drivers\etc\hosts`  on Windows) and add a line for each hostname, mapping them to the IP of your IIS machine.
5. Export the CA cert for the created certificates in Base64 X.509 format, store it in the e2e folder.
6. Continue in the config section below

## Config

1. Edit the appsettings.json in WinAuthDemoApp and set "Resources/Intranet" to the URL to WinAuthDemoApi
2. Edit the appsettings.json in WinAuthDemoApi and set "WinAuthDemoAppHost" to the hostname of WinAuthDemoApp (this is for CORS settings)
3. Edit the cypress.json file in e2e and set baseUrl to the URL to WinAuthDemoApp
4. Update the spec files in e2e, replace the URLs in the cy.ntlm and cy.ntlmSso calls to match the URLs of WinAuthDemoApp and WinAuthDemoApi.
5. Rename the file cypress.env.template.json to cypress.env.json in e2e. Update that file with the user account you want to authenticate with. 
6. The package.json in the e2e folder is configured for Windows. To adapt it to another OS, please see the [cypress-ntlm-auth readme](https://github.com/bjowes/cypress-ntlm-auth)

## Install cypress

1. In the e2e folder, run `npm install`

## Execution

1. In the e2e folder, run `npm run cypress-ntlm`. If you are trying to use https, you can add a CA cert to for Node.js to trust in the e2e folder and update the package.json script "demo" to use it.


