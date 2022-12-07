//requiered packages
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

//create de express server
const app = express();

//server port number
const PORT = process.env.PORT || 4000;

//set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//needed to parse html 
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


app.get("/", function (req, res) {
    res.render('index');
})




var cancionesLinks = []
var cancionesTitle = []
var cancionesImage = []

app.post("/convert-mp3", async (req, res) => {
    cancionesLinks = []
    cancionesTitle = []
    cancionesImage = []

    const id1 = req.body.videoId; //lo que estara en el buscador

    const fetchAPI = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&key=${process.env.API_KEY}&type=video&q=${id1}`, {
        "method": "GET"

    })

    const Res = await fetchAPI.json();
    console.log(Res);

    for (let i = 0; i < 12;) {

        cancionesTitle.push(Res["items"][i]["snippet"]["title"]);
        cancionesImage.push(Res["items"][i]["snippet"]["thumbnails"]["medium"]["url"]);
        cancionesLinks.push(Res["items"][i]["id"]["videoId"]);
        i++
    }


    console.log(cancionesTitle);
    console.log(cancionesLinks);







    return res.render("index", {
        comprobar: true,
        success: true,
        song_id1: 0, song_title1: cancionesTitle[0], song_image1: cancionesImage[0],
        song_id2: 1, song_title2: cancionesTitle[1], song_image2: cancionesImage[1],
        song_id3: 2, song_title3: cancionesTitle[2], song_image3: cancionesImage[2],
        song_id4: 3, song_title4: cancionesTitle[3], song_image4: cancionesImage[3],
        song_id5: 4, song_title5: cancionesTitle[4], song_image5: cancionesImage[4],
        song_id6: 5, song_title6: cancionesTitle[5], song_image6: cancionesImage[5],
        song_id7: 6, song_title7: cancionesTitle[6], song_image7: cancionesImage[6],
        song_id8: 7, song_title8: cancionesTitle[7], song_image8: cancionesImage[7],
        song_id9: 8, song_title9: cancionesTitle[8], song_image9: cancionesImage[8],
        song_id10: 9, song_title10: cancionesTitle[9], song_image10: cancionesImage[9],
        song_id11: 10, song_title11: cancionesTitle[10], song_image11: cancionesImage[10],
        song_id12: 11, song_title12: cancionesTitle[11], song_image12: cancionesImage[11]

    })



})
app.post("/descargar", async (req, res) => {
    const id = req.body.codSong; //lo que estara en el buscador

    console.log(cancionesLinks[id]);
    const fetchAPI1 = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${cancionesLinks[id]}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.API_KEY2,
            "x-rapidapi-host": process.env.API_HOST2
        }

    });
    const fetchResponse1 = await fetchAPI1.json();
    const enlaceDescarga = fetchResponse1["link"]

    if (fetchResponse1.status === 'ok')
        return res.redirect(`${enlaceDescarga}`)


})

app.get("/convert-mp3", function (req, res) {
    res.render('index');
})
//start the server
app.listen(PORT, () => {
    console.log(`Server starded on port ${PORT}`);
})




