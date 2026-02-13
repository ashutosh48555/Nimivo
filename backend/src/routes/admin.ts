import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { bookings, providers, services, users } from '../db/schema.js';
import { eq, count, sum, sql, desc } from 'drizzle-orm';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate, authorize('admin'));

// GET /api/admin/dashboard
router.get('/dashboard', async (_req: Request, res: Response) => {
  try {
    const [bookingCount] = await db.select({ count: count() }).from(bookings);
    const [userCount] = await db.select({ count: count() }).from(users);
    const [providerCount] = await db.select({ count: count() }).from(providers);
    const [revenueResult] = await db
      .select({ total: sum(bookings.totalAmount) })
      .from(bookings)
      .where(eq(bookings.status, 'completed'));

    res.json({
      success: true,
      data: {
        totalBookings: bookingCount.count,
        totalRevenue: Number(revenueResult.total) || 0,
        totalUsers: userCount.count,
        totalProviders: providerCount.count,
        activeBookings: 0,
        todayBookings: 0,
      },
    });
  } catch (err: any) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/admin/bookings
router.get('/bookings', async (_req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .orderBy(desc(bookings.createdAt))
      .limit(100);

    const mapped = result.map((r) => ({
      ...r.bookings,
      service: r.services,
    }));

    res.json({ success: true, data: mapped });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/admin/providers
router.get('/providers', async (_req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(providers)
      .leftJoin(users, eq(providers.userId, users.id));

    const mapped = result.map((r) => ({
      ...r.providers,
      user: r.users
        ? { fullName: r.users.fullName, email: r.users.email, phone: r.users.phone }
        : null,
    }));

    res.json({ success: true, data: mapped });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/admin/providers/:id/approve
router.patch('/providers/:id/approve', async (req: Request, res: Response) => {
  try {
    const [updated] = await db
      .update(providers)
      .set({ isVerified: true })
      .where(eq(providers.id, req.params.id))
      .returning();
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/admin/users
router.get('/users', async (_req: Request, res: Response) => {
  try {
    const result = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        phone: users.phone,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
