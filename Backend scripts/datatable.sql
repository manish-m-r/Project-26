db.createCollection( <name>,
   {
     capped: <boolean>,
     timeseries: {                  // Added in MongoDB 5.0
        timeField: <string>,        // required for time series collections
        metaField: <string>,
        granularity: <string>
     },
     expireAfterSeconds: <number>,
     autoIndexId: <boolean>,
     size: <number>,
     max: <number>,
     storageEngine: <document>,
     validator: <document>,
     validationLevel: <string>,
     validationAction: <string>,
     indexOptionDefaults: <document>,
     viewOn: <string>,              // Added in MongoDB 3.4
     pipeline: <pipeline>,          // Added in MongoDB 3.4
     collation: <document>,         // Added in MongoDB 3.4
     writeConcern: <document>
   }
)