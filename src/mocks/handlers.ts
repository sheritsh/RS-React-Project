// // src/mocks/handlers.ts
// import { rest } from 'msw';
// import { mockAnime } from './test-utils';

// export const handlers = [
//   rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
//     return res(
//       ctx.json({
//         data: [mockAnime],
//         pagination: {
//           last_visible_page: 4,
//           has_next_page: true,
//           current_page: 1,
//           items: {
//             count: 25,
//             total: 100,
//             per_page: 25,
//           },
//         },
//       })
//     );
//   }),
// ];
