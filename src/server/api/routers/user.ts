import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const userInput = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  job: z.string(),
});

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }),
  create: publicProcedure.input(userInput).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        age: input.age,
        job: input.job,
      },
    });
    return user;
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
      return user;
    }),
});
