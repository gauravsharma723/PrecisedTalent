import pool from '../db.js';

// @desc    Get all jobs (using SP)
export const getJobs = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL Get_All_Jobs()');
        res.json(rows[0]); // MySQL wraps SP result
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// // @desc    Get a single job by ID
// export const getJobById = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
//         if (!rows.length) return res.status(404).json({ message: 'Job not found' });
//         res.json(rows[0]);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// @desc    Get a single job by ID using a stored procedure
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Call stored procedure
        const [rows] = await pool.query('CALL Get_Job_Details_By_Id(?)', [jobId]);

        // Stored procedures return result as nested arrays
        const jobDetails = rows[0]; // First result set

        if (!jobDetails.length) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(jobDetails[0]); // Return the first job object
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// @desc    Create a new job
export const createJob = async (req, res) => {
    try {
        const { title, company, location, salary_range, experience_required } = req.body;
        const [result] = await pool.query(
            'INSERT INTO jobs (title, company, location, salary_range, experience_required) VALUES (?, ?, ?, ?, ?)',
            [title, company, location, salary_range, experience_required]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a job
export const updateJob = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE jobs SET ? WHERE id = ?',
            [req.body, req.params.id]
        );
        res.json({ message: 'Job updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a job
export const deleteJob = async (req, res) => {
    try {
        await pool.query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
