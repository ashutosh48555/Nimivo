import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { bookings, providers, services, users } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate, authorize('provider'));

// GET /api/provider/bookings
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const [provider] = await db
      .select()
      .from(providers)
      .where(eq(providers.userId, req.user!.userId))
      .limit(1);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider profile not found' });
    }

    const result = await db
      .select()
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .where(eq(bookings.providerId, provider.id))
      .orderBy(desc(bookings.createdAt));

    const mapped = result.map((r) => ({
      ...r.bookings,
      service: r.services,
    }));

    res.json({ success: true, data: mapped });
  } catch (err: any) {
    console.error('Provider bookings error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/provider/bookings/:id/accept
router.patch('/bookings/:id/accept', async (req: Request, res: Response) => {
  try {
    const [updated] = await db
      .update(bookings)
      .set({ status: 'en_route', updatedAt: new Date() })
      .where(eq(bookings.id, req.params.id))
      .returning();
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/provider/bookings/:id/start
router.patch('/bookings/:id/start', async (req: Request, res: Response) => {
  try {
    const [updated] = await db
      .update(bookings)
      .set({ status: 'in_progress', startedAt: new Date(), updatedAt: new Date() })
      .where(eq(bookings.id, req.params.id))
      .returning();
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/provider/bookings/:id/complete
router.patch('/bookings/:id/complete', async (req: Request, res: Response) => {
  try {
    const [updated] = await db
      .update(bookings)
      .set({
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, req.params.id))
      .returning();
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/provider/availability
router.patch('/availability', async (req: Request, res: Response) => {
  try {
    const [provider] = await db
      .select()
      .from(providers)
      .where(eq(providers.userId, req.user!.userId))
      .limit(1);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    const [updated] = await db
      .update(providers)
      .set({ isAvailable: !provider.isAvailable })
      .where(eq(providers.id, provider.id))
      .returning();

    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/provider/location
router.post('/location', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    await db
      .update(providers)
      .set({
        latitude: String(latitude),
        longitude: String(longitude),
      })
      .where(eq(providers.userId, req.user!.userId));

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/provider/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [provider] = await db
      .select()
      .from(providers)
      .where(eq(providers.userId, req.user!.userId))
      .limit(1);

    res.json({
      success: true,
      data: {
        todayJobs: 0,
        todayEarnings: 0,
        totalJobs: provider?.completedJobs || 0,
        rating: Number(provider?.averageRating) || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
