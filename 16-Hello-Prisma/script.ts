import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  const newPost = await prisma.user.createMany({
    data: [
      { email: "123@gmail.com", name: "Test1" },
      { email: "345@gmail.com", name: "Test2" },
      { email: "678@gmail.com", name: "Test3" },
      { email: "910@gmail.com", name: "Test4" },

    ],
    skipDuplicates: true
  });
  console.log(newPost);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));

  const specificUser = await prisma.user.findUnique({
    where: {
        email: "123@gmail.com"
    }
  });
  console.log("Target user:", specificUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
