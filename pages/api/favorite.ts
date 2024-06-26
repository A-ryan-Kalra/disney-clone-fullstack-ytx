import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });
      if (!existingMovie) {
        throw error("Invalid Id");
      }
      const user = await prismadb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });
      if (!existingMovie) {
        throw new Error("Invalid id");
      }
      const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email as string,
        },
        data: {
          favoriteIds: updateFavoriteIds,
        },
      });

      return res.status(200).json(updateUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
