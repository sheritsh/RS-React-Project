import { http, HttpResponse } from 'msw';

const baseUrl = 'https://api.jikan.moe/v4/anime';

export const handlers = [
  http.get(baseUrl, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';

    return HttpResponse.json({
      data: [
        {
          mal_id: 1,
          title: 'Test Anime',
          synopsis: 'Test synopsis',
          images: {
            webp: {
              image_url: 'test-image.jpg',
            },
          },
          score: 8.5,
          episodes: 12,
          status: 'Finished',
          year: 2023,
        },
      ],
      pagination: {
        last_visible_page: 2,
        has_next_page: true,
        current_page: Number(page),
        items: {
          count: 1,
          total: 2,
          per_page: 1,
        },
      },
    });
  }),

  http.get(`${baseUrl}/:id`, () => {
    return HttpResponse.json({
      data: {
        mal_id: 1,
        title: 'Test Anime Details',
        synopsis: 'Detailed synopsis',
        images: {
          webp: {
            image_url: 'test-image.jpg',
          },
        },
        score: 8.5,
        episodes: 12,
        status: 'Finished',
        year: 2023,
      },
    });
  }),
];
