import { userModel } from "../models/UserModel.js";

export const createIfNotExist = async (user, contact, res) => {
  const userFind = await userModel.findOne({ userId: user.id });
  console.log("----user createIfNotExist----", userFind.phone);
  try {
    if (userFind === null) {
      userModel.create({
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
        userRole: "user",
        userPhoneNumber: contact,
      });
    }
    if (userFind) {
      await userModel.findOneAndUpdate(
        {
          userId: user.id,
        },
        {
          firstName: user.first_name,
          lastName: user.last_name,
          userName: user.username,
          userPhoneNumber: contact,
        },
        {
          upsert: true,
        }
      );
    }
  } catch (er) {
    console.log(er);
  }
};

// const masterCreate = async (user, values) => {
//   const userFind = await UserModel.findOne({ userId: user.id });
//   console.log("-------------------------------------------------", userFind);
//   try {
//     if (userFind === null) {
//       UserModel.create({
//         userId: user.id,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         userName: user.username,
//       });
//     }
//     if (userFind) {
//       await UserModel.findOneAndUpdate(
//         {
//           userId: user.id,
//         },
//         {
//           userRole: values.role,
//           firstName: user.first_name,
//           lastName: user.last_name,
//           userName: user.username,
//           userFullName: values.value1,
//           userPhoneNumber: values.value2,
//           userCity: values.value3,
//           userService: values.value4,
//           userPhoto: values.value5,
//           userOfice: values.value6,
//           userDescription: values.value7,
//         },
//         {
//           upsert: true,
//         }
//       );
//     }
//   } catch (er) {
//     console.log(er);
//   }
// };
// const getList = async (obj) => {
//   try {
//     const city = obj.userCity;
//     const services = obj.userService;
//     const list = await UserModel.find({
//       userCity: city,
//       userService: services,
//     });
//     // console.log("------BASA", list);
//     // console.log(
//     //   "------BASA2",
//     //   list.map((item) => item.userId)
//     // );
//     return list;
//   } catch (er) {
//     console.log(er);
//   }
// };
// const getUserRole = async (user) => {
//   const userFind = await UserModel.findOne({ userId: user.id });
//   return userFind;
// };
