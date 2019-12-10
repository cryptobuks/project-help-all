# Project-Help-All  - WIP

An anonymous peer 2 peer donation platform where NGOs and patrons could request basic goods to be dropped-off at specific locations.
Authentication codes will be distributed to NGOs and vetted patrons.
People looking to help the less fortunate can use the app to find donation request.


Donation Categories:
- Food
- Medicine
- Hygiene goods
- Clothes

Details:
- Arabic support.
- User Location will not be saved anywhere.
- No registration required for donors.
- Minimal on-boarding needed for patrons/ NGOs.
- Google/Apple maps integration.
- Uber integration.


Project was initially discussed in this reddit [thread](https://www.reddit.com/r/lebanon/comments/dtdyuc/a_0_profit_application_to_help_the_less_fortunate/)

## Installation

Use the package manager [yarn](https://yarnpkg.com/lang/en/) to install modules.


```bash
yarn install
cd ios && pod install
```

## Run metro bundler

```bash
yarn start

```
### Run ios simulator

```bash
yarn run ios
```
### Run android simulator

```bash
yarn run android
```

## User Storyboard

![](user.gif)

## Admin Storyboard

![](admin.gif)

## Contributing
Pull requests are encouraged.
Message me for the server side code.
For major BI changes, please open an issue first to discuss what you would like to change.

## Considerations

You might want to get rid of redux and manage state with useState Hook instead.

You might want to move to typescript.

In any case Forks are welcome.



## License
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/legalcode)
