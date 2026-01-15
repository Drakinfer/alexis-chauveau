import groq from 'groq';

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0]{
    brandName,
    presentation,
    status,
    contact{ email, phone, location },
    links{ github, linkedin },
    education[]{ title, school, year }
  }
`;

export const STACK_QUERY = groq`
  *[_type == "stackItem"] | order(type asc, name asc){
    _id,
    name,
    type
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, publishedAt desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    description[],
    stack,
    links{
      demo,
      github
    },
    publishedAt
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description[],
    stack,
    links{ demo, github },
    publishedAt
  }`;
