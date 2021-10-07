db.createCollection( <coach>,
   {
     Coach_name: <string>,
     ID: {                  // Added in MongoDB 5.0
        CoachID: <integer>,        // required for time series collections
        TeamID: <integer>,
        ClubID: <integer>
     },
     Country: <string>,
     Club: <string>,
     size: <number>,
     max: <number>,
    Age: <integer>,
   }
)
