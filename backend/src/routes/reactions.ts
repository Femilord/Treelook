import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/* TOGGLE REACTION */
router.post("/:postId", requireAuth, async (req: AuthRequest, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const existingReaction = await prisma.reaction.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });

        if (existingReaction) {
            await prisma.reaction.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId,
                    },
                },
            });

            return res.json({ reacted: false });
        }

        await prisma.reaction.create({
            data: {
                postId,
                userId,
                type: "like",
            },
        });

        return res.json({ reacted: true });
    } catch (error) {
        console.error("Toggle reaction error:", error);
        return res.status(500).json({ error: "Failed to toggle reaction" });
    }
});

export default router;