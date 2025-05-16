import { ActionArgs, json } from "@remix-run/node";
import { prisma } from "~/prisma.server";

export async function action({ request }: ActionArgs) {
  const { productId, rating } = await request.json();

  // Lưu vào database
  await prisma.productReview.create({
    data: {
      productId,
      rating,
    },
  });

  return json({ success: true });
}