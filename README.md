# Phone Notifications

Your own tiny api server hosted on Heroku, which will send notifications to your Phone Device whenever you post to it's endpoint.

## Set Up

1. To get started you'll need a [Heroku account](https://heroku.com/) & [PushBullet account](https://www.pushbullet.com/).
1. Download PushBullet app to your phone device.
1. Create Heroku app
1. In your Heroku apps settings under `Config Vars` create 2 variables:

- KEY: PUSHBULLET_ACCESS_TOKEN
- VALUE: [Access Token generated through PushBullets Dashboard](https://www.pushbullet.com/#settings)

2 (optinal):

- KEY: SECRET_TOKEN
- VALUE: `your_secret_string`

5. Host this repo on Heroku (1 way is to clone this repo and connect it with GitHub onto Heroku)`

## Usage

Once your app is set up, heroku will give you a domain link (under `Domains` in your apps settings tab)

For this example lets say that domain link is: `https://example.herokuapp.com/`

Now to recieve a notification on your phone you can send a post request to this domain, in my example I'll use `axios`:

```js
await axios
	.post('https://example.herokuapp.com/api/message', {
		title: 'notification', // title
		message: 'hey its working!', // main message
		secret: 'secret', // or your `SECRET_TOKEN` value you entered in Herokus `Config Vars`
	})
	.then(({ data }) => {
		console.log(data)
	})
	.catch(console.error)

// response: { status: true } // notification recieved!
// response: { status: false } // notification failed (check your heroku apps logs)
```

Now you can do a simple post request inside any app/project and instatly recieve a notification.
