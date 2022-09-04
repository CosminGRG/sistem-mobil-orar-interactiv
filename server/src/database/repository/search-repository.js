const { UserModel, GroupModel } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId();

class SearchRepository {
  async ProcessSearchPhrase(searchphrase) {
    var regex = new RegExp(searchphrase, "i");

    var result = new Array();

    var userResult = await UserModel.find({
      searchfield: regex,
    })
      .populate({
        path: "group",
        populate: {
          path: "orar",
          populate: {
            path: "zile.orarItems.professor",
            select: "firstname lastname",
          },
        },
      })
      .limit(10);

    var profResult = await UserModel.find({
      searchfield: regex,
      group: { $eq: undefined },
    })
      .populate("orar")
      .limit(10);

    profResult.map((x) => {
      if (x.group == null) {
        let index = userResult.findIndex((d) => d.id === x.id);
        userResult[index] = x;
      }
    });

    var groupResult = await GroupModel.find({
      searchfield: regex,
    })
      .populate({
        path: "orar",
        populate: {
          path: "zile.orarItems.professor",
          select: "firstname lastname",
        },
      })
      .limit(10);

    result = userResult.concat(groupResult);

    return result;
  }
}

module.exports = SearchRepository;

// ====================================================

// var result = await UserModel.aggregate([
//   {
//     $search: {
//       text: {
//         query: searchphrase,
//         path: "searchfield",
//       },
//     },
//   },
//   {
//     $lookup: {
//       from: "groups",
//       let: { orar: "$_id" },
//       pipeline: [
//         { $match: { $expr: { $eq: ["$orar", "$$orar"] } } },
//         {
//           $lookup: {
//             from: "orars",
//             let: { orar: "$_id" },
//             pipeline: [
//               {
//                 $match: { $expr: { $eq: ["$address_id", "$$addressId"] } },
//               },
//             ],
//             as: "orar",
//           },
//         },
//       ],
//       as: "group",
//     },
//   },
//   { $unwind: "$group" },
// ]);

// const userResult = await UserModel.find({
//   firstname: new RegExp(searchphrase, "i"),
// }).limit(10);

// const result = await GroupModel.find({
//   $text: { $search: searchphrase },
// }).limit(10);

// var orarResult = await OrarModel.aggregate([
//   // First match to reduce the number of candidate documents
//   {
//     $match: {
//       "zile.orarItems.professor": new mongoose.Types.ObjectId(
//         profResult.id
//       ),
//     },
//   },

//   // Unwind 'zile' & 'orarItems' arrays
//   { $unwind: "$zile" },
//   { $unwind: "$zile.orarItems" },

//   // Limit to matching zile & orarItems
//   {
//     $match: {
//       "zile.orarItems.professor": new mongoose.Types.ObjectId(
//         profResult.id
//       ),
//     },
//   },
// ]);

/**
         * .find({
            "zile.orarItems.professor": new mongoose.Types.ObjectId(profResult.id),
          });
         */

/**
         * OrarModel.aggregate([
            { $unwind: "$zile" },
            {
              $project: {
                filteredValue: {
                  $filter: {
                    input: "$zile.orarItems",
                    as: "items",
                    cond: {
                      $eq: [
                        "$$items.professor",
                        new mongoose.Types.ObjectId(profResult.id),
                      ],
                    },
                  },
                },
              },
            },
          ]);
         */
