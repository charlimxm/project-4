require('dotenv').config({silent: true})

const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-4'
const port = process.env.PORT || 3000

// installing all modules
const bodyParser = require('body-parser') // for accessing POST request
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // for accessing PUT / DELETE
const mongoose = require('mongoose') // for DB
const path = require('path') // for Public files
const passport = require('./config/ppConfig') // to register passport strategies
const session = require('express-session') // to create session and cookies
const MongoStore = require('connect-mongo')(session) // to store session into db
// initiating express
const app = express()

//socket.io
// supply express to http server express
const http = require("http").Server(app) //what is this?
 // listening on http
const io = require("socket.io")(http)

// require all model files
const User = require('./models/user')
const Booking = require('./models/booking')
const Chat = require('./models/chat')

// require all my route files
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const profile_routes = require('./routes/profile_routes')
// const pending_routes = require('./routes/pending_routes')
const chat_routes = require('./routes/chat_routes')

// const chat_routes = require('./routes/chat_routes')

const dashboard_routes = require('./routes/dashboard_routes')

// initiating express
// const app = express()


// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})


app.get('/recommendation', (req, res) => {
  res.render('recommendation')
})


app.get('/', (req, res) => {
  res.render('home')
})
app.use('/register', register_routes)
app.use('/profile', profile_routes)
app.use('/login', login_routes)
app.use('/dashboard', dashboard_routes)

app.post('/search', (req, res) => {
  const keyword = req.body.keyword
  const regex = new RegExp(`${keyword}`, 'i')
  console.log(keyword)
  console.log('fetched')

  User.find({
    "languages.lang": regex
  })
  .sort({ "languages.kyu": 1 })
  .then(data => res.send(data))
  .catch(err => console.log('err')) // in case we have an error
})


// app.use('/pending', pending_routes)
app.use('/chat', chat_routes)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/chat', chat_routes)
// Socket Connection Routes

io.on('connection', function(socket){
  // console.log('a user connected')


    socket.on('broadcast chat', (msg) => {
      io.emit("chat message", msg)
    })
});

http.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
