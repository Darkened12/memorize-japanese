# Hiragana/Katakana Memorization

I'm learning Japanese and I couldn't find a free app that fits my needs while also being ad-free. So I've made this one, you may use it on its live version [here](https://memorize-japanese.fly.dev/) or download the Android app on [releases](https://github.com/Darkened12/memorize-japanese/releases).

## How to install and run it

After cloning the repo, install [Node.js](https://nodejs.org/en) and the [Angular CLI](https://github.com/angular/angular-cli). On the app's root folder, run `npm install` and `npm audit fix`. 
To run it locally on your browser, run the command `ng serve --open`.

## How to build the Android app

You will need to install [Android Studio](https://developer.android.com/studio). On the app's root folder, run `ng build --configuration production` and `npx cap sync`.
Run `npx cap open android` and the project will be opened on Android Studio, ready to be built.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
