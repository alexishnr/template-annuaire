router.get("/update", function (req, res, next) {
  fetch(host + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ${professionnelsToFetch}($where: JSON)
             {
              ${professionnelsToFetch}(where: $where)
            {
             id
            }
        }`,
      variables: {
        where: {
          isDisplayed: false,
          City: "Paris",
        },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseAsJson) => {
      console.log(typeof responseAsJson.data.dermatologues[0].id);
      let results = responseAsJson.data.dermatologues;

      results.forEach((element) => {
        fetch(host + "/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation {
                      ${updateProfessionnelsToFetch}(input: {
                        where: { id: ${element.id} }
                        data: {
                          BlanchimentDentaire :${true}, isDisplayed:${true}
                        }
                        }) {
                          dermatologue {
                            id
                          }
                        }
                      }`,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((responseAsJson1) => {
            console.log(responseAsJson1);
          })
          .catch((e) => {
            console.error(e);
          });
      });
    });
});

// router.get("/update-secret", function (req, res, next) {
//   fetch(host + "/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `query ${professionnelsToFetch}($where: JSON)
//              {
//               ${professionnelsToFetch}(where: $where)
//             {
//              id
//             }
//         }`,
//       variables: {
//         where: {
//           isDisplayed: false,
//           City: "Bordeaux",
//         },
//       },
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseAsJson) => {
//       console.log(typeof responseAsJson.data.veterinaires[0].id);
//       let results = responseAsJson.data.veterinaires;

//       results.forEach((element) => {
//         fetch(host + "/graphql", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: `mutation {
//                       ${updateProfessionnelsToFetch}(input: {
//                         where: { id: ${element.id} }
//                         data: {
//                           isDisplayed:${true}
//                         }
//                         }) {
//                           veterinaire {
//                             id
//                           }
//                         }
//                       }`,
//           }),
//         })
//           .then((response) => {
//             return response.json();
//           })
//           .then((responseAsJson1) => {
//             console.log(responseAsJson1);
//           })
//           .catch((e) => {
//             console.error(e);
//           });
//       });
//     });
// });
