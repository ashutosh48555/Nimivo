import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { bookings, services, providers, users, ratings } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

// POST /api/bookings
router.post('/', async (req: Request, res: Response) => {
  try {
    const { serviceId, address, latitude, longitude, scheduledDate, scheduledTime, notes } =
      req.body;

    const [svc] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1);
    if (!svc) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const [booking] = await db
      .insert(bookings)
      .values({
        customerId: req.user!.userId,
        serviceId,
        address,
        latitude: String(latitude),
        longitude: String(longitude),
        scheduledDate,
        scheduledTime,
        totalAmount: svc.basePrice,
        notes: notes || null,
        status: 'pending',
      })
      .returning();

    res.status(201).json({ success: true, data: { ...booking, service: svc } });
  } catch (err: any) {
    console.error('Create booking error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/bookings/my
router.get('/my', async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .where(eq(bookings.customerId, req.user!.userId))
      .orderBy(desc(bookings.createdAt));

    const mapped = result.map((r) => ({
      ...r.bookings,
      service: r.services,
    }));

    res.json({ success: true, data: mapped });
  } catch (err: any) {
    console.error('My bookings error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .leftJoin(providers, eq(bookings.providerId, providers.id))
      .leftJoin(users, eq(providers.userId, users.id))
      .where(eq(bookings.id, req.params.id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const row = result[0];
    const data = {
      ...row.bookings,
      service: row.services,
      provider: row.providers
        ? {
            ...row.providers,
            user: row.users
              ? {
                  fullName: row.users.fullName,
                  phone: row.users.phone,
                }
              : null,
          }
        : null,
    };

    res.json({ success: true, data });
  } catch (err: any) {
    console.error('Booking detail error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', async (req: Request, res: Response) => {
  try {
    const [updated] = await db
      .update(bookings)
      .set({ status: 'cancelled', cancelledAt: new Date(), updatedAt: new Date() })
      .where(eq(bookings.id, req.params.id))
      .returning();

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    console.error('Cancel error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/bookings/:id/rate
router.post('/:id/rate', async (req: Request, res: Response) => {
  try {
    const { score, review } = req.body;
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, req.params.id))
      .limit(1);

    if (!booking || !booking.providerId) {
      return res.status(400).json({ success: false, message: 'Invalid booking' });
    }

    const [rating] = await db
      .insert(ratings)
      .values({
        bookingId: booking.id,
        customerId: req.user!.userId,
        providerId: booking.providerId,
        score,
        review,
      })
      .returning();

    res.status(201).json({ success: true, data: rating });
  } catch (err: any) {
    console.error('Rate error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
