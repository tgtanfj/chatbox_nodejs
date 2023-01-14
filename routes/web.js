import express from 'express'
import HomeController from '../src/controllers/HomeController'

let router = express.Router()

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage)

    //setup get started button, whitelisted domain
    router.post('/setup-profile', HomeController.setUpProfile)
    router.post('/setup-persistent-menu', HomeController.setUpPersistentMenu)

    //setup persistent menu
    router.post('/webhook', HomeController.postWebhook)
    router.get('/webhook', HomeController.getWebhook)
    return app.use('/', router)
}

module.exports = initWebRoutes