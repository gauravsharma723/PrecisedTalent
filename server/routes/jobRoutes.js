import express from 'express';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';
import {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

// GET /api/jobs - Fetch all jobs
router.get('/', getJobs);

// GET /api/jobs/:id - Fetch job by ID
// router.get('/:id', getJobById);

router.get('/jobs/:id', getJobById);

// POST /api/jobs - Create job (requires auth)
router.post('/', verifyToken, createJob);

// PUT /api/jobs/:id - Update job (only employers)
router.put('/:id', verifyToken, verifyRole('employer'), updateJob);

// DELETE /api/jobs/:id - Delete job (only employers)
router.delete('/:id', verifyToken, verifyRole('employer'), deleteJob);

export default router;
