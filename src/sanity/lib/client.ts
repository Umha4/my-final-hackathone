// import { createClient } from 'next-sanity';
// import { apiVersion, dataset, projectId } from '../env';

// // Check if the Sanity token is available
// if (!process.env.SANITY_TOKEN) {
//   throw new Error('Missing SANITY_TOKEN environment variable');
// }

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Use CDN for faster responses
//   token: process.env.SANITY_TOKEN, // Only accessible on the server
// });













import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_TOKEN, // Only accessible on the server
})
