import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { services } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /api/services
router.get('/', async (_req: Request, res: Response) => {
  try {
    const all = await db.select().from(services).where(eq(services.isActive, true));
    res.json({ success: true, data: all });
  } catch (err: any) {
    console.error('Services error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [svc] = await db
      .select()
      .from(services)
      .where(eq(services.id, req.params.id))
      .limit(1);
    if (!svc) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: svc });
  } catch (err: any) {
    console.error('Service error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
