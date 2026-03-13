import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/* CREATE POST */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
    try {
        const { content } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!content || typeof content !== "string" || !content.trim()) {
            return res.status(400).json({ error: "Post content is required" });
        }

        const post = await prisma.post.create({
            data: {
                content: content.trim(),
                authorUserId: userId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(201).json(post);
    } catch (error) {
        console.error("Create post error:", error);
        return res.status(500).json({ error: "Failed to create post" });
    }
});

/* GET POSTS */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.userId;

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                reactions: {
                    select: {
                        userId: true,
                    },
                },
            },
        });

        const formattedPosts = posts.map((post) => ({
            ...post,
            reactionCount: post.reactions.length,
            hasReacted: post.reactions.some((reaction) => reaction.userId === userId),
        }));

        return res.json(formattedPosts);
    } catch (error) {
        console.error("Get posts error:", error);
        return res.status(500).json({ error: "Failed to fetch posts" });
    }
});

export default router;