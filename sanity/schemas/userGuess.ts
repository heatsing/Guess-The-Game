import { defineField, defineType } from "sanity";

export default defineType({
  name: "userGuess",
  title: "User Guess",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "game",
      title: "Game",
      type: "reference",
      to: [{ type: "game" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "guess",
      title: "Guess",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCorrect",
      title: "Is correct",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    }),
  ],
});

