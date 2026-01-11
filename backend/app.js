dotenv.config()


// importing packages
import express from "express"
import nanoid from "nano-id"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'
import passport from './src/config/passport.js'

// file importing 
import auth from "./src/routes/auth.routes.js"
import conectToDB from "./src/config/db.js"
import short_url from "./src/routes/shortUrl.routes.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js"
import { attachUser } from "./src/utils/attachUser.js"


const app = express()



// Middlewears
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
// Allow CORS from frontend for cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(attachUser)


// api
app.use("/auth", auth)
app.use("/api", short_url)
app.get("/:id", redirectFromShortUrl)

import { errorHandler } from "./src/utils/Error.handling.js"
app.use(errorHandler)

// Serever starting
app.listen(3000, () => {
    conectToDB()
    console.log("port running on http://localhost:3000")
})



