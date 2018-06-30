 

# Currency Converter 
A simple currency converter (progressive web application) built in accordance with the terms necessary for the completion of the Google Africa Challenge Scholarship #7DaysofCodeChallenge.

## For the code reviewer

### Fetching currencies list 
When the page load, the script display the currencies list which was cached in the indexedDB (in the first run), then try to fetch new version to update it.

### Convertion
for the conversion, the script try to fetch the exchange rate from the api, if it faild it will look for it in the `indexedDB` :
for example, if the user try to convert from `USD` to `EUR` , the script retrieve both rate for : `USD_EUR` and `EUR_USD` , and cache it in the database to use it when offline mode activated.
 

The files of interest are located below:

`Sw.js`

`js/Register.js`

`js/Converter.js`

`js/Toast.js`

## Demo

Application hosted on github pages : https://ycfx.github.io/currency_converter_acl/

