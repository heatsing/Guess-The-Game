import { defineField, defineType } from "sanity";

export default defineType({
  name: "dailyGame",
  title: "Daily Game",
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
      name: "date",
      title: "Date (UTC)",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "game",
      title: "Game",
      type: "reference",
      to: [{ type: "game" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

