import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, gender, birthDate } = req.body;

        if (!firstName || typeof firstName !== "string") {
            return res.status(400).json({ error: "firstName is required" });
        }

        const person = await prisma.person.create({
            data: {
                firstName,
                lastName: lastName || null,
                gender: gender || null,
                birthDate: birthDate ? new Date(birthDate) : null,
            },
        });

        return res.status(201).json(person);
    } catch (error) {
        console.error("Create person error:", error);
        return res.status(500).json({ error: "Failed to create person" });
    }
});

router.get("/", async (_req, res) => {
    try {
        const persons = await prisma.person.findMany({
            orderBy: { createdAt: "desc" },
        });

        return res.json(persons);
    } catch (error) {
        console.error("Get persons error:", error);
        return res.status(500).json({ error: "Failed to fetch persons" });
    }
});

export default router;