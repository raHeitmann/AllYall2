$(document).ready(function() {

    var foodArray = [];
    var drinksArray = [];
    var eventsArray = [];

    $(".drinks-section").hide();
    $(".events-section").hide();

    $("#drinks-question").on("click", function() {
        $(".drinks-section").show();
        $(".food-section").hide();
        $(".events-section").hide();
        $(".section-title").html("<h2> Select the type of drinks(s) you are thirsty for: </h2> <p style='font-size: 16px;''>Select up to two (2) drinks only.</p>");
    });

    $("#events-question").on("click", function() {
        $(".events-section").show();
        $(".food-section").hide();
        $(".drinks-section").hide();
        $(".section-title").html("<h2> Select the type of event(s) you are interested in: </h2>");
    });

    $("#food-question").on("click", function() {
        $(".food-section").show();
        $(".events-section").hide();
        $(".drinks-section").hide();
        $(".section-title").html("<h2> Select the type of food(s) you are craving: </h2>");
    });

    function food() {
        $(".food").on("click", function() {
            if ($(this).attr("data-state") == "unclicked") {
                var selection = $(this).attr("data-name").toUpperCase();
                foodArray.push(selection.toUpperCase());
                if ($(this).attr("data-type") != "caption") {
                    $(this).addClass("clicked");
                    $("#caption" + $(this).attr("data-name")).attr("data-state", "clicked");
                } else if ($(this).attr("data-type") == "caption") {
                    $("#" + $(this).attr("data-name")).addClass("clicked");
                    $("#" + $(this).attr("data-name")).attr("data-state", "clicked");
                }
                $(this).attr("data-state", "clicked");
            } else if ($(this).attr("data-state") == "clicked") {
                var selection = $(this).attr("data-name").toUpperCase();
                var index = foodArray.indexOf(selection);
                foodArray.splice(index, 1);

                if ($(this).attr("data-type") != "caption") {
                    $(this).removeClass("clicked");
                    $("#caption" + $(this).attr("data-name")).attr("data-state", "unclicked");
                } else if ($(this).attr("data-type") == "caption") {
                    $("#" + $(this).attr("data-name")).removeClass("clicked");
                    $("#" + $(this).attr("data-name")).attr("data-state", "unclicked");
                }
                $(this).attr("data-state", "unclicked");
            }
            console.log(foodArray);
        });
    }

    function drinks() {
        $(".drinks").on("click", function() {
            if ($(this).attr("data-state") == "unclicked") {
                if (drinksArray.length < 2) {
                    var selection = $(this).attr("data-name").toUpperCase();
                    drinksArray.push(selection.toUpperCase());

                    if ($(this).attr("data-type") != "caption") {
                        $(this).addClass("clicked");
                        $("#caption" + $(this).attr("id")).attr("data-state", "clicked");
                    } else if ($(this).attr("data-type") == "caption") {
                        $("#" + $(this).attr("data-id")).addClass("clicked");
                        $("#" + $(this).attr("data-id")).attr("data-state", "clicked");
                    }
                    $(this).attr("data-state", "clicked");
                }
            } else if ($(this).attr("data-state") == "clicked") {
                var selection = $(this).attr("data-name").toUpperCase();
                var index = drinksArray.indexOf(selection);
                drinksArray.splice(index, 1);

                if ($(this).attr("data-type") != "caption") {
                    $(this).removeClass("clicked");
                    $("#caption" + $(this).attr("id")).attr("data-state", "unclicked");
                } else if ($(this).attr("data-type") == "caption") {
                    $("#" + $(this).attr("data-id")).removeClass("clicked");
                    $("#" + $(this).attr("data-id")).attr("data-state", "unclicked");
                }
                $(this).attr("data-state", "unclicked");
            }
            console.log(drinksArray);
        });
    }

    function events() {
        $(".events").on("click", function() {

            if ($(this).attr("data-state") == "unclicked") {
                var selection = $(this).attr("data-name");
                eventsArray.push(selection);

                if ($(this).attr("data-type") != "caption") {
                    $(this).addClass("clicked");
                    $("#caption" + $(this).attr("data-name")).attr("data-state", "clicked");
                } else if ($(this).attr("data-type") == "caption") {
                    $("#" + $(this).attr("data-name")).addClass("clicked");
                    $("#" + $(this).attr("data-name")).attr("data-state", "clicked");
                }
                $(this).attr("data-state", "clicked");
            } else if ($(this).attr("data-state") == "clicked") {
                var selection = $(this).attr("data-name");
                var index = eventsArray.indexOf(selection);
                eventsArray.splice(index, 1);

                if ($(this).attr("data-type") != "caption") {
                    $(this).removeClass("clicked");
                    $("#caption" + $(this).attr("data-name")).attr("data-state", "unclicked");
                } else if ($(this).attr("data-type") == "caption") {
                    $("#" + $(this).attr("data-name")).removeClass("clicked");
                    $("#" + $(this).attr("data-name")).attr("data-state", "unclicked");
                }
                $(this).attr("data-state", "unclicked");
            }
            console.log(eventsArray);
        });
    }
    food();
    drinks();
    events();

    function submit() {
        $("#submitBtn").on("click", function(event) {
            event.preventDefault();
            console.log(eventsArray);
            console.log(foodArray);
            console.log(drinksArray);

            database.ref(userName).update({
                food: foodArray,
                drinks: drinksArray,
                events: eventsArray
            });
            //sets events ajax query url with events array and prints to suggestions page
            // eventsFunction();
            loadSuggestionPage();
        });
    }
    submit();

    // Restaurants API
    // =============================================== 
    var userName = localStorage.getItem("name");
    // Food Suggestions Part

    var zomatoAPIkey = "a08320eec6b5e9b8be951aab1ae4b453";

    var foodPickedArray = [];
    var foodCode = [];
    var foodType = "";

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cuisines?city_id=278&apikey=" + zomatoAPIkey,
        method: "GET"
    }).done(function(response) {
        foodCode = response.cuisines;

        database.ref(userName + "/food").on('value', function(snapshot) {
            console.log(snapshot.val())
            var foodArray = snapshot.val();
            // });

            if (foodArray.length > 0) {
                foodType = "";
                for (var i = 0; i < foodCode.length; i++) {
                    if (foodArray.indexOf(foodCode[i].cuisine.cuisine_name.toUpperCase()) > -1) {
                        if (foodType != "") {
                            foodType = foodType + "%2C" + foodCode[i].cuisine.cuisine_id.toString();
                        } else {
                            foodType = foodCode[i].cuisine.cuisine_id.toString();
                        };
                    }
                }
                console.log("Food Type:" + foodType);
                $.ajax({
                    url: "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=" + zomatoAPIkey + "&count=4&sort=rating&order=desc&cuisines=" + foodType,
                    method: "GET"
                }).done(function(response) {
                    var restaurants = response.restaurants;
                    for (var i = 0; i < restaurants.length; i++) {
                        $("#foodRow" + Math.floor(i / 2)).append(
                            "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions img-responsive' src='" + restaurants[i].restaurant.thumb + "' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>" + restaurants[i].restaurant.name + "</h2><h4>" + restaurants[i].restaurant.location.address + "</h4><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat=" + restaurants[i].restaurant.location.latitude + " data-long=" + restaurants[i].restaurant.location.longitude + ">More Info</a></p></div></div>")
                    }
                });
            } else {
                $.ajax({
                    url: "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=" + zomatoAPIkey + "&count=4&sort=rating&order=desc&collection_id=1",
                    method: "GET"
                }).done(function(response) {
                    var restaurants = response.restaurants;
                    for (var i = 0; i < restaurants.length & i < 4; i++) {
                        $("#foodRow" + Math.floor(i / 2)).append(
                            "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions img-responsive' src='" + restaurants[i].restaurant.thumb + "' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>" + restaurants[i].restaurant.name + "</h2><h4>" + restaurants[i].restaurant.location.address + "</h4><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat=" + restaurants[i].restaurant.location.latitude + " data-long=" + restaurants[i].restaurant.location.longitude + ">More Info</a></p></div></div>")
                    }
                });
            }
        });

    })


    // Drink Suggestions Part

    // var drinkArray=["Bar", "Coffee shop", "Wine Bar","Juice Bar", "Beer Garden", "Brewery", "Lounge"]
    // var drinkPickedArray= [];
    var drinkCode = [];
    var drinkType = "";

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/establishments?city_id=278&apikey=" + zomatoAPIkey,
        method: "GET"
    }).done(function(response) {
        drinkCode = response.establishments;
        console.log(drinkCode)
        drinkType = "";
        var drinkTypeArray = [];

        database.ref(userName + "/drinks").on('value', function(snapshot) {
            console.log(snapshot.val())
            var drinksArray = snapshot.val();

            for (var i = 0; i < drinkCode.length; i++) {
                if (drinksArray.indexOf(drinkCode[i].establishment.name.toUpperCase()) > -1) {
                    drinkTypeArray.push(drinkCode[i].establishment.id);
                }
                console.log(drinkTypeArray);
            }

            if (drinkTypeArray.length == 1) {
                $.ajax({
                    url: "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=" + zomatoAPIkey + "&sort=rating&count=4&order=des&establishment_type=" + drinkTypeArray[0],
                    method: "GET"
                }).done(function(response) {
                    drink = response.restaurants;
                    var drinkList = $("<div>");
                    for (var i = 0; i < drink.length; i++) {
                        var drinkThumb = "";
                        if (drink[i].restaurant.thumb != null || $.type(drink[i].restaurant.thumb) === "string") {
                            drinkThumb = drink[i].restaurant.thumb;
                        } else {
                            drinkThumb = "assets/images/drinkThumb.jpg";
                        }
                        $("#drinkRow" + Math.floor(i / 2)).append(
                                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions img-responsive' src='" + drinkThumb + "' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>" + drink[i].restaurant.name + "</h2><h4>" + drink[i].restaurant.location.address + "</h4><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat=" + drink[i].restaurant.location.latitude + " data-long=" + drink[i].restaurant.location.longitude + ">More Info</a></p></div></div>")
                            //              $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
                            // $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
                    }
                });
            } else if (drinkTypeArray.length == 2) {
                var counter = 0;
                for (var j = 0; j < drinkTypeArray.length; j++) {
                    drinkType = drinkTypeArray[j];
                    $.ajax({
                        url: "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=" + zomatoAPIkey + "&sort=rating&count=2&order=des&establishment_type=" + drinkType,
                        method: "GET"
                    }).done(function(response) {
                        drink = response.restaurants;
                        var drinkList = $("<div>");
                        for (var i = 0; i < drink.length; i++) {
                            var drinkThumb = "";
                            if (drink[i].restaurant.thumb != null || $.type(drink[i].restaurant.thumb) === "string") {
                                drinkThumb = drink[i].restaurant.thumb;
                            } else {
                                drinkThumb = "assets/images/drinkThumb.jpg";
                            }
                            $("#drinkRow" + Math.floor(counter / 2)).append(
                                    "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions img-responsive' src='" + drinkThumb + "' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>" + drink[i].restaurant.name + "</h2><h4>" + drink[i].restaurant.location.address + "</h4><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat=" + drink[i].restaurant.location.latitude + " data-long=" + drink[i].restaurant.location.longitude + ">More Info</a></p></div></div>")
                                //                  $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
                                // $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
                            counter++;
                        }
                    });
                }
            } else if (drinkTypeArray.length == 0) {
                $.ajax({
                    url: "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=" + zomatoAPIkey + "&sort=rating&count=4&order=des&cuisines=268",
                    method: "GET"
                }).done(function(response) {
                    drink = response.restaurants;
                    var drinkList = $("<div>");
                    for (var i = 0; i < drink.length; i++) {
                        var drinkThumb = "";
                        if (drink[i].restaurant.thumb != null || $.type(drink[i].restaurant.thumb) === "string") {
                            drinkThumb = drink[i].restaurant.thumb;
                        } else {
                            drinkThumb = "assets/images/drinkThumb.jpg";
                        }
                        $("#drinkRow" + Math.floor(i / 2)).append(
                            "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions img-responsive' src='" + drinkThumb + "' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>" + drink[i].restaurant.name + "</h2><h4>" + drink[i].restaurant.location.address + "</h4><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat=" + drink[i].restaurant.location.latitude + " data-long=" + drink[i].restaurant.location.longitude + ">More Info</a></p></div></div>");
                        //             $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
                        // $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
                    }
                });
            }
        });
    });


    //Main page js
    $("#HangwFriends").on("click", function() {
        window.location = "/meetups";
    });

    $("#Loner").on("click", function() {
        window.location = "/preferences";
    });




























































































































































































































































































    function googleSignIntwo() {
        firebase.auth().signInWithPopup(google).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            loadProfilePage()

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    function facebookSignInTwo() {
        firebase.auth().signInWithPopup(facebook).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;


            loadProfilePage()

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    $(".test").on("click", function(event) {
        event.preventDefault()
        var method = $(this).attr("data")
        console.log("hello")
        if (method === "googleLogin") {
            googleSignIntwo();

        } else if (method === "facebookLogin") {
            facebookSignInTwo()

        }
    })

    function loadProfilePage() {
        window.location.href = "login.html"
    }


    $(".devs").hover(function() {
        $(this).attr("src", $(this).attr("data-animate"));
    }, function() {
        $(this).attr("src", $(this).attr("data-still"));

    });








    // function eventsFunction(){
    // function eventsFunction(){
    var ryanQueryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";

    database.ref(userName + "/events").on('value', function(snapshot) {
        console.log(snapshot.val())
        if (snapshot.val() != null) {
            var eventsArray = snapshot.val();
        }

        for (var z = 0; z < eventsArray.length; z++)

        {

            if (eventsArray[z] === 'Rock') {
                console.log(ryanQueryURL);

                ryanQueryURL += "&taxonomies.name=concert";

                ryanQueryURL += "&genres.slug=rock";
            }

            if (eventsArray[z] === 'Rap') {
                ryanQueryURL += "&taxonomies.name=concert";

                ryanQueryURL += "&genres.slug=rap&genres.slug=hip-hop";
            }

            if (eventsArray[z] === 'EDM') {
                ryanQueryURL += "&taxonomies.name=concert";

                ryanQueryURL += "&genres.slug=electronic";

            }

            if (eventsArray[z] === 'Country') {
                ryanQueryURL += "&taxonomies.name=concert";

                ryanQueryURL += "&genres.slug=country";

            }

            if (eventsArray[z] === 'Pop') {
                ryanQueryURL += "&taxonomies.name=concert";

                ryanQueryURL += "&genres.slug=pop";

            }

            if (eventsArray[z] === 'Theater') {
                ryanQueryURL += "&taxonomies.name=theater";
            }

            if (eventsArray[z] === 'Comedy') {
                ryanQueryURL += "&taxonomies.name=comedy";

            }

            if (eventsArray[z] === 'Sports') {
                ryanQueryURL += "&taxonomies.name=sports";

            }

        }

        console.log(ryanQueryURL);

        $.ajax({
            url: ryanQueryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);

            var picker = 0;
            var rowAssign = 0;

            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < response.events[i].performers.length; j++) {
                    var performerImage = response.events[i].performers[j].image;
                    var performerName = response.events[i].performers[j].name;
                    var eventType = response.events[i].type;
                    var dateTime = response.events[i].datetime_local;
                    var momentTime = moment(dateTime).format('LT');
                    var momentDate = moment(dateTime).format('LL');
                    var venueName = response.events[i].venue.name;

                    var venueStreetName = response.events[i].venue.address;

                    var venueAddress = response.events[i].venue.extended_address;
                    var venueLat = response.events[i].venue.location.lat;
                    var venueLon = response.events[i].venue.location.lon;
                    var ticketLink = response.events[i].url;
                    console.log(momentTime);
                    console.log(momentDate);


                    if (picker === 0 || picker === 2 || picker === 4) {
                        rowAssign = 1;
                    }
                    if (picker === 1 || picker === 3 || picker === 5) {
                        rowAssign = 2;
                    }

                    //checks if the event performer has a saved image,
                    //if it doesn't, print a default pic

                    if (response.events[i].performers[j].image === null) {


                        $('#eventsSuggestions' + rowAssign).append('<div class="row suggestions-list-items" >\
									<div class="col-md-6">\
											<a href="#"><img class="thumbnail-suggestions img-responsive" src="assets/images/concert_placeholder.jpg" alt="concert image">\
										</a>\
										</div>\
										<div class="col-md-6">\
										<h2 class="suggestions-h2">' + performerName + '</h2>\
										<h4>' + venueName + '</h4><h4>' + venueAddress + '</h4>\
										<h5 class="suggestion" data-name="alamo">Date: &nbsp; ' + momentDate + '</h5>\
										<h5 class="suggestion" data-name="alamo">Time: &nbsp; ' + momentTime + '</h5>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="' + venueLat + '" data-long="' + venueLon + '">More Info</a>\
										&nbsp; <a class="btn btn-site btn-lg" href="' + ticketLink + '" role="button" target="_blank"\
										data-lat="' + venueLat + '" data-long="' + venueLon + '">Buy Tickets</a></p>\
									</div>\
									</div>');

                        console.log(ticketLink);
                    } else {

                        $('#eventsSuggestions' + rowAssign).append('<div class="row suggestions-list-items" >\
								<div class="col-md-6">\
										<a href="#"><img class="thumbnail-suggestions img-responsive" src="' + performerImage + '" alt="' + performerImage + '">\
										</a>\
									</div>\
									<div class="col-md-6">\
										<h2 class="suggestions-h2">' + performerName + '</h2>\
										<h4>' + venueName + '</h4><h4>' + venueAddress + '</h4>\
										<h5 class="suggestion" data-name="alamo">Date: &nbsp; ' + momentDate + '</h5>\
										<h5 class="suggestion" data-name="alamo">Time: &nbsp; ' + momentTime + '</h5>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="' + venueLat + '" data-long="' + venueLon + '">More Info</a>\
										&nbsp; <a class="btn btn-site btn-lg" href="' + ticketLink + '" role="button" target="_blank"\
										data-lat="' + venueLat + '" data-long="' + venueLon + '">Buy Tickets</a></p>\
									</div>\
								</div>');

                        console.log(ticketLink);
                    }
                }

                picker++;
            }

        });
        // }

    });
});