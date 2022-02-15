const express = require('express')
const app = express()
const port = 80

app.use(express.json())

const PushBullet = require('pushbullet')
const sender = new PushBullet(process.env.PUSHBULLET_ACCESS_TOKEN || '')

const getDevices = () => {
	return new Promise((resolve, reject) => {
		sender.devices((err, data) => {
			if (err || !data) reject(err ? err : 'Empty Data')
			else resolve(data)
		})
	})
}

const sendMessage = (iden, title, message) => {
	return new Promise((resolve, reject) => {
		sender.note(iden, title, message, (err, data) => {
			if (err || !data) reject(err ? err : 'Empty Data')
			else resolve(data)
		})
	})
}

app.post('/api/message', async (req, res) => {
	const { title, message, secret } = req.body || {}

	try {
		if (secret !== 'secret') throw 'Not verified.'
		const devices = await getDevices()
			.then((data) => data.devices)
			.catch(() => {
				throw 'Failed to get devices.'
			})

		await Promise.all(
			devices.map(async ({ iden }) => {
				await sendMessage(iden, title, message)
					.then(() => true)
					.catch(() => {
						throw 'Failed to send message.'
					})
			}),
		)

		return res.status(200).json({ status: true })
	} catch (error) {
		console.log(error)
		return res.status(200).json({ status: false })
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`)
})
