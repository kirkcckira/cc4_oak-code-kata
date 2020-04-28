const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb+srv://kirk:22031379@cluster0-eakxy.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// set view engine to ejs
app.set("views", "./views");
app.set("view engine", "ejs");

// set director path

app.use(express.static(__dirname + "/public"));

// creating Schema

const articleSchema = new Schema({
  articleName: String,
  topic: [String],
  description: String,
  image: String,
});

// creating new model

const Article = mongoose.model("Article", articleSchema);

// reset the database

Article.collection.drop();

// populate the database with dummy data

const dummy = [
  {
    articleName:
      "OVER 70 PERCENT OF VOTERS SUPPORT MAKING 2020 PRESIDENTIAL ELECTION ENTIRELY VOTE-BY-MAIL, NEW POLL SHOWS",
    topic: ["Politic"],
    description: `A new poll shows that nearly three-quarters of voters support transitioning the 2020 presidential election entirely to mail-in ballots, despite significant criticism from President Donald Trump and other Republicans.

        The survey conducted by Harvard and Harris Insights and Analytics found that 72 percent of respondents backed conducting the presidential election entirely by mail, while just 28 percent opposed the idea. The poll was carried out from April 14 to 16 and queried 2,394 respondents.
        
        Amid the ongoing coronavirus pandemic, there have been calls to prepare for the November election by expanding the ability of Americans to vote-by-mail nationwide. But Trump and some other Republicans have strongly opposed such measures.`,
    image:
      "https://d.newsweek.com/en/full/1582805/wisconsin-election.webp?w=790&f=bee26e473fb9407b4518f814380306fe",
  },
  {
    articleName:
      "STOKING UNREST AND DISTRIBUTING GROCERIES: ITALY'S MAFIAS GAIN GROUND IN FIGHT FOR LOYALTY DURING PANDEMIC LOCKDOWN",
    topic: ["Corona Virus", "World", "Crime"],
    description: `Across the country, Italians sang "Andrà Tutto Bene" ("everything will be alright") from their balconies. A billboard in Naples read: "Together, Without Fear. Coronavirus is a weak enemy if we fight it together." The country came together each night as the death toll was broadcast at 6 p.m. A stimulus package was introduced, and a solidarity fund was advanced to all municipalities. Italy, which has suffered the highest death toll in the European outbreak of the novel coronavirus, then saw a break in reported cases in late March. It had flattened the curve as its healthcare systems flexed under the influx of COVID-19 patients, as its military buried the dead, and as its citizens strained under lockdown, waiting for the end.`,
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB12PBrs.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f",
  },
  {
    articleName:
      "ANTIBODY STUDY SHOWS COVID-19 RATE OF INFECTION MAY BE UP TO 85 TIMES HIGHER THAN REPORTED",
    topic: ["Tech&Science", "Healthcare", "Corona Virus"],
    description: `A study in a county in California suggests that the prevalence of people infected with the coronavirus is much higher than previously thought, potentially complicating decisions on whether to end widespread lockdowns.

        Blood from 3,300 volunteers living in Santa Clara was extracted from a finger prick and analyzed at the start of April. The Stanford University study, which has not been peer reviewed yet and was posted on medRxiv, found that between 2.5 percent of 4.5 percent of people tested positive for antibodies.
        
        Extrapolated over the county's population of two million, the data predicts that between 48,000 and 82,000 people could have been infected with the virus at that time. The upper estimate is more than 80 times higher than the official case count of 1,000.`,
    image:
      "https://d.newsweek.com/en/full/1582738/antibody-testing.webp?w=790&f=64163939644fef286a383b58dc8ca30b",
  },
];

dummy.forEach((item) => {
  let articleFill = {
    articleName: item.articleName,
    topic: item.topic,
    description: item.description,
    image: item.image,
  };
  let newArticle = new Article(articleFill);
  newArticle.save((err) => {
    if (err) throw err;
  });
});

app.get("/", (req, res) => {
  let allArticle;
  Article.find({}, (err, data) => {
    allArticle = data;
    res.render("pages/index", { item: allArticle });
  });
});

app.get("/article/:id", (req, res) => {
  let articleId = req.params.id;
  Article.findById(articleId, (err, data) => {
    res.render("pages/article", { item: data });
  });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
