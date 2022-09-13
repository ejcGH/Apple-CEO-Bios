const db = require("./db.js");
const port = 4000;


const express = require("express")
const app = express();
app.use(express.static('public'));


const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


app.get("/", (req, res) => {
    // res.send("This is the home page")
    //include a link to the /ceos page from here
    res.render("home", {
        locals: {
            title: "Ceo Welcome Page"
        }
    })
})

app.get("/ceos", (req, res) => {
    //return list of Apple cos from db.js file 
    res.render("ceo-list", {
        locals: {
            title: "Ceo List",
            ceos: db,
            path: req.path
        }
    })

})

app.get("/ceos/:slug", (req, res) => {
    //individual CEO route , /ceos/:slug
    //create req.params for each :slug
    const {slug} = req.params;
    const ceo = db.find(c => c.slug === slug);
    if (ceo) {
        res.render("ceo-details", {
            locals: {
                title: `${ceo.name}'s info`,
                ceo,
            },
        });

    } else {
        res.status(404).send(`No Ceo with ${slug}`)
    }
})

 // const {slug} = req.params;
    // let name =[];
    // let year = [];
    // const ceo = db.forEach(c => {
    //     if(c.slug === slug){
    //         name += ceo.name
    //         year += ceo.year      
    //     } else {
    //         res.status(404).send(`No Ceo with ${slug}`)
    //     } 
    //     res.render('ceo-details', {name, year})
    // })});

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`)
});