import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import Nextauth, { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // console.log(session);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};

export default serverAuth;
