import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'stack',
      title: 'Stack (tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Liens',
      type: 'object',
      fields: [
        defineField({ name: 'demo', title: 'Demo', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
});
