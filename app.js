const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  const restaurant = restaurantList.results.filter((restaurant) => restaurant.name.toLocaleUpperCase().includes(keyword.trim().toLocaleUpperCase()))

  const category = restaurantList.results.filter((restaurant) => restaurant.category.toLocaleUpperCase().includes(keyword.trim().toLocaleUpperCase()))

  const restaurantOrCategory = restaurant.length ? restaurant : category

  if (!restaurantOrCategory.length) {
    return res.render('index', { keyword: `無法找到您輸入的關鍵字: ${keyword} ，請輸入餐廳、分類！` })
  }

  res.render('index', { restaurants: restaurantOrCategory, keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
