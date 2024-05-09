// import redis from "redis";

// function fetchGroupMembers(groupId: string): Promise<string[]> {
//   return new Promise((resolve, reject) => {
//     redisClient.zrange(groupId, 0, -1, (err: any, members: string[]) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(members);
//       }
//     });
//   });
// }
