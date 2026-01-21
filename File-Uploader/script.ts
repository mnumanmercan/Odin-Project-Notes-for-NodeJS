import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      password: "securepassword",
      files: {
        create: [
          {
            fileName: "file1.png",
            path: "examples/file1.png",
            originalName: "gunes.png",
            mimeType: "image/png",
            size: 1024,
          },
          {
            fileName: "file2.png",
            path: "examples/file2.png",
            originalName: "tatil.png",
            mimeType: "image/png",
            size: 2458624,
          },
        ],
      },
    },
    include: {
      files: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      files: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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
