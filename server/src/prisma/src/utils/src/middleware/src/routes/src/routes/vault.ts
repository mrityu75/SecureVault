import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authMiddleware";
import { encrypt, decrypt } from "../utils/crypto";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", authenticate, async (req, res) => {
  const { siteName, siteUsername, sitePassword } = req.body;
  const userId = (req as any).user.id;
  const encryptedPass = encrypt(sitePassword);

  const vault = await prisma.vault.create({
    data: { userId, siteName, siteUsername, encryptedPass },
  });
  res.json(vault);
});

router.get("/", authenticate, async (req, res) => {
  const userId = (req as any).user.id;
  const vaults = await prisma.vault.findMany({ where: { userId } });
  res.json(vaults.map(v => ({ ...v, decryptedPass: decrypt(v.encryptedPass) })));
});

export default router;
