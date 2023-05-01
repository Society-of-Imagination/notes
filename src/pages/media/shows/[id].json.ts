import { InferGetStaticParamsType, InferGetStaticPropsType, GetStaticPaths } from 'astro';
import type { APIContext } from 'astro';
import { getCollection, getEntryBySlug } from "astro:content";

export const getStaticPaths = (async () => {
    const shows = await getCollection('shows');
    return shows.map((entry) => ({
        params: {
          id: entry.slug,
        },
        props: {
          entry,
        },
      }));
  }) satisfies GetStaticPaths;
  
  type Params = InferGetStaticParamsType<typeof getStaticPaths>;
  type Props = InferGetStaticPropsType<typeof getStaticPaths>;
  
  
export function get({ props }: APIContext) {
    return {
      body: JSON.stringify({ entry: props.entry }),
    };
  }