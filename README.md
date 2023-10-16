# React + TypeScript + Vite

Disclaimer: the following project is a part of a certain company's Front-End developer recruiting task

"You need to create a responsive app where users can personalize their pizza orders, with React
and Firebase. Login/Registration through Email, Facebook, and Google.
Users should be able to select a quantity of configured pizzas and enter the coupon for a
discount.
Prices should be calculated based on user selections and it is up to you to choose prices for
different toppings and pizza sizes.
Toppings, pizza sizes, and prices should be ideally fetched from firebase.

**Application flow**
When a user comes to the app, he should be prompted with a login or registration page.
If a user registers or logs in (with e-mail or Facebook, use Firebase Auth for this), a user should
be redirected to the Pizza configurator screen (home screen), and now his orders should be
saved to the Firestore database.
Let Firebase generate document id-s automatically, and take the userId generated by the
authentication provider.
After an order is completed allow users to make another order."

Additional information / notes about how the app differences from the instructions above:
- Redux was used as a state management tool
- Instead of Firebase automatically assinging ids for users, it was done with uuidv4
- Added additional handling messages and styling to better fit the app
