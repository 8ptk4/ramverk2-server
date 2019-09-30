CREATE TABLE
IF NOT EXISTS users
(
    username VARCHAR
(255) NOT NULL,
    email VARCHAR
(60) NOT NULL,
    password VARCHAR
(255) NOT NULL,
    birthdate VARCHAR
(255) NOT NULL,

    UNIQUE
(username)
);

CREATE TABLE
IF NOT EXISTS pages
(
    title VARCHAR
(25) NOT NULL,
    content VARCHAR
(1000) NOT NULL,

    UNIQUE
(title)
);

INSERT INTO pages
    (title, content)
VALUES
    ("about", "Det är jag som är Patrik Karlsson, en 33 årig kille från Flen i Södermanland. Var väldigt idrottintresserad som yngre, utövade både innebandy,
fotboll och bordtennis. Slutade dock med lagsporter och satsade allt på bordtennisen. Uppnådde väl inga större prestationer men lyckades bli en utbildad steg 
ett tränare och fick således träna en ungdomsgrupp ett par dagar i veckan. 

Efter gymnasiet fick jag jobb på Rätt Pris, en matvaruaffär. Åren gick och jag fick syn på en jobbannons. 
Det stod att ett nytt företag vid namn Lager 157 skulle etablera sig i Hälleforsnäs. Hälleforsnäs ligger ungefär 
två mil ifrån Flen så självklart lämnade jag in mitt cv. Några dagar senare ringde det och jag fick komma på en intervju,
minns att jag var så taggad. Det slutade i varje fall med att jag åkte på intervjun och ett kraftigt handslag senare 
blev jag anställd. Jag flyttade hemifrån och bosatte mig i en lägenhet på 37 kvm i Hälleforsnäs. Hälleforsnäs är ju inte 
jättestort, det finns en konsum butik och en pizzera, vad mer kan man begära. Här fastnade jag i ungefär 9 år som 
klädförsäljare på Lager 157. 

När jag inte jobbade satt jag mycket framför datorn, dock gick mycket tid åt till spelande,
men förutom det växte mitt intresse för webbdesign.Jag har sen gymnasiet alltid pysslat med hemsidor i olika former,
men aldrig satt mig in i det på riktigt.Tankarna snurrade och någonstans kände jag att det är var dags att byta bransch 
då jag inte riktigt såg mig vilja jobba inom handels i resten utav mitt liv.Och här befinner jag mig nu studerande 
webbprogrammering på Blekinge Tekniska Högskola.");

INSERT INTO pages
    (title, content)
VALUES
    ("kmom01", "# Me-Application
#####  Description
Me-application based on React.js for JsRamverk course - dbwebb

#####   Installation
1. clone repository from github 
>  git clone git@github.com:8ptk4/ramverk2.git  
2. cd me-app && npm install

3. npm start
> Runs the app in the development mode.
> Openhttp://localhost:3000 to view it in the browser.
> The page will reload if you make edits.
> You will also see any lint errors in the console.");

INSERT INTO pages
    (title, content)
VALUES
    ("kmom02", "![Inspiration date picker](https://cdn.dribbble.com/users/2297683/screenshots/5928095/daily_ui_080.png)
After looking for inspirations for date pickers on dribble, I found one that got my interest. I managed to make my own date  picker almost like the one from dribble but
with some differences in design. 

For a starter I used onClick on my arrows but it turned out not to be so good, actually really bad consider UX optimization. The main reason it’s not that good is because clicking yourself to example 1960 will take a long time. Because of that I implemented onMouseDown so you instead can hold the mouse button to navigate the years faster. I would say that my datepicker might not be the best for the web but it would probably work out well for mobiles
with some sort of swipe functionality.

For the form fields I got inspiration from a youtube [video](https://www.youtube.com/watch?v=jrFMOrRrcvo&t=). I kept the fields simple and made nice clear labels and didn’t
use any placeholders. Each field validates with my own set of validations and you can’t submit the for if there are any validation errors.

[https://github.com/8ptk4/ramverk2](https://github.com/8ptk4/ramverk2)");

INSERT INTO pages
    (title, content)
VALUES
    ("kmom03",
        "No content currently for this kmom...");

INSERT INTO pages
    (title, content)
VALUES
    ("kmom04",
        "Describe 3 simple use-cases...");