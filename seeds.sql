INSERT INTO users (userName, email, password)
VALUES ("morgan greenwalt", "morgan@test.com", "test"), ("charlie brown", "charlie@test.com", "test"), ("charlie green", "green@test.com", "test");

INSERT INTO preferences (category, preference, userID)
VALUES ("drinks", "beergarden", "1"), ("food", "chinese", "1"), ("events", "comedy", "1"), ("drinks", "wine", "2"), ("food", "american", "2"), ("drinks", "pub", "3"), ("food", "thai", "3"), ("food", "japanese", "3");

INSERT INTO relationships (friendID, userId, status)
VALUES ("1", "2", "pending"), ("2", "1", "accepted"), ("2", "3", "accepted"), ("3", "1", "pending")

INSERT INTO events (eventName, status, date)
VALUES ("Morgan Wild Party", "open", "2017-08-10"), ("PSing Party", "open", "2017-08-20"), ("Topher Short Tie", "closed", "2017-05-05"), ("Ryan Loner", "closed", "2017-03-02")

INSERT INTO eventMembers (eventId, userId)
VALUES ("1", "2"), ("1", "3"), ("1", "1"), ("2", "1"), ("2", "2"), ("3", "1"), ("4", "2")


INSERT INTO eventSuggestions (eventId,date,latitude, link, longtitude, ticketInfo, time, title, upvotes, venue)
VALUES (1,'2017-08-08',30.2684898,'http://do512.com/events/2017/8/8/in-the-valley-below-w-flagship',-97.73615579999999,'$15 | All Ages','8:00PM','IN THE VALLEY BELOW W/ FLAGSHIP',149,'STUBB"S'), (1,'2017-08-08',30.283927,'http://do512.com/team-austin-speaker-series-august',-97.7313511,NULL,'6:00PM','HOW DOSTUFF, EVERFEST & SXSW USE TECH TO PROMOTE AND SCALE LARGE EVENTS',126,'THE UNIVERSITY OF TEXAS CLUB'), (2,'2017-08-08',30.26960979999999,'http://do512.com/events/2017/8/8/growl-tour-kickoff-blushing-the-nymphs-dude-elsberry',-97.73635829999999,'No Cover / $10 Minors','9:00PM','GROWL (TOUR KICKOFF), BLUSHING, THE NYMPHS, DUDE ELSBERRY',81,'CHEER UP CHARLIES'), (3,NULL,30.2414427,'http://do512.com/events/2017/7/30/disneypop-exhibit',-97.7836131,'Free','12:00PM','DISNEYPOP! EXHIBIT',19,'ART ON 5TH'), (4,NULL,30.2802025,'http://do512.com/events/2017/6/26/hi-how-are-you-daniel-johnston',-97.73910590000001,NULL,'12:30PM','HI, HOW ARE YOU DANIEL JOHNSTON',15,'BULLOCK TEXAS STATE HISTORY MUSEUM');
