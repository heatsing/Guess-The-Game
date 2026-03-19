import { defineField, defineType } from "sanity";

export default defineType({
  name: "game",
  title: "Game",
  type: "document",
  fields: [
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      description: "Matches mode key in the app (game/book/movie/...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "acceptableAnswers",
      title: "Acceptable answers",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
});

