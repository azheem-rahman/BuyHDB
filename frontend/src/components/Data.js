// Data component to fetch API
import React, { useState, useContext, useEffect } from "react";
import SomeContext from "../context/some-context";
import LoadingSpinner from "./LoadingSpinner";

const Data = (props) => {
  const someCtx = useContext(SomeContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      // fetch method is GET as specified on data.gov.sg website
      // const res = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      const res = await fetch(url);
      console.log(res);
      console.log(
        encodeURIComponent(
          `{"town": "${someCtx.town}", "flat_type": "${someCtx.flatType}", "flat_model": "${someCtx.flatModel}"}`
        )
      );

      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      // console.log(data);

      console.log(
        data.result.records.map((item) => {
          return item;
        })
      );

      const unsortedMatchedResults = [];

      // push data that matches user's search criterias into unsortedMatchedResults array
      data.result.records.map((item) => {
        if (JSON.stringify(someCtx.town) === JSON.stringify(item.town)) {
          if (
            JSON.stringify(someCtx.flatType) === JSON.stringify(item.flat_type)
          ) {
            if (
              JSON.stringify(someCtx.flatModel) ===
              JSON.stringify(item.flat_model)
            ) {
              return unsortedMatchedResults.push({
                _id: item._id,
                town: item.town,
                street_name: item.street_name,
                block: item.block,
                storey_range: item.storey_range,
                flat_type: item.flat_type,
                flat_model: item.flat_model,
                floor_area_sqm: item.floor_area_sqm,
                resale_price: item.resale_price,
                remaining_lease: item.remaining_lease,
              });
            }
          }
        }
      });

      // sort unsortedMatchedResults array elements according to block number and then assign the sorted elements into sortedBlock array
      const sortedBlock = [...unsortedMatchedResults].sort(
        (a, b) => a.block - b.block
      );

      // push sortedBlock array into post state
      sortedBlock.map((item) => {
        return someCtx.setPost((prevState) => [
          ...prevState,
          {
            id: item._id,
            town: item.town,
            street_name: item.street_name,
            block: item.block,
            storey_range: item.storey_range,
            flat_type: item.flat_type,
            flat_model: item.flat_model,
            floor_area_sqm: item.floor_area_sqm,
            resale_price: item.resale_price,
            remaining_lease: item.remaining_lease,
          },
        ]);
      });
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // pull data after HDB related to town selected, limited to 12,000 entries since most entry is 11,000+ for Sengkang
  useEffect(() => {
    // URL to search with filter {"town": "ANG MO KIO", "flat_type": "4 ROOM", "flat_model": "Model A"}
    // https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=100&filters=%7B%22town%22%3A%20%22ANG%20MO%20KIO%22%2C%20%22flat_type%22%3A%20%224%20ROOM%22%2C%20%22flat_model%22%3A%20%22Model%20A%22%7D
    // results = 378

    // master url -- dont delete/edit!
    const url = `https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=10000&filters=${encodeURIComponent(
      `{"town": "${someCtx.town}", "flat_type": "${someCtx.flatType}", "flat_model": "${someCtx.flatModel}"}`
    )}`;

    // previous codes:
    // const url =
    //   "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=12000&q=" +
    //   someCtx.town;
    fetchPost(url);
  }, [someCtx.searchCriteria]);

  return (
    <div>
      {/* to display loading of fetching data from HDB  */}
      <div>
        {isLoading ? (
          <div className="centered">
            <LoadingSpinner />
          </div>
        ) : (
          props.checkResultFound
        )}
      </div>
    </div>
  );
};

export default Data;
