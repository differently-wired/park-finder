Setup Sign-in with Google
===

- Open the `app.json` file in your root directory and copy the `<slug>`.
- Go to `https://expo.dev/`, create an account, and create a project with the `<slug>` and record the `<id>`.
- In your local console, install EAS by running the following command if you had not do so. 
    ```
    $ npm install --global eas-cli
    ```

- Copy the `<id>` of your created expo project and run `eas init --id <id>` in you local machine, the `app.json` would got modified, record the `<slug>` and `<owner>` in the file.
- Go to `https://console.cloud.google.com/`, for every Firebase project that you created, there is a corresponding project in Google Cloud, you may reuse the project.
- Go to your project in Google Cloud, select menu > API & Services > Credentials, from there create a new credential for OAuth 2.0 client ID, choose the type `Web application`. 

- Fill in `https://auth.expo.io` for the JavaScript origins URI, and `https://auth.expo.io/@<owner>/<slug>` for the redirect URI, copy the `<Client ID>` when done.

- In you local repository, install the Expo's packages by running this command.
    ```
    $ npm install expo-auth-session expo-crypto expo-web-browser
    ```

- Paste the `<Client ID>` as `expoClientId` in the `./helpers/googleAuth.js` file.

- Sign in expo.dev in your local machine, and start the expo development server:
    ```
    $ npx exp login
    $ npm start
    ``` 