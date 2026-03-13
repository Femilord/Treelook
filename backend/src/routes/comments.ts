import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/* CREATE COMMENT */
router.post("/:postId", requireAuth, async (req: AuthRequest, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!content || typeof content !== "string" || !content.trim()) {
            return res.status(400).json({ error: "Comment content is required" });
        }

        const comment = await prisma.comment.create({
            data: {
                content: content.trim(),
                postId,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(201).json(comment);
    } catch (error) {
        console.error("Create comment error:", error);
        return res.status(500).json({ error: "Failed to create comment" });
    }
});

export default router;